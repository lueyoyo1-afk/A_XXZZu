#!/bin/bash
# ============================================================
# A_XXZZu APK 打包脚本（Termux 手搓 WebView 壳）
# 依赖：openjdk-21 (javac)、aapt2、d8、apksigner、zip
# 用法：cd /sdcard/A_XXZZu && bash build.sh
# 产物：/sdcard/A_XXZZu/XXZZu-signed.apk
# ============================================================

set -e
cd "$(dirname "$0")" || exit 1

# ---------- 自动探测 ANDROID_JAR ----------
# 目的：免去每次手动 export ANDROID_JAR=...
# 优先级：已有环境变量 -> 常见 SDK 路径 -> find 兜底
if [ -z "$ANDROID_JAR" ] || [ ! -f "$ANDROID_JAR" ]; then
  ANDROID_JAR=""
  # 1) 常见候选目录（Termux / 本地 SDK）
  for cand in \
    "$HOME/sdk/platforms/android-33/android.jar" \
    "$HOME/sdk/platforms/android-30/android.jar" \
    "$HOME/sdk/platforms/"*/android.jar \
    "$PREFIX/opt/android-sdk/platforms/"*/android.jar \
    "$PREFIX/share/aapt/android.jar" \
    "/usr/lib/android-sdk/platforms/"*/android.jar \
    "/opt/android-sdk/platforms/"*/android.jar ; do
    if [ -f "$cand" ]; then ANDROID_JAR="$cand"; break; fi
  done
  # 2) 还找不到就全盘 find 一次（慢，但只在前面的都没命中时才走）
  if [ -z "$ANDROID_JAR" ]; then
    ANDROID_JAR="$(find "$HOME" -name android.jar 2>/dev/null | head -1)"
  fi
fi

if [ -z "$ANDROID_JAR" ] || [ ! -f "$ANDROID_JAR" ]; then
  echo "❌ 找不到 android.jar，请先设置："
  echo "   export ANDROID_JAR=/path/to/android-33/android.jar"
  echo "   （或把它放到 ~/sdk/platforms/android-33/android.jar）"
  exit 1
fi

echo "==> 使用 ANDROID_JAR = $ANDROID_JAR"

PROJ="$(pwd)"
A="$PROJ/android"
OUT="$PROJ/build"
PKG="com.xxzzu.writer"
NAME="XXZZu"

echo "==> 0. 同步网页源码到 assets"
mkdir -p "$A/assets"
cp -f index.html "$A/assets/" 2>/dev/null || true
cp -f style.css  "$A/assets/" 2>/dev/null || true
cp -f core.js    "$A/assets/" 2>/dev/null || true
mkdir -p "$A/assets/lib"
cp -f lib/*.js   "$A/assets/lib/" 2>/dev/null || true

echo "==> 1. 清理旧产物"
rm -rf "$OUT"
mkdir -p "$OUT/res" "$OUT/gen" "$OUT/classes"

echo "==> 2. aapt2 compile 资源"
aapt2 compile --dir "$A/res" -o "$OUT/res.zip"

echo "==> 3. aapt2 link"
aapt2 link \
  -o "$OUT/base.apk" \
  -I "$ANDROID_JAR" \
  --manifest "$A/AndroidManifest.xml" \
  -R "$OUT/res.zip" \
  -A "$A/assets" \
  --java "$OUT/gen" \
  --auto-add-overlay \
  --min-sdk-version 21 --target-sdk-version 33

echo "==> 4. javac 编译 java"
javac -source 8 -target 8 \
  -bootclasspath "$ANDROID_JAR" \
  -classpath "$ANDROID_JAR" \
  -d "$OUT/classes" \
  $(find "$A/src" "$OUT/gen" -name "*.java")

echo "==> 5. 转 dex（依次尝试 dx -> r8 -> d8）"
# 关键：dex 工具按「相对路径 = 包名目录」规则解析 class，
# 必须 cd 进 classes 目录、传相对路径，否则报 class name does not match path。
cd "$OUT/classes"
CLASSLIST=$(find . -name "*.class")   # 形如 ./com/xxzzu/writer/MainActivity.class
DEX_OK=0
# --- 方案 0: 复用已提取的旧 dex（本轮 Java 源码未改动时可省去 dex 工具）---
if [ "$DEX_OK" = "0" ] && [ -f "$PROJ/_patch/olddex/classes.dex" ]; then
  cp -f "$PROJ/_patch/olddex/classes.dex" "$OUT/classes.dex"
  echo "    ✔ 复用旧 classes.dex（Java 未改动）"
  DEX_OK=1
fi
# --- 方案 A: dx ---
if command -v dx >/dev/null 2>&1; then
  echo "    尝试 dx ..."
  if dx --dex --min-sdk-version=21 --output="$OUT/classes.dex" $CLASSLIST 2>"$OUT/dx.err"; then
    echo "    dx 成功"; DEX_OK=1
  else
    echo "    dx 失败："; head -20 "$OUT/dx.err"
  fi
fi
# --- 方案 B: r8（--output 必须是目录）---
if [ "$DEX_OK" = "0" ] && command -v r8 >/dev/null 2>&1; then
  echo "    尝试 r8 ..."
  mkdir -p "$OUT/r8out"
  if r8 --min-api 21 --lib "$ANDROID_JAR" \
        --output "$OUT/r8out" $CLASSLIST 2>"$OUT/r8.err"; then
    if [ -f "$OUT/r8out/classes.dex" ]; then
      mv "$OUT/r8out/classes.dex" "$OUT/classes.dex"
      echo "    r8 成功"; DEX_OK=1
    else
      echo "    r8 未产出 classes.dex"; head -20 "$OUT/r8.err"
    fi
  else
    echo "    r8 失败："; head -20 "$OUT/r8.err"
  fi
fi
# --- 方案 C: d8（--output 必须是目录）---
if [ "$DEX_OK" = "0" ] && command -v d8 >/dev/null 2>&1; then
  echo "    尝试 d8 ..."
  mkdir -p "$OUT/d8out"
  if d8 --min-api 21 --lib "$ANDROID_JAR" \
        --output "$OUT/d8out" $CLASSLIST 2>"$OUT/d8.err"; then
    if [ -f "$OUT/d8out/classes.dex" ]; then
      mv "$OUT/d8out/classes.dex" "$OUT/classes.dex"
      echo "    d8 成功"; DEX_OK=1
    else
      echo "    d8 未产出 classes.dex"; head -20 "$OUT/d8.err"
    fi
  else
    echo "    d8 失败："; head -20 "$OUT/d8.err"
  fi
fi
cd "$PROJ"   # 回到项目根，供后续步骤使用
[ "$DEX_OK" = "0" ] && { echo "❌ 所有 dex 工具均失败"; exit 1; }
echo "    ✔ classes.dex 已生成：$(ls -la "$OUT/classes.dex" | awk '{print $5}') 字节"

echo "==> 6. 把 classes.dex 塞进 apk"
cd "$OUT"
cp base.apk unsigned.apk
zip -j unsigned.apk classes.dex

echo "==> 7. zipalign"
zipalign -f -v 4 unsigned.apk aligned.apk

echo "==> 8. 签名"
if [ ! -f "$PROJ/debug.keystore" ]; then
  keytool -genkeypair -v \
    -keystore "$PROJ/debug.keystore" \
    -alias debug -keyalg RSA -keysize 2048 -validity 10000 \
    -storepass "${KS_PASS:-123456}" -keypass "${KS_PASS:-123456}" \
    -dname "CN=XXZZu, OU=Dev, O=XXZZu, L=CN, ST=CN, C=CN"
fi

# 【fix40】v1+v2+v3 三签：兼容旧安卓，也满足新系统对 v2+ 的强制要求
# 密钥信息从环境变量读取，避免明文写进脚本：
#   export KS_PASS=xxx   (默认 123456，仅本地 debug 用)
KS_PASS="${KS_PASS:-123456}"
apksigner sign \
  --ks "$PROJ/debug.keystore" \
  --ks-key-alias debug \
  --ks-pass "pass:${KS_PASS}" --key-pass "pass:${KS_PASS}" \
  --v1-signing-enabled true \
  --v2-signing-enabled true \
  --v3-signing-enabled true \
  --out "$PROJ/${NAME}-signed.apk" \
  aligned.apk
apksigner verify --print-certs "$PROJ/${NAME}-signed.apk" | head -5

# 【fix40】防误点：未签名中间产物改 *.tmp，避免再被当安装包
cd "$OUT"
for f in aligned.apk unsigned.apk base.apk; do
  [ -f "$f" ] && mv -f "$f" "$f.tmp" || true
done
cd "$PROJ"

echo ""
echo "===================== 打包结束 ====================="
echo "✅ 唯一可安装成品：$PROJ/${NAME}-signed.apk"
echo "   (build/ 下只剩 *.tmp 中间产物，别再点它们)"
echo "===================================================="
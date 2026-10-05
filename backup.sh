#!/bin/bash
# ============================================================
# A_XXZZu 项目备份脚本（格式 B：备份文件名自带时间戳）
# 用法：
#   bash backup.sh          备份一次（所有文件平铺进 backup/，名字带时间戳）
#   bash backup.sh list     列出历史备份
#   bash backup.sh restore  回退到最近一次备份
#   bash backup.sh clean    只保留最近 5 组备份（每组=同一时间戳的一批）
# ============================================================

cd "$(dirname "$0")" || exit 1

BK="backup"
FILES="index.html style.css core.js"
# lib 里的库文件一般不用备份（第三方），如需一起备份把下面打开
# EXTRA="lib/marked.min.js lib/supabase.js"

TS=$(date +%Y%m%d_%H%M%S)

case "$1" in
  list)
    echo "== 历史备份（每组同一时间戳）=="
    ls -1 "$BK" 2>/dev/null | sed 's/_.*//' | sort -u | tail -20
    echo "----- 明细 -----"
    ls -1 "$BK" 2>/dev/null
    ;;

  restore)
    LAST=$(ls -1 "$BK" 2>/dev/null | sed 's/_.*//' | sort -u | tail -1)
    if [ -z "$LAST" ]; then
      echo "没有找到任何备份，放弃。"
      exit 1
    fi
    echo "回退到时间戳：$LAST"
    for f in $FILES; do
      base=$(basename "$f")
      src="$BK/${base%.*}_${LAST}.${base##*.}"
      if [ -f "$src" ]; then
        cp "$src" "$f"
        echo "  restored $f  <-  $src"
      else
        echo "  [跳过] 未找到 $src"
      fi
    done
    echo "回退完成。"
    ;;

  clean)
    echo "清理：每组时间戳只保留最近 5 组"
    ALL=$(ls -1 "$BK" 2>/dev/null | sed 's/_.*//' | sort -u)
    KEEP=$(echo "$ALL" | tail -5)
    for ts in $ALL; do
      keep=0
      for k in $KEEP; do [ "$ts" = "$k" ] && keep=1; done
      if [ "$keep" = "0" ]; then
        rm -f "$BK"/*_"$ts".*
        echo "  已删 $ts 那一组"
      fi
    done
    echo "清理完成。"
    ;;

  *)
    mkdir -p "$BK"
    for f in $FILES; do
      if [ -f "$f" ]; then
        base=$(basename "$f")
        dst="$BK/${base%.*}_${TS}.${base##*.}"
        cp "$f" "$dst"
        echo "  备份 $f  ->  $dst"
      else
        echo "  [跳过] $f 不存在"
      fi
    done
    echo "备份完成，时间戳 $TS"
    ;;
esac

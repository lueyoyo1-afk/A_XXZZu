package com.xxzzu.writer;

import android.app.Activity;
import android.content.Intent;
import android.net.Uri;
import android.os.Build;
import android.os.Bundle;
import android.os.Environment;
import android.provider.DocumentsContract;
import android.webkit.JavascriptInterface;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.webkit.WebViewClient;
import android.widget.Toast;

import java.io.File;
import java.io.FileOutputStream;
import java.io.OutputStream;
import java.io.OutputStreamWriter;

public class MainActivity extends Activity {

    private static final int REQ_PICK_DIR = 2001;

    private WebView webView;
    /** 【fix38】用户通过系统文件管理器选中的目录（SAF tree URI 字符串，可能为空） */
    private static volatile String pickedTreeUri = "";

    /** JS 桥接对象：供前端 window.Android.* 调用，实现纯本地文件导出 */
    public class Bridge {

        /**
         * 【fix40】按需切换渲染层：focused=true → 软件层（保输入法兼容）；
         * focused=false → 硬件层（保滚动丝滑）。由前端在编辑框 focus/blur 时调用。
         */
        @JavascriptInterface
        public void setSoftRender(final boolean focused) {
            if (webView == null) return;
            webView.post(new Runnable() {
                public void run() {
                    webView.setLayerType(
                        focused ? WebView.LAYER_TYPE_SOFTWARE : WebView.LAYER_TYPE_HARDWARE, null);
                }
            });
        }
        /** 返回一个「尽量可写」的导出目录的绝对路径（给前端展示用） */
        @JavascriptInterface
        public String exportDir() {
            // 若用户已用文件管理器选过目录，优先返回它（供展示）
            if (pickedTreeUri != null && pickedTreeUri.length() > 0) return pickedTreeUri;
            File d = pickDir();
            return d != null ? d.getAbsolutePath() : "";
        }

        /**
         * 写文本文件。name 为文件名（含扩展名），content 为文本内容。
         * 返回：成功→写入文件的绝对路径/URI；失败→以 "ERR:" 开头的错误信息。
         */
        @JavascriptInterface
        public String saveTextFile(String name, String content) {
            if (name == null || name.trim().length() == 0) return "ERR:empty-name";
            name = sanitize(name);
            // 1) 若用户选过 SAF 目录，优先写入
            if (pickedTreeUri != null && pickedTreeUri.length() > 0) {
                String r = writeIntoTree(pickedTreeUri, name, content);
                if (r != null) return r;
            }
            // 2) 回退：逐个候选目录尝试
            String lastErr = "no-writable-dir";
            for (File dir : candidateDirs()) {
                String r = writeInto(dir, name, content);
                if (r != null) return r;
            }
            return "ERR:" + lastErr;
        }

        /**
         * 【fix37/38】写文本文件到「指定位置」。
         * prefPath 可以是普通目录路径，也可以是 content:// tree URI；
         * 为空或不合法时回退到默认候选目录逻辑。
         */
        @JavascriptInterface
        public String saveTextFileEx(String name, String content, String prefPath) {
            if (name == null || name.trim().length() == 0) return "ERR:empty-name";
            name = sanitize(name);
            String lastErr = "no-writable-dir";
            if (prefPath != null && prefPath.trim().length() > 0) {
                String p = prefPath.trim();
                if (p.startsWith("content://")) {
                    String r = writeIntoTree(p, name, content);
                    if (r != null) return r;
                    lastErr = "cannot-write-saf:" + p;
                } else {
                    try {
                        File dir = new File(p);
                        if (!dir.exists()) dir.mkdirs();
                        if (dir.canWrite()) {
                            String r = writeInto(dir, name, content);
                            if (r != null) return r;
                        } else {
                            lastErr = "cannot-write:" + dir.getAbsolutePath();
                        }
                    } catch (Throwable t) {
                        lastErr = t.getClass().getSimpleName() + ":" + t.getMessage() + "@" + p;
                    }
                }
            }
            // 回退：逐个候选目录尝试
            for (File dir : candidateDirs()) {
                String r = writeInto(dir, name, content);
                if (r != null) return r;
            }
            return "ERR:" + lastErr;
        }

        /**
         * 【fix37】获取全部候选导出目录列表（绝对路径），用 "\n" 分隔（保留兼容）。
         */
        @JavascriptInterface
        public String exportDirList() {
            java.util.List<File> dirs = candidateDirs();
            StringBuilder sb = new StringBuilder();
            for (File d : dirs) {
                if (d == null) continue;
                if (sb.length() > 0) sb.append("\n");
                sb.append(d.getAbsolutePath());
            }
            return sb.toString();
        }

        /**
         * 【fix38】打开系统文件管理器，让用户自己挑选导出目录（SAF ACTION_OPEN_DOCUMENT_TREE）。
         * 选中后会持久化授权，并回调 JS 的 window.onExportDirPicked(uri)（若存在）。
         */
        @JavascriptInterface
        public void pickExportDir() {
            runOnUiThread(new Runnable() {
                public void run() {
                    try {
                        Intent it;
                        if (Build.VERSION.SDK_INT >= 21) {
                            it = new Intent(Intent.ACTION_OPEN_DOCUMENT_TREE);
                            it.addFlags(Intent.FLAG_GRANT_READ_URI_PERMISSION
                                    | Intent.FLAG_GRANT_WRITE_URI_PERMISSION
                                    | Intent.FLAG_GRANT_PERSISTABLE_URI_PERMISSION
                                    | Intent.FLAG_GRANT_PREFIX_URI_PERMISSION);
                        } else {
                            it = new Intent(Intent.ACTION_OPEN_DOCUMENT_TREE);
                        }
                        startActivityForResult(it, REQ_PICK_DIR);
                    } catch (Throwable t) {
                        Toast.makeText(MainActivity.this, "无法打开文件管理器", Toast.LENGTH_SHORT).show();
                    }
                }
            });
        }

        /** 取得上次用户选择的 SAF 目录（可能为空字符串） */
        @JavascriptInterface
        public String getPickedDir() {
            return pickedTreeUri != null ? pickedTreeUri : "";
        }

        /** 弹出原生 Toast */
        @JavascriptInterface
        public void toast(String msg) {
            runOnUiThread(new ToastRunnable(msg));
        }
    }

    /** 防目录穿越：把分隔符与 ".." 全部替换掉 */
    private static String sanitize(String name) {
        return name.replace("/", "_").replace("\\", "_").replace("..", "_");
    }

    /** 把内容写进指定 File 目录，成功返回绝对路径，失败返回 null */
    private String writeInto(File dir, String name, String content) {
        try {
            if (dir == null) return null;
            if (!dir.exists()) dir.mkdirs();
            if (!dir.canWrite()) return null;
            File f = new File(dir, name);
            FileOutputStream fos = new FileOutputStream(f);
            OutputStreamWriter w = new OutputStreamWriter(fos, "UTF-8");
            w.write(content != null ? content : "");
            w.flush();
            w.close();
            fos.close();
            return f.getAbsolutePath();
        } catch (Exception e) {
            return null;
        }
    }

    /** 【fix38】把内容写进 SAF tree URI 目录，成功返回文件 URI，失败返回 null */
    private String writeIntoTree(String treeUriStr, String name, String content) {
        try {
            Uri treeUri = Uri.parse(treeUriStr);
            Uri dirDoc = DocumentsContract.buildDocumentUriUsingTree(
                    treeUri, DocumentsContract.getTreeDocumentId(treeUri));
            Uri fileUri = DocumentsContract.createDocument(
                    getContentResolver(), dirDoc, "text/plain", name);
            if (fileUri == null) return null;
            OutputStream os = getContentResolver().openOutputStream(fileUri, "wt");
            if (os == null) return null;
            OutputStreamWriter w = new OutputStreamWriter(os, "UTF-8");
            w.write(content != null ? content : "");
            w.flush();
            w.close();
            os.close();
            return fileUri.toString();
        } catch (Throwable t) {
            return null;
        }
    }

    /** 收集所有候选导出目录（专属目录 / 项目目录 / 内部目录），均已 mkdirs */
    private java.util.List<File> candidateDirs() {
        java.util.List<File> dirs = new java.util.ArrayList<File>();
        try { File e = getExternalFilesDir(null); if (e != null) { File d = new File(e, "export"); if (!d.exists()) d.mkdirs(); dirs.add(d); } } catch (Throwable t) {}
        try { File p = new File(Environment.getExternalStorageDirectory(), "A_XXZZu/export"); if (!p.exists()) p.mkdirs(); dirs.add(p); } catch (Throwable t) {}
        try { File i = new File(getFilesDir(), "export"); if (!i.exists()) i.mkdirs(); dirs.add(i); } catch (Throwable t) {}
        return dirs;
    }

    /**
     * 选一个「一定可写」的目录。
     * 顺序：1) 专属目录  2) 项目目录  3) 内部目录
     */
    private File pickDir() {
        try {
            File ext = getExternalFilesDir(null);
            if (ext != null) {
                File d = new File(ext, "export");
                if (!d.exists()) d.mkdirs();
                if (d.exists() && d.canWrite()) return d;
            }
        } catch (Throwable ignored) {}
        try {
            File primary = new File(Environment.getExternalStorageDirectory(), "A_XXZZu/export");
            if (!primary.exists()) primary.mkdirs();
            if (primary.exists() && primary.canWrite()) return primary;
        } catch (Throwable ignored) {}
        try {
            File in = new File(getFilesDir(), "export");
            if (!in.exists()) in.mkdirs();
            return in;
        } catch (Throwable ignored) {}
        return null;
    }

    /** 命名内部类（替代匿名 Runnable，绕开 Termux d8 对匿名内部类的 NPE） */
    private class ToastRunnable implements Runnable {
        private final String m;
        ToastRunnable(String msg) { this.m = msg; }
        public void run() {
            Toast.makeText(MainActivity.this, m, Toast.LENGTH_SHORT).show();
        }
    }

    /** Android 6+ 需运行时申请存储权限 */
    private void requestStoragePermission() {
        try {
            if (Build.VERSION.SDK_INT >= 23) {
                if (checkSelfPermission(android.Manifest.permission.WRITE_EXTERNAL_STORAGE)
                        != android.content.pm.PackageManager.PERMISSION_GRANTED) {
                    requestPermissions(new String[]{
                            android.Manifest.permission.WRITE_EXTERNAL_STORAGE,
                            android.Manifest.permission.READ_EXTERNAL_STORAGE
                    }, 1001);
                }
            }
        } catch (Throwable ignored) {}
    }

    @Override
    protected void onActivityResult(int requestCode, int resultCode, Intent data) {
        super.onActivityResult(requestCode, resultCode, data);
        if (requestCode == REQ_PICK_DIR) {
            if (resultCode == RESULT_OK && data != null && data.getData() != null) {
                Uri uri = data.getData();
                // 持久化授权，重启后仍可写
                try {
                    getContentResolver().takePersistableUriPermission(uri,
                            Intent.FLAG_GRANT_READ_URI_PERMISSION | Intent.FLAG_GRANT_WRITE_URI_PERMISSION);
                } catch (Throwable ignored) {}
                pickedTreeUri = uri.toString();
                // 回调 JS（若页面定义了处理函数）
                final String u = pickedTreeUri;
                if (webView != null) {
                    webView.post(new Runnable() {
                        public void run() {
                            try {
                                webView.evaluateJavascript(
                                        "if(window.onExportDirPicked){window.onExportDirPicked(" + jsStr(u) + ");}", null);
                            } catch (Throwable ignored) {}
                        }
                    });
                }
            } else {
                // 用户取消
                if (webView != null) {
                    webView.post(new Runnable() {
                        public void run() {
                            try {
                                webView.evaluateJavascript(
                                        "if(window.onExportDirCancel){window.onExportDirCancel();}", null);
                            } catch (Throwable ignored) {}
                        }
                    });
                }
            }
        }
    }

    /** 安全地把字符串转成 JS 字符串字面量 */
    private static String jsStr(String s) {
        if (s == null) return "''";
        StringBuilder sb = new StringBuilder("'");
        for (int i = 0; i < s.length(); i++) {
            char c = s.charAt(i);
            switch (c) {
                case '\\': sb.append("\\\\"); break;
                case '\'': sb.append("\\'"); break;
                case '\n': sb.append("\\n"); break;
                case '\r': sb.append("\\r"); break;
                default: sb.append(c);
            }
        }
        sb.append("'");
        return sb.toString();
    }

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        webView = new WebView(this);

        requestStoragePermission();

        // 【fix40】默认硬件加速渲染层——保证页面滚动/动画丝滑；
        // 仅在输入框聚焦瞬间切回软件层（见下方 setSoftRender 桥），
        // 以兼容 fix28 的「中文输入法预编辑冲突导致打不进字」问题。
        webView.setLayerType(WebView.LAYER_TYPE_HARDWARE, null);

        WebSettings s = webView.getSettings();
        s.setJavaScriptEnabled(true);
        s.setDomStorageEnabled(true);
        s.setDatabaseEnabled(true);
        s.setAllowFileAccess(true);
        s.setAllowContentAccess(true);
        s.setLoadWithOverviewMode(true);
        s.setUseWideViewPort(true);
        s.setSupportZoom(false);
        s.setBuiltInZoomControls(false);
        s.setCacheMode(WebSettings.LOAD_DEFAULT);
        s.setAllowFileAccessFromFileURLs(true);
        s.setAllowUniversalAccessFromFileURLs(true);

        webView.addJavascriptInterface(new Bridge(), "Android");

        webView.setWebViewClient(new WebViewClient());
        webView.loadUrl("file:///android_asset/index.html");

        setContentView(webView);
    }

    @Override
    public void onBackPressed() {
        if (webView != null && webView.canGoBack()) {
            webView.goBack();
        } else {
            super.onBackPressed();
        }
    }
}
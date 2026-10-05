/* ============================================================
   XXZZu · core.js  (第1批返修 · 分块写入 PART1)
   ============================================================ */
(function(){
'use strict';

var K = {
  LANG:'xxzzu_lang', THEME:'xxzzu_theme', SKIN:'xxzzu_skin', FONT:'xxzzu_font',
  FSIZE:'xxzzu_fsize', FSIZE_W:'xxzzu_fsize_w',
  APIKEY:'xxzzu_apikey', MODEL:'xxzzu_model', EXPORTDIR:'xxzzu_exportdir', LINEGUIDE:'xxzzu_lineguide',
  REMEMBER:'xxzzu_remember', PWD:'xxzzu_pwd_b64',
  LOGGED:'xxzzu_logged', LOCAL_ONLY:'xxzzu_localonly',
  ONBOARDED:'xxzzu_onboarded', EMAIL:'xxzzu_email',
  WLOG:'xxzzu_wlog',
  WORKS:'xxzzu_works'
};

var LS = {
  get:function(k,d){try{var v=localStorage.getItem(k);return v===null?d:v;}catch(e){return d;}},
  set:function(k,v){try{localStorage.setItem(k,v);}catch(e){}},
  del:function(k){try{localStorage.removeItem(k);}catch(e){}}
};
function $(id){ return document.getElementById(id); }

/* ---------------- 三语文案表 ---------------- */
var I18N = {
  'zh-CN':{
    'login.sub':'可跨设备同步的多工具写作 app',
    'login.email':'邮箱','login.pwd':'密码','login.enter':'登陆 / 注册',
    'login.remember':'记住密码','login.local':'仅使用本地功能，先不登录','login.forgot':'忘记密码',
    'tab.shelf':'书架','tab.me':'我','tab.tools':'工具',
    'me.account':'我的账号','me.notLogin':'未登录账号','me.email':'邮箱',
    'me.switch':'切换账号','me.changePwd':'修改密码','me.logout':'退出账号','me.toLogin':'去登录',
    'me.cloud':'云同步','me.cloudUpload':'上传备份','me.cloudPull':'备份同步','me.autoSync':'开启自动同步',
    'me.settings':'设置',
    'me.pwdHint':'修改密码功能将在接入云端账号后开放，当前为本地/占位状态。',
    'me.logoutMsg':'退出后将回到登录页，本地数据仍会保留在本机。',
    'set.display':'界面与显示','set.theme':'主题','set.themeLight':'日间','set.themeDark':'夜间','set.skin':'皮肤','set.skinNormal':'素雅','set.skinGlass':'磨砂A','set.skinGlassB':'磨砂B',
    'set.lang':'语言','set.langCN':'简体','set.langTW':'繁體','set.langEN':'En',
    'set.font':'字体','set.fontSys':'跟随系统',
    'set.size':'字号','set.sizeXS':'极小','set.sizeS':'小','set.sizeM':'中','set.sizeL':'大','set.sizeXL':'特大',
    'set.ai':'AI 助手','set.model':'模型','set.apiKey':'API Key','set.save':'保存','set.edit':'修改','set.clear':'清除',
    'set.export':'导出位置','set.exportPath':'当前路径','set.exportHint':'导出的 txt / docx 会保存到该目录；点下方按钮可切换位置。','set.exportChange':'更换导出位置',
    'set.exportPick':'选择导出位置','set.exportDone':'已切换导出位置',
    'write.lineguide':'格线','write.lineOn':'格线已开','write.lineOff':'格线已关',
    'set.disclaimer':'免责声明','set.disclaimerText':'本应用仅用于个人写作，AI 内容仅供参考，请自行核实。API Key 仅保存在本机，不会上传。',
    'shelf.empty':'还没有作品，点右下角新建',
    'common.off':'未开启','common.on':'已开启','common.ok':'确定','common.cancel':'取消','common.delete':'删除','common.edit':'修改',
    'create.name':'作品名','create.intro':'简介（可不填）','create.author':'作者','create.color':'封面色','create.confirm':'创建',
    'write.words':'字','write.saved':'已保存','write.unsaved':'未保存',
    'write.fontSize':'字号','write.save':'保存',
    'tip.titleEmpty':'请先填写作品名',
    'tip.renameWork':'重命名作品','tip.workName':'作品名','tip.delChapter':'删除这一章？',
    'tip.untitledChapter':'未命名章节','tip.chapterUnit':'章','tip.wordUnit':'字',
    'login.tipTitle':'请填写邮箱和密码',
    'me.localUser':'本地用户',
    'me.localTip':'当前为本机模式，数据保存在这台设备上。登录后可跨设备同步。',
    'me.loginTip':'登录后可跨设备同步，数据同样本地优先保存。',
    'set.font.system':'跟随系统','set.font.hei':'黑体','set.font.song':'宋体',
    'set.fontTitle':'选择字体','set.wfontTitle':'正文字号',
    'set.size.xs':'极小','set.size.s':'小','set.size.m':'中','set.size.l':'大','set.size.xl':'特大',
    'create.title':'新建作品','create.nameLabel':'作品名','create.namePh':'给作品起个名字',
    'write.newChapter':'新建章节','write.renameChapter':'重命名章节',
    'write.chapterName':'章节名','write.chapterPh':'输入章节名','write.saving':'保存中…',
    'write.chapters':'章节',
    'work.chapters':'章节','work.noChapter':'还没有章节，点上方新建','work.editInfo':'修改信息','work.noIntro':'暂无简介',
    'create.authorPh':'未署名','tip.untitledWork':'未命名作品','common.save':'保存',
    'tip.delWork':'删除作品','tip.delWorkMsg':'删除后不可恢复，确定删除这个作品吗？',
    'tools.local':'本地文件','tools.ai':'AI 助手',
    'tools.localGroup':'本地工具','tools.aiGroup':'AI 工具',
    'tools.tTxt':'导出 TXT','tools.dTxt':'把当前作品导出为纯文本',
    'tools.tDocx':'导出 DOCX','tools.dDocx':'把当前作品导出为 Word 文档',
    'tools.tStats':'写作统计','tools.dStats':'字数与写作进度统计',
    'stats.title':'写作统计','stats.today':'今天','stats.yesterday':'昨天',
    'stats.d7':'近7天','stats.d30':'近30天','stats.month':'本月','stats.lastMonth':'上月',
    'stats.trend':'近 7 天趋势','stats.byWork':'作品统计',
    'stats.chapters':'总章节','stats.words':'总字数',
    'stats.empty':'还没有作品，先去书架创建一部吧。',
    'tools.tBackup':'本地备份','tools.dBackup':'打包备份全部本地数据',
    'tools.tName':'智能起名','tools.dName':'为角色、地点、作品起名',
    'tools.tPersona':'人设生成','tools.dPersona':'生成角色人设与性格',
    'tools.tIdea':'灵感大纲','tools.dIdea':'帮你想剧情走向与大纲',
    'tools.tSetting':'设定整理','tools.dSetting':'整理世界观与设定资料',
    'tools.wip':'功能开发中','tools.wipMsg':'该功能还在开发中，将在后续版本上线。',
  'tools.emptyMsg':'还没有作品，先去书架创建一部吧。',
  'tools.exportOk':'导出成功，文件已保存到：','tools.exportFail':'导出失败（当前环境无文件写入权限，请在打包后的 App 内使用）。',
    'me.cloudHint':'云同步将在接入 Supabase 账号后开放，当前数据保存在本机。',
     'common.localOnly':'本地写作',
    'set.mail':'邮箱','set.vendor':'服务商','set.keyHint':'不填 Key 就无法使用 AI 小工具（起名 / 人设 / 大纲等）',
     'set.about':'关于','set.author':'作者','set.vendorName':'XXZZu',
     'set.fontSize':'字号',
     /* 【4批e-fix23】AI 子页文案 */
     'ai.tName':'智能起名','ai.tPersona':'人设生成','ai.tIdea':'灵感大纲','ai.tSetting':'设定整理',
      'ai.inputLabel':'补充要求（可选）','ai.inputPh':'例如：主角是剑修，性格冷淡，背景是东方玄幻',
      'ai.heroSub':'描述你的需求，一键生成灵感',
     'ai.generate':'开始生成','ai.loading':'生成中…','ai.result':'生成结果',
     'ai.copy':'复制','ai.append':'写入设定','ai.tip':'内容由 AI 生成，仅供参考，请自行核实与润色。',
     'ai.needKey':'请先在「设置」中填写 DeepSeek API Key 后再使用',
     'ai.copied':'已复制到剪贴板','ai.copyFail':'复制失败，请长按选择复制',
     'ai.pickWork':'写入哪部作品？','ai.appendedTo':'已写入《{w}》的设定中','ai.noWork':'请先创建或打开一部作品',
     'ai.errNet':'网络请求失败，请检查网络后重试','ai.errKey':'API Key 无效或已过期，请到「设置」检查',
     'ai.errBusy':'请求过于频繁，请稍后再试','ai.errServer':'服务器繁忙，请稍后重试','ai.errEmpty':'AI 没有返回内容，请稍后重试',
     'ai.genHint':'正在生成，请稍候…'
   },
  'zh-TW':{
    'login.sub':'可跨裝置同步的多工具寫作 app',
    'login.email':'信箱','login.pwd':'密碼','login.enter':'登入 / 註冊',
    'login.remember':'記住密碼','login.local':'僅使用本機功能，先不登入','login.forgot':'忘記密碼',
    'tab.shelf':'書架','tab.me':'我','tab.tools':'工具',
    'me.account':'我的帳號','me.notLogin':'未登入帳號','me.email':'信箱',
    'me.switch':'切換帳號','me.changePwd':'修改密碼','me.logout':'登出帳號','me.toLogin':'去登入',
    'me.cloud':'雲端同步','me.cloudUpload':'上傳備份','me.cloudPull':'備份同步','me.autoSync':'開啟自動同步',
    'me.settings':'設定',
    'me.pwdHint':'修改密碼功能將在接入雲端帳號後開放，目前為本機/佔位狀態。',
    'me.logoutMsg':'登出後將回到登入頁，本機資料仍會保留在此裝置。',
    'set.display':'介面與顯示','set.theme':'主題','set.themeLight':'日間','set.themeDark':'夜間','set.skin':'皮膚','set.skinNormal':'素雅','set.skinGlass':'磨砂A','set.skinGlassB':'磨砂B',
    'set.lang':'語言','set.langCN':'简体','set.langTW':'繁體','set.langEN':'En',
    'set.font':'字體','set.fontSys':'跟隨系統',
    'set.size':'字號','set.sizeXS':'極小','set.sizeS':'小','set.sizeM':'中','set.sizeL':'大','set.sizeXL':'特大',
    'set.ai':'AI 助手','set.model':'模型','set.apiKey':'API Key','set.save':'儲存','set.edit':'修改','set.clear':'清除',
    'set.export':'匯出位置','set.exportPath':'目前路徑','set.exportHint':'匯出的 txt / docx 會儲存到該目錄；點下方按鈕可切換位置。','set.exportChange':'更換匯出位置',
    'set.exportPick':'選擇匯出位置','set.exportDone':'已切換匯出位置',
    'write.lineguide':'格線','write.lineOn':'格線已開','write.lineOff':'格線已關',
    'set.disclaimer':'免責聲明','set.disclaimerText':'本應用僅用於個人寫作，AI 內容僅供參考，請自行核實。API Key 僅保存在本機，不會上傳。',
    'shelf.empty':'還沒有作品，點右下角新增',
    'common.off':'未開啟','common.on':'已開啟','common.ok':'確定','common.cancel':'取消','common.delete':'刪除','common.edit':'修改',
    'create.name':'作品名','create.intro':'簡介（可不填）','create.author':'作者','create.color':'封面色','create.confirm':'建立',
    'write.words':'字','write.saved':'已儲存','write.unsaved':'未儲存',
    'write.fontSize':'字號','write.save':'儲存',
    'tip.titleEmpty':'請先填寫作品名',
    'tip.renameWork':'重新命名作品','tip.workName':'作品名','tip.delChapter':'刪除這一章？',
    'tip.untitledChapter':'未命名章節','tip.chapterUnit':'章','tip.wordUnit':'字',
    'login.tipTitle':'請填寫信箱和密碼',
    'me.localUser':'本機使用者',
    'me.localTip':'目前為本機模式，資料保存在這台裝置上。登入後可跨裝置同步。',
    'me.loginTip':'登入後可跨裝置同步，資料同樣以本機優先保存。',
    'set.font.system':'跟隨系統','set.font.hei':'黑體','set.font.song':'宋體',
    'set.fontTitle':'選擇字體','set.wfontTitle':'正文字號',
    'set.size.xs':'極小','set.size.s':'小','set.size.m':'中','set.size.l':'大','set.size.xl':'特大',
    'create.title':'新增作品','create.nameLabel':'作品名','create.namePh':'給作品起個名字',
    'write.newChapter':'新增章節','write.renameChapter':'重新命名章節',
    'write.chapterName':'章節名','write.chapterPh':'輸入章節名','write.saving':'儲存中…',
    'write.chapters':'章節',
    'work.chapters':'章節','work.noChapter':'還沒有章節，點上方新增','work.editInfo':'修改資訊','work.noIntro':'暫無簡介',
    'create.authorPh':'未署名','tip.untitledWork':'未命名作品','common.save':'儲存',
    'tip.delWork':'刪除作品','tip.delWorkMsg':'刪除後無法復原，確定刪除這個作品嗎？',
    'tools.local':'本機檔案','tools.ai':'AI 助手',
    'tools.localGroup':'本機工具','tools.aiGroup':'AI 工具',
    'tools.tTxt':'匯出 TXT','tools.dTxt':'把目前作品匯出為純文字',
    'tools.tDocx':'匯出 DOCX','tools.dDocx':'把目前作品匯出為 Word 文件',
    'tools.tStats':'寫作統計','tools.dStats':'字數與寫作進度統計',
    'stats.title':'寫作統計','stats.today':'今天','stats.yesterday':'昨天',
    'stats.d7':'近7天','stats.d30':'近30天','stats.month':'本月','stats.lastMonth':'上月',
    'stats.trend':'近 7 天趨勢','stats.byWork':'作品統計',
    'stats.chapters':'總章節','stats.words':'總字數',
    'stats.empty':'還沒有作品，先去書架建立一部吧。',
    'tools.tBackup':'本機備份','tools.dBackup':'打包備份全部本機資料',
    'tools.tName':'智慧取名','tools.dName':'為角色、地點、作品取名',
    'tools.tPersona':'人設生成','tools.dPersona':'生成角色人設與性格',
    'tools.tIdea':'靈感大綱','tools.dIdea':'幫你想劇情走向與大綱',
    'tools.tSetting':'設定整理','tools.dSetting':'整理世界觀與設定資料',
    'tools.wip':'功能開發中','tools.wipMsg':'該功能仍在開發中，將在後續版本上線。',
  'tools.emptyMsg':'還沒有作品，先去書架建立一部吧。',
  'tools.exportOk':'匯出成功，檔案已儲存到：','tools.exportFail':'匯出失敗（目前環境無檔案寫入權限，請在打包後的 App 內使用）。',
    'me.cloudHint':'雲端同步將在接入 Supabase 帳號後開放，目前資料保存在本機。',
     'common.localOnly':'本機寫作',
    'set.mail':'信箱','set.vendor':'服務商','set.keyHint':'不填 Key 就無法使用 AI 小工具（起名 / 人設 / 大綱等）',
    'set.about':'關於','set.author':'作者','set.vendorName':'XXZZu',
'set.fontSystem':'跟隨系統','set.fontHei':'黑體','set.fontSong':'宋體','set.fontKai':'楷體','set.fontYuan':'圓體','set.fontWei':'微軟雅黑',
     'set.fontSize':'字號',
     /* 【4批e-fix23】AI 子頁文案 */
     'ai.tName':'智慧取名','ai.tPersona':'人設生成','ai.tIdea':'靈感大綱','ai.tSetting':'設定整理',
      'ai.inputLabel':'補充要求（可選）','ai.inputPh':'例如：主角是劍修，性格冷淡，背景是東方玄幻',
      'ai.heroSub':'描述你的需求，一鍵生成靈感',
     'ai.generate':'開始生成','ai.loading':'生成中…','ai.result':'生成結果',
     'ai.copy':'複製','ai.append':'寫入設定','ai.tip':'內容由 AI 生成，僅供參考，請自行核實與潤色。',
     'ai.needKey':'請先在「設定」中填寫 DeepSeek API Key 後再使用',
     'ai.copied':'已複製到剪貼簿','ai.copyFail':'複製失敗，請長按選擇複製',
     'ai.pickWork':'寫入哪部作品？','ai.appendedTo':'已寫入《{w}》的設定中','ai.noWork':'請先建立或開啟一部作品',
     'ai.errNet':'網路請求失敗，請檢查網路後重試','ai.errKey':'API Key 無效或已過期，請到「設定」檢查',
     'ai.errBusy':'請求過於頻繁，請稍後再試','ai.errServer':'伺服器繁忙，請稍後重試','ai.errEmpty':'AI 沒有返回內容，請稍後重試',
     'ai.genHint':'正在生成，請稍候…'
   },
   'en':{
    'login.sub':'A multi-tool writing app with cross-device sync',
    'login.email':'Email','login.pwd':'Password','login.enter':'Log in / Sign up',
    'login.remember':'Remember password','login.local':'Use local only, skip login','login.forgot':'Forgot password',
    'tab.shelf':'Shelf','tab.me':'Me','tab.tools':'Tools',
    'me.account':'My account','me.notLogin':'Not logged in','me.email':'Email',
    'me.switch':'Switch account','me.changePwd':'Change password','me.logout':'Log out','me.toLogin':'Log in',
    'me.cloud':'Cloud sync','me.cloudUpload':'Upload backup','me.cloudPull':'Pull backup','me.autoSync':'Auto sync',
    'me.settings':'Settings',
    'me.pwdHint':'Password change will be available after cloud account is connected. Currently local/placeholder.',
    'me.logoutMsg':'You will return to the login page. Local data stays on this device.',
    'set.display':'Display','set.theme':'Theme','set.themeLight':'Light','set.themeDark':'Dark','set.skin':'Skin','set.skinNormal':'Plain','set.skinGlass':'Frosted A','set.skinGlassB':'Frosted B',
    'set.lang':'Language','set.langCN':'简体','set.langTW':'繁體','set.langEN':'En',
    'set.font':'Font','set.fontSys':'System',
    'set.size':'Font size','set.sizeXS':'XS','set.sizeS':'S','set.sizeM':'M','set.sizeL':'L','set.sizeXL':'XL',
    'set.ai':'AI assistant','set.model':'Model','set.apiKey':'API Key','set.save':'Save','set.edit':'Edit','set.clear':'Clear',
    'set.export':'Export location','set.exportPath':'Current path','set.exportHint':'Exported txt / docx files are saved here. Tap the button below to change the location.','set.exportChange':'Change location',
    'set.exportPick':'Choose export location','set.exportDone':'Export location changed',
    'write.lineguide':'Guide','write.lineOn':'Guide lines on','write.lineOff':'Guide lines off',
    'set.disclaimer':'Disclaimer','set.disclaimerText':'For personal writing only. AI output is for reference; verify it yourself. Your API key stays on this device.',
    'shelf.empty':'No works yet. Tap + to create one.',
    'common.off':'Off','common.on':'On','common.ok':'OK','common.cancel':'Cancel','common.delete':'Delete','common.edit':'Edit',
    'create.name':'Title','create.intro':'Intro (optional)','create.author':'Author','create.color':'Cover color','create.confirm':'Create',
    'write.words':'words','write.saved':'Saved','write.unsaved':'Unsaved',
    'write.fontSize':'Size','write.save':'Save',
    'tip.titleEmpty':'Please enter a title first',
    'tip.renameWork':'Rename work','tip.workName':'Title','tip.delChapter':'Delete this chapter?',
    'tip.untitledChapter':'Untitled chapter','tip.chapterUnit':'ch.','tip.wordUnit':'w',
    'login.tipTitle':'Please enter email and password',
    'me.localUser':'Local user',
    'me.localTip':'Local mode is on. Data is stored on this device; sign in to sync across devices.',
    'me.loginTip':'Sign in to sync across devices. Data is still saved locally first.',
    'set.font.system':'System','set.font.hei':'Hei','set.font.song':'Song',
    'set.fontTitle':'Choose font','set.wfontTitle':'Body font size',
    'set.size.xs':'XS','set.size.s':'S','set.size.m':'M','set.size.l':'L','set.size.xl':'XL',
    'create.title':'New work','create.nameLabel':'Title','create.namePh':'Name your work',
    'write.newChapter':'New chapter','write.renameChapter':'Rename chapter',
    'write.chapterName':'Chapter name','write.chapterPh':'Enter chapter name','write.saving':'Saving…',
    'write.chapters':'Chapters',
    'work.chapters':'Chapters','work.noChapter':'No chapters yet. Tap above to add one.','work.editInfo':'Edit info','work.noIntro':'No description',
    'create.authorPh':'Unnamed','tip.untitledWork':'Untitled','common.save':'Save',
    'tip.delWork':'Delete work','tip.delWorkMsg':'This cannot be undone. Delete this work?',
    'tools.local':'Local files','tools.ai':'AI assistant',
    'tools.localGroup':'Local tools','tools.aiGroup':'AI tools',
    'tools.tTxt':'Export TXT','tools.dTxt':'Export current work as plain text',
    'tools.tDocx':'Export DOCX','tools.dDocx':'Export current work as a Word document',
    'tools.tStats':'Writing stats','tools.dStats':'Word counts and writing progress',
    'stats.title':'Writing stats','stats.today':'Today','stats.yesterday':'Yesterday',
    'stats.d7':'Last 7 days','stats.d30':'Last 30 days','stats.month':'This month','stats.lastMonth':'Last month',
    'stats.trend':'Last 7 days trend','stats.byWork':'By work',
    'stats.chapters':'Chapters','stats.words':'Words',
    'stats.empty':'No works yet — create one on the shelf first.',
    'tools.tBackup':'Local backup','tools.dBackup':'Pack and back up all local data',
    'tools.tName':'Name ideas','tools.dName':'Generate names for characters and places',
    'tools.tPersona':'Character design','tools.dPersona':'Generate character profiles',
    'tools.tIdea':'Plot outline','tools.dIdea':'Help brainstorm plot and outline',
    'tools.tSetting':'Setting manager','tools.dSetting':'Organize worldbuilding and settings',
    'tools.wip':'Coming soon','tools.wipMsg':'This feature is under development and will ship in a later version.',
  'tools.emptyMsg':'No works yet — create one on the shelf first.',
  'tools.exportOk':'Exported. File saved to: ','tools.exportFail':'Export failed (no file-write permission in this environment; use it inside the packaged app).',
    'me.cloudHint':'Cloud sync will be available after connecting a Supabase account. Data is stored locally for now.',
     'common.localOnly':'Local writing',
    'set.mail':'Email','set.vendor':'Vendor','set.keyHint':'AI tools (naming / persona / outline) require an API key',
    'set.about':'About','set.author':'Author','set.vendorName':'XXZZu',
'set.fontSystem':'System','set.fontHei':'Hei','set.fontSong':'Song','set.fontKai':'Kai','set.fontYuan':'Yuan','set.fontWei':'Yahei',
     'set.fontSize':'Font size',
     /* 【4批e-fix23】AI subpage strings */
     'ai.tName':'Name ideas','ai.tPersona':'Character design','ai.tIdea':'Plot outline','ai.tSetting':'Setting manager',
      'ai.inputLabel':'Extra requirements (optional)','ai.inputPh':'e.g. The protagonist is a sword cultivator, cold and aloof, in an eastern fantasy world',
      'ai.heroSub':'Describe your needs and generate ideas in one tap',
     'ai.generate':'Generate','ai.loading':'Generating…','ai.result':'Result',
     'ai.copy':'Copy','ai.append':'Save to settings','ai.tip':'Content is AI-generated for reference only. Please verify and refine it yourself.',
     'ai.needKey':'Please set your DeepSeek API Key in Settings first',
     'ai.copied':'Copied to clipboard','ai.copyFail':'Copy failed, please long-press to copy manually',
     'ai.pickWork':'Save to which work?','ai.appendedTo':'Saved to the settings of 《{w}》','ai.noWork':'Please create or open a work first',
     'ai.errNet':'Network request failed. Check your connection and retry','ai.errKey':'Invalid or expired API Key. Please check Settings',
     'ai.errBusy':'Too many requests. Please try again later','ai.errServer':'Server busy. Please try again later','ai.errEmpty':'AI returned no content. Please retry',
     'ai.genHint':'Generating, please wait…'
   }
 };

var curLang = LS.get(K.LANG,'zh-CN');
if(!I18N[curLang]) curLang = 'zh-CN';
function t(key){
  var tbl = I18N[curLang] || I18N['zh-CN'];
  return tbl[key] || (I18N['zh-CN'][key] || key);
}

/* ============================================================
   【4批e-fix41】作品设定体系 i18n 键（人设 / 世界观 / 其他）
   ============================================================ */
(function(){
  var zhCN = {
    'set.title':'作品设定','set.persona':'人设','set.worldview':'世界观','set.other':'其他设定',
    'set.newPersona':'+ 新建人设卡','set.noPersona':'还没有人设卡，点上方新建',
    'set.cardTitle':'人设卡','set.close':'关闭','set.editCard':'修改',
    'set.fName':'姓名','set.fGender':'性别','set.fAge':'年龄','set.fRace':'种族',
    'set.fIdentity':'身份','set.fLook':'外貌','set.fBg':'背景故事','set.fRel':'与其他角色的关系',
    'set.saved':'已保存','set.deleted':'已删除','set.personaDetail':'人设详情',
    'set.delPersona':'删除人设卡','set.delPersonaMsg':'删除后不可恢复，确定删除这张人设卡吗？',
    'set.tipName':'请填写姓名',
    'set.newWorld':'+ 新建世界观设定','set.newSetting':'+ 新建设定','set.noSetting':'还没有设定，点上方新建','set.cardTitle2':'设定','set.cardText':'内容'
  };
  var zhTW = {
    'set.title':'作品設定','set.persona':'人設','set.worldview':'世界觀','set.other':'其他設定',
    'set.newPersona':'+ 新增人設卡','set.noPersona':'還沒有人設卡，點上方新增',
    'set.cardTitle':'人設卡','set.close':'關閉','set.editCard':'修改',
    'set.fName':'姓名','set.fGender':'性別','set.fAge':'年齡','set.fRace':'種族',
    'set.fIdentity':'身分','set.fLook':'外貌','set.fBg':'背景故事','set.fRel':'與其他角色的關係',
    'set.saved':'已儲存','set.deleted':'已刪除','set.personaDetail':'人設詳情',
    'set.delPersona':'刪除人設卡','set.delPersonaMsg':'刪除後不可恢復，確定刪除這張人設卡嗎？',
    'set.tipName':'請填寫姓名',
    'set.newWorld':'+ 新增世界觀設定','set.newSetting':'+ 新增設定','set.noSetting':'還沒有設定，點上方新增','set.cardTitle2':'設定','set.cardText':'內容'
  };
  var en = {
    'set.title':'Work Settings','set.persona':'Characters','set.worldview':'Worldview','set.other':'Other Settings',
    'set.newPersona':'+ New Character','set.noPersona':'No characters yet. Tap above to add.',
    'set.cardTitle':'Character Card','set.close':'Close','set.editCard':'Edit',
    'set.fName':'Name','set.fGender':'Gender','set.fAge':'Age','set.fRace':'Race',
    'set.fIdentity':'Identity','set.fLook':'Appearance','set.fBg':'Backstory','set.fRel':'Relationships',
    'set.saved':'Saved','set.deleted':'Deleted','set.personaDetail':'Character detail',
    'set.delPersona':'Delete character','set.delPersonaMsg':'This cannot be undone. Delete this character card?',
    'set.tipName':'Please enter a name',
    'set.newWorld':'+ New Worldview','set.newSetting':'+ New Setting','set.noSetting':'No settings yet. Tap above to add.','set.cardTitle2':'Setting','set.cardText':'Content'
  };
  function merge(tbl, add){ for(var k in add){ if(!tbl[k]) tbl[k] = add[k]; } }
  merge(I18N['zh-CN'], zhCN);
  merge(I18N['zh-TW'], zhTW);
  merge(I18N['en'], en);
})();
function applyI18N(){
  var nodes = document.querySelectorAll('[data-i18n]');
  for(var i=0;i<nodes.length;i++){
    nodes[i].textContent = t(nodes[i].getAttribute('data-i18n'));
  }
  /* 【4批e-fix23】占位符翻译：data-i18n-ph */
  var phs = document.querySelectorAll('[data-i18n-ph]');
  for(var j=0;j<phs.length;j++){
    phs[j].setAttribute('placeholder', t(phs[j].getAttribute('data-i18n-ph')));
  }
}

/* ---------------- 字体 / 字号 ---------------- */
var FSIZE_MAP = { xs:'13px', s:'14.5px', m:'16px', l:'18px', xl:'20px' };
var FSIZE_W_MAP = { xs:'14px', s:'15.5px', m:'17px', l:'19px', xl:'21.5px' };
var FONT_MAP = {
  system:'-apple-system,"PingFang SC","Noto Sans CJK SC","Microsoft YaHei",sans-serif',
  hei:'"PingFang SC","Noto Sans SC","Heiti SC","Microsoft YaHei",sans-serif',
  song:'"Songti SC","Noto Serif CJK SC","SimSun",serif'
};
function applyFontTheme(){
  var root = document.documentElement;
  root.setAttribute('data-theme', LS.get(K.THEME,'light'));
  root.setAttribute('data-skin', LS.get(K.SKIN,'normal'));
  root.style.setProperty('--fs-base', FSIZE_MAP[LS.get(K.FSIZE,'m')] || FSIZE_MAP.m);
  root.style.setProperty('--fs-write', FSIZE_W_MAP[LS.get(K.FSIZE_W,'m')] || FSIZE_W_MAP.m);
  var fk = LS.get(K.FONT,'system');
  var ff = FONT_MAP[fk] || FONT_MAP.system;
  root.style.setProperty('--font-write', ff);
  root.style.setProperty('--font-main', ff);
}

/* ---------------- 路由 / tab ---------------- */
function switchTab(tab, save){
  var ORDER = ['tools','shelf','set'];
  var prev = LS.get('xxzzu_tab') || 'shelf';
  // 【返修4批e-fix6】切 tab 时关闭关于弹窗，避免残留
  var _am = document.getElementById('aboutMask'), _ab = document.getElementById('aboutBox');
  if(_am) _am.classList.remove('show');
  if(_ab) _ab.classList.remove('show');
  var dir = ORDER.indexOf(tab) >= ORDER.indexOf(prev) ? 'in-r' : 'in-l';
  var noAnim = (save === 'noAnim');
  var pages = document.querySelectorAll('.page');
  for(var i=0;i<pages.length;i++){
    var isCur = pages[i].getAttribute('data-tab')===tab;
    pages[i].classList.remove('in-r','in-l');
    if(isCur){
      pages[i].classList.remove('hidden');
      if(!noAnim){ void pages[i].offsetWidth; pages[i].classList.add(dir); }
    } else {
      pages[i].classList.add('hidden');
    }
  }
  var tabs = document.querySelectorAll('.tab-item');
  for(var j=0;j<tabs.length;j++){
    if(tabs[j].getAttribute('data-tab')===tab) tabs[j].classList.add('on');
    else tabs[j].classList.remove('on');
  }
  // 【返修4批e-fix2】切到设置 tab 时做真正的初始化：
  // 1) 同步各分段选择器的默认高亮；2) API Key 显示掩码且只读；3) 抽屉（关于）收起
  if(tab === 'set'){
    syncSeg('segTheme', LS.get(K.THEME,'light'));
    syncSeg('segSkin', LS.get(K.SKIN,'normal'));
    syncSeg('segLang', curLang);
    syncSeg('segSize', LS.get(K.FSIZE,'m'));
    syncSeg('segModel', LS.get(K.MODEL,'flash'));
    syncSeg('segFont', LS.get(K.FONT,'system'));
    refreshKeyField();
    var blocks = document.querySelectorAll('.drawer-block[data-key]');
    Array.prototype.forEach.call(blocks, function(b){ b.classList.remove('open'); });
  }
  if(save!==false) LS.set('xxzzu_tab', tab);
  /* 【4批e-fix23】切到工具 tab 时刷新 AI 四项灰态（Key 可能刚在设置页改过） */
  if(tab === 'tools'){ try{ refreshToolGrid(); }catch(e){} }
}
function openSub(id){
  var el=$(id); if(!el) return;
  // 先移除上一轮的"动画结束"标记，让进场动画能重新播放
  el.classList.remove('sub-in-done');
  el.classList.remove('hidden');
  // 保险：打开二级页时强制关掉可能残留的弹窗遮罩，避免遮挡输入
  if(popMaskEl) popMaskEl.classList.remove('show');
  if(popSheetEl){ popSheetEl.classList.remove('show'); popSheetEl.classList.remove('open'); }
  // 动画结束后移除合成层（transform），修复 Android WebView 输入框光标闪但打不进字的问题。
  // 用 animationend 精确清层（比固定定时器可靠，避免动画未播完就手动聚焦输入框导致 IME 送字失败），
  // 同时保留一个略长的定时器兜底，防止某些 WebView 不派发 animationend。
  function clearLayer(){
    el.classList.add('sub-in-done');
    el.removeEventListener('animationend', onAnimEnd);
    clearTimeout(el._subT);
  }
  function onAnimEnd(e){ if(e.target === el) clearLayer(); }
  el.removeEventListener('animationend', onAnimEnd);
  el.addEventListener('animationend', onAnimEnd);
  clearTimeout(el._subT);
  el._subT = setTimeout(clearLayer, 420);
}
function closeSub(id){ var el=$(id); if(el) el.classList.add('hidden'); }

/* ---------------- 通用弹窗 pop ---------------- */
var popMaskEl, popSheetEl, popTitleEl, popBodyEl;
var popOnClose = null;
function closePop(){
  if(popMaskEl) popMaskEl.classList.remove('show');
  if(popSheetEl){
    popSheetEl.classList.remove('show');
    popSheetEl.classList.remove('pop-in-done');
  }
  var cb = popOnClose; popOnClose = null;
  if(cb) cb();
}
function pop(opt){
  opt = opt || {};
  popOnClose = opt.onClose || null;
  if(popTitleEl) popTitleEl.textContent = opt.title || '';
  if(!popBodyEl) return;
  popBodyEl.innerHTML = '';
  if(opt.msg){
    var msgEl = document.createElement('div');
    msgEl.className = 'pop-msg';
    msgEl.textContent = opt.msg;
    popBodyEl.appendChild(msgEl);
    var lineM = document.createElement('div');
    lineM.className = 'pop-btn-line';
    if(opt.showCancel!==false){
      var cbm = document.createElement('button');
      cbm.className = 'pop-btn pop-btn-ghost';
      cbm.textContent = opt.cancelText || t('common.cancel');
      cbm.addEventListener('click', closePop);
      lineM.appendChild(cbm);
    }
    var okm = document.createElement('button');
    okm.className = 'pop-btn pop-btn-main' + (opt.danger?' pop-btn-danger':'');
    okm.textContent = opt.okText || t('common.ok');
    okm.addEventListener('click', function(){
      var fnm = opt.onOk;
      closePop();
      if(fnm) fnm();
    });
    lineM.appendChild(okm);
    popBodyEl.appendChild(lineM);
  } else if(opt.input){
    var lab = document.createElement('div');
    lab.className = 'field-label';
    lab.textContent = opt.input.label || '';
    var inp = document.createElement('input');
    inp.className = 'field-input';
    inp.type = 'text';
    inp.value = opt.input.value || '';
    inp.placeholder = opt.input.placeholder || '';
    popBodyEl.appendChild(lab);
    popBodyEl.appendChild(inp);
    // 等进场动画 + transform 合成层清理完成后再聚焦，避免 IME 连接失败
    setTimeout(function(){ try{ inp.focus(); }catch(e){} }, 320);
    var line = document.createElement('div');
    line.className = 'pop-btn-line';
    if(opt.showCancel!==false){
      var cb1 = document.createElement('button');
      cb1.className = 'pop-btn pop-btn-ghost';
      cb1.textContent = opt.cancelText || t('common.cancel');
      cb1.addEventListener('click', closePop);
      line.appendChild(cb1);
    }
    var ok1 = document.createElement('button');
    ok1.className = 'pop-btn pop-btn-main';
    ok1.textContent = opt.okText || t('common.ok');
    ok1.addEventListener('click', function(){
      var v = inp.value.trim();
      var fn = opt.onOk;
      closePop();
      if(fn) fn(v);
    });
    line.appendChild(ok1);
    popBodyEl.appendChild(line);
  } else if(opt.list){
    var wrap = document.createElement('div');
    wrap.className = 'pop-list';
    for(var i=0;i<opt.list.length;i++){
      (function(item){
        var row = document.createElement('div');
        row.className = 'pop-item' + (item.on?' on':'') + (item.del?' del':'');
        var sp = document.createElement('span');
        sp.textContent = item.text;
        if(item.css) sp.setAttribute('style', item.css);
        row.appendChild(sp);
        if(item.on){
          var ck = document.createElement('span');
          ck.className = 'pop-ck';
          ck.textContent = '✓';
          row.appendChild(ck);
        }
        row.addEventListener('click', function(){
          var fn = opt.onPick;
          closePop();
          if(fn) fn(item.val);
        });
        wrap.appendChild(row);
      })(opt.list[i]);
    }
    popBodyEl.appendChild(wrap);
  } else {
    var line2 = document.createElement('div');
    line2.className = 'pop-btn-line';
    if(opt.showCancel!==false){
      var cb2 = document.createElement('button');
      cb2.className = 'pop-btn pop-btn-ghost';
      cb2.textContent = opt.cancelText || t('common.cancel');
      cb2.addEventListener('click', closePop);
      line2.appendChild(cb2);
    }
    var ok2 = document.createElement('button');
    ok2.className = 'pop-btn pop-btn-main' + (opt.danger?' pop-btn-danger':'');
    ok2.textContent = opt.okText || t('common.ok');
    ok2.addEventListener('click', function(){
      var fn = opt.onOk;
      closePop();
      if(fn) fn();
    });
    line2.appendChild(ok2);
    popBodyEl.appendChild(line2);
  }
  if(popMaskEl) popMaskEl.classList.add('show');
  if(popSheetEl){
    popSheetEl.classList.remove('pop-in-done');
    popSheetEl.classList.add('show');
    // 动画结束后移除 transform 合成层，修复 Android WebView 弹窗输入框首次打不进字的问题
    setTimeout(function(){ popSheetEl.classList.add('pop-in-done'); }, 300);
  }
}

/* ---------------- 内存数据 store ---------------- */
var COVERS = {
  blue:  'linear-gradient(135deg,#5b8cff,#7aa8ff)',
  green: 'linear-gradient(135deg,#3fbf8f,#6fd8b0)',
  pink:  'linear-gradient(135deg,#ff7aa8,#ff9ec2)',
  amber: 'linear-gradient(135deg,#f5a623,#ffc45e)'
};
var store = {
  works: [],
  curWork: null,
  curChapter: null
};
/* ---------- 账号隔离：每个账号一套数据键 ---------- */
function accountKey(){
  var em = LS.get(K.EMAIL, '') || '';
  if(!em){ return K.WORKS + ':local'; }
  return K.WORKS + ':' + em.toLowerCase();
}
function loadWorks(){
  store.works = [];
  try{
    var raw = LS.get(accountKey(), '');
    if(raw) store.works = JSON.parse(raw) || [];
  }catch(e){ store.works = []; }
  store.curWork = null;
  store.curChapter = null;
}
function saveWorks(){
  try{ LS.set(accountKey(), JSON.stringify(store.works)); }catch(e){}
}
function uid(){ return Date.now().toString(36) + Math.random().toString(36).slice(2,7); }
/* 【4批e-fix20】只统计汉字/字母/数字，标点、符号、空白均不计入（口径 B） */
function countWords(s){
  var m = (s||'').match(/[\u4e00-\u9fff\u3400-\u4dbf\uf900-\ufaffa-zA-Z0-9]/g);
  return m ? m.length : 0;
}
/* ============================================================
   【4批e-fix22】写作流水账 wlog：记录「每天的净增字数」
   结构：数组，每条 { t:时间戳, d:净增字数(可负), w:作品id, c:章节id }
   用途：统计 今天/昨天/近7天/近30天/本月/上月 的写字量 + 折线图
   说明：从本版本起开始记账，历史数据无法补录（只统计今后）。
   ============================================================ */
function wlogKey(){ return K.WLOG + ':' + (LS.get(K.EMAIL,'')||'local').toLowerCase(); }
function wlogLoad(){
  try{
    var raw = LS.get(wlogKey(), '');
    if(raw){ var a = JSON.parse(raw); return Array.isArray(a) ? a : []; }
  }catch(e){}
  return [];
}
function wlogSave(arr){
  /* 只保留最近 400 天，防止无限增长 */
  try{
    var cut = Date.now() - 400*24*3600*1000;
    var kept = arr.filter(function(x){ return x && x.t >= cut; });
    LS.set(wlogKey(), JSON.stringify(kept));
  }catch(e){}
}
/* 记一笔：delta 为净增（正=写，负=删）；|delta|==0 不记 */
function wlogAdd(workId, chapterId, delta){
  delta = Math.round(delta||0);
  if(!delta) return;
  var arr = wlogLoad();
  arr.push({ t:Date.now(), d:delta, w:workId||'', c:chapterId||'' });
  wlogSave(arr);
}
/* 把时间戳归到「本地日」的 yyyy-mm-dd */
function dayKey(ts){
  var d = new Date(ts);
  function p(n){ return (n<10?'0':'')+n; }
  return d.getFullYear()+'-'+p(d.getMonth()+1)+'-'+p(d.getDate());
}
/* 返回某区间的 [起, 止) 时间戳；kind: today|yesterday|d7|d30|month|lastMonth */
function rangeOf(kind){
  var now = new Date();
  var y = now.getFullYear(), m = now.getMonth(), dd = now.getDate();
  var start = new Date(y, m, dd).getTime();          // 今天 0 点
  var DAY = 24*3600*1000;
  if(kind==='today')      return [start, start+DAY];
  if(kind==='yesterday')  return [start-DAY, start];
  if(kind==='d7')         return [start-6*DAY, start+DAY];
  if(kind==='d30')        return [start-29*DAY, start+DAY];
  if(kind==='month')      return [new Date(y, m, 1).getTime(), new Date(y, m+1, 1).getTime()];
  if(kind==='lastMonth')  return [new Date(y, m-1, 1).getTime(), new Date(y, m, 1).getTime()];
  return [start, start+DAY];
}
/* 某区间的净增总字数 */
function wlogSum(kind){
  var r = rangeOf(kind);
  var n = 0;
  wlogLoad().forEach(function(x){ if(x.t>=r[0] && x.t<r[1]) n += x.d; });
  return n;
}
/* 近 n 天每日净增数组（含今天），供折线图：返回 [{k:'MM-DD', v:数字}] */
function wlogDaily(days){
  days = days || 7;
  var DAY = 24*3600*1000;
  var now = new Date();
  var start = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime();
  var map = {};
  wlogLoad().forEach(function(x){
    if(x.t >= start-(days-1)*DAY){ var k = dayKey(x.t); map[k] = (map[k]||0) + x.d; }
  });
  var out = [];
  for(var i=days-1;i>=0;i--){
    var ts = start - i*DAY, d = new Date(ts);
    function p(n){ return (n<10?'0':'')+n; }
    out.push({ k: (d.getMonth()+1)+'-'+p(d.getDate()), v: map[dayKey(ts)]||0 });
  }
  return out;
}
store.create = function(title, author, intro){
  var w = { id:uid(), title:title, author:author||'', intro:intro||'', chapters:[], settings:newSettingsObj(), ctime:Date.now(), utime:Date.now() };
  this.works.unshift(w);
  saveWorks();
  return w;
};
store.addChapter = function(work, title){
  var ch = { id:uid(), title:title||t('tip.untitledChapter'), content:'', words:0, ctime:Date.now(), utime:Date.now() };
  work.chapters.push(ch);
  work.utime = Date.now();
  saveWorks();
  return ch;
};
store.delChapter = function(work, ch){
  var i = work.chapters.indexOf(ch);
  if(i>=0) work.chapters.splice(i,1);
  if(store.curChapter===ch){ store.curChapter = null; }
  work.utime = Date.now();
  saveWorks();
};
store.delWork = function(work){
  var i = this.works.indexOf(work);
  if(i>=0) this.works.splice(i,1);
  if(this.curWork===work){ this.curWork = null; this.curChapter = null; }
  saveWorks();
};
store.totalWords = function(work){
  var n = 0;
  (work.chapters||[]).forEach(function(c){ n += (c.words||0); });
  return n;
};
/* ============================================================
   【4批e-fix41】作品设定体系：数据结构 + 存取方法
   w.settings = { personas:[], worldview:'', other:'' }
   personas 每项：{ id, name, gender, age, race, identity, look, bg, rel }
   ============================================================ */
function newSettingsObj(){
  return { personas:[], worldview:'', other:'', worldviewList:[], otherList:[] };
}
function newPersonaObj(){
  return { id:uid(), name:'', gender:'', age:'', race:'', identity:'', look:'', bg:'', rel:'', ctime:Date.now() };
}
/* 取（必要时补）某作品的 settings 对象，兼容旧数据 */
function ensureSettings(work){
  if(!work) return newSettingsObj();
  if(!work.settings || typeof work.settings !== 'object'){ work.settings = newSettingsObj(); }
  if(!Array.isArray(work.settings.personas)){ work.settings.personas = []; }
  if(typeof work.settings.worldview !== 'string'){ work.settings.worldview = work.settings.worldview || ''; }
  if(typeof work.settings.other !== 'string'){ work.settings.other = work.settings.other || ''; }
  /* fix42：列表字段，兼容旧字符串数据（迁移为列表首项，只迁一次） */
  if(!Array.isArray(work.settings.worldviewList)){
    work.settings.worldviewList = [];
    if(work.settings.worldview && String(work.settings.worldview).trim()){
      work.settings.worldviewList.push({ id:uid(), text:String(work.settings.worldview), ctime:Date.now() });
    }
  }
  if(!Array.isArray(work.settings.otherList)){
    work.settings.otherList = [];
    if(work.settings.other && String(work.settings.other).trim()){
      work.settings.otherList.push({ id:uid(), text:String(work.settings.other), ctime:Date.now() });
    }
  }
  return work.settings;
}
store.getSettings = function(work){ return ensureSettings(work); };
store.addPersona = function(work){
  var st = ensureSettings(work);
  var p0 = newPersonaObj();
  st.personas.push(p0);
  work.utime = Date.now();
  saveWorks();
  return p0;
};
store.delPersona = function(work, persona){
  var st = ensureSettings(work);
  var i = st.personas.indexOf(persona);
  if(i>=0) st.personas.splice(i,1);
  work.utime = Date.now();
  saveWorks();
};
/* fix42：设定条目（worldview / other 通用） */
store.addSettingItem = function(work, key, text){
  var st = ensureSettings(work);
  var item = { id:uid(), text:String(text), ctime:Date.now() };
  st[key].push(item);
  work.utime = Date.now();
  saveWorks();
  return item;
};
store.delSettingItem = function(work, key, item){
  var st = ensureSettings(work);
  var i = st[key].indexOf(item);
  if(i>=0) st[key].splice(i,1);
  work.utime = Date.now();
  saveWorks();
};


/* ---------------- 书架 ---------------- */
function fmtWords(n){
  if(n>=10000) return (n/10000).toFixed(1) + '万';
  if(n>=1000) return (n/1000).toFixed(1) + 'k';
  return String(n||0);
}
function renderShelf(){
  var list = $('shelfList');
  var empty = $('shelfEmpty');
  if(!list) return;
  list.innerHTML = '';
  var n = store.works.length;
  if(empty) empty.classList.toggle('hidden', n>0);
  if(list) list.classList.toggle('hidden', n===0);
  store.works.forEach(function(w){
    var card = document.createElement('div');
    card.className = 'book-row';
    card.addEventListener('click', function(){ openWorkInfo(w); });
    var info = document.createElement('div');
    info.className = 'book-info';
    var t1 = document.createElement('div');
    t1.className = 'book-title';
    t1.textContent = w.title || '';
    var t2 = document.createElement('div');
    t2.className = 'book-meta';
    t2.textContent = w.author ? w.author : '';
    if(w.author) info.appendChild(t1), info.appendChild(t2);
    else info.appendChild(t1);
    card.appendChild(info);
    list.appendChild(card);
  });
}

/* ---------------- 创建作品 ---------------- */
function bindCreate(){
  var back = $('createBack');
  if(back) back.addEventListener('click', function(){ closeSub('subCreate'); });
  var ok = $('createConfirm');
  if(ok) ok.addEventListener('click', function(){
    var tt = ($('createTitle')||{}).value || '';
    var au = ($('createAuthor')||{}).value || '';
    var intro = ($('createIntro')||{}).value || '';
    if(!tt.trim()){ pop({ title:t('tip.titleEmpty'), okText:t('common.ok') }); return; }
    store.create(tt.trim(), au.trim(), intro.trim());
    if($('createTitle')) $('createTitle').value = '';
    if($('createAuthor')) $('createAuthor').value = '';
    if($('createIntro')) $('createIntro').value = '';
    closeSub('subCreate');
    renderShelf();
    switchTab('shelf');
  });
}

/* ---------------- 作品信息页 ---------------- */
var _wiWork = null;
function renderWorkInfoView(){
  var w = _wiWork;
  if(!w) return;
  if($('wiTitleView')) $('wiTitleView').textContent = w.title || t('tip.untitledWork');
  if($('wiAvatarView')) $('wiAvatarView').textContent = (w.title || '').trim().charAt(0).toUpperCase();
  if($('wiAuthorView')) $('wiAuthorView').textContent = w.author || t('create.authorPh') || '—';
  if($('wiIntroView')) $('wiIntroView').textContent = w.intro || t('work.noIntro');
  if($('workTopTitle')) $('workTopTitle').textContent = w.title || t('create.name');
}
function setWiEditMode(on){
  if($('wiEditBox')) $('wiEditBox').classList.toggle('hidden', !on);
  if(on){
    if($('wiTitle')) $('wiTitle').value = (_wiWork||{}).title || '';
    if($('wiAuthor')) $('wiAuthor').value = (_wiWork||{}).author || '';
    if($('wiIntro')) $('wiIntro').value = (_wiWork||{}).intro || '';
  }
}
function openWorkInfo(work){
  _wiWork = work;
  setWiEditMode(false);
  renderWorkInfoView();
  renderWorkChapters();
  openSub('subWork');
}
function renderWorkChapters(){
  var list = $('workChList');
  var empty = $('workChEmpty');
  var w = _wiWork;
  if(!list || !w) return;
  list.innerHTML = '';
  var n = (w.chapters||[]).length;
  if(empty) empty.classList.toggle('hidden', n>0);
  (w.chapters||[]).forEach(function(c, i){
    var row = document.createElement('div');
    row.className = 'ch-row';
    var name = document.createElement('div');
    name.className = 'ch-name';
    name.textContent = (i+1) + '. ' + (c.title || t('tip.untitledChapter'));
    var meta = document.createElement('div');
    meta.className = 'ch-meta';
    meta.textContent = fmtWords(c.words||0);
    row.appendChild(name);
    row.appendChild(meta);
    row.addEventListener('click', function(){ openWrite(w, c); });
    list.appendChild(row);
  });
}
function bindWorkInfo(){
  var back = $('workBack');
  if(back) back.addEventListener('click', function(){ closeSub('subWork'); });
  /* 【4批e-fix41】作品设定入口：人设 / 世界观 / 其他 */
  if($('setGoPersona')) $('setGoPersona').addEventListener('click', function(){ openSetting('persona'); });
  if($('setGoWorld'))   $('setGoWorld').addEventListener('click', function(){ openSetting('world'); });
  if($('setGoOther'))   $('setGoOther').addEventListener('click', function(){ openSetting('other'); });
  var eBtn = $('wiEditBtn');
  if(eBtn) eBtn.addEventListener('click', function(){ setWiEditMode(true); });
  var cBtn = $('wiCancelBtn');
  if(cBtn) cBtn.addEventListener('click', function(){ setWiEditMode(false); });
  var sBtn = $('wiSaveBtn');
  if(sBtn) sBtn.addEventListener('click', function(){
    if(!_wiWork) return;
    _wiWork.title = ($('wiTitle')||{}).value || '';
    _wiWork.author = ($('wiAuthor')||{}).value || '';
    _wiWork.intro = ($('wiIntro')||{}).value || '';
    _wiWork.utime = Date.now();
    saveWorks();
    setWiEditMode(false);
    renderWorkInfoView();
    renderShelf();
  });
  var add = $('chAddBtn');
  if(add) add.addEventListener('click', function(){
    if(!_wiWork) return;
    pop({ title:t('write.newChapter'), input:{label:t('write.chapterName'), value:'', placeholder:t('write.chapterPh')}, onOk:function(v){
      store.addChapter(_wiWork, (v||'').trim() || null);
      renderWorkChapters();
      renderShelf();
    }});
  });
  var del = $('workDelBtn');
  if(del) del.addEventListener('click', function(){
    if(!_wiWork) return;
    var w = _wiWork;
    pop({ title:t('tip.delWork'), msg:t('tip.delWorkMsg'),
      okText:t('common.delete'), danger:true, cancelText:t('common.cancel'),
      onOk:function(){
        store.delWork(w);
        _wiWork = null;
        closeSub('subWork');
        renderShelf();
      }});
  });
}

/* ---------------- 写作页 ---------------- */
/* 【返修4批e-fix16】openWrite 支持指定章节，未传才回退第一章 */
function openWrite(work, chapter){
  store.curWork = work;
  if($('writeWorkName')) $('writeWorkName').textContent = work.title || '';
  var ch = chapter || (work.chapters.length ? work.chapters[0] : store.addChapter(work, null));
  store.curChapter = ch;
  loadChapter(ch);
  renderToc();
  openSub('subWrite');
}
function loadChapter(ch){
  store.curChapter = ch;
  if($('chapterTitle')) $('chapterTitle').value = ch.title || '';
  if($('editor')) $('editor').innerHTML = ch.content || '';
  updateWordCount();
  setSaveState('saved');
}
/* 【4批e-fix22】写作流水账上下文：记录「当前正在编辑的章节」及其上次字数快照。
   updateWordCount 是字数变动的唯一真实点，delta 在这里统计。 */
var _wlogCtx = { chId:null, last:0 };
function updateWordCount(){
  var ed = $('editor');
  var n = ed ? countWords(ed.innerText) : 0;
  /* --- 流水账：仅在「同一章节持续编辑」时记净增；切章只刷新快照 --- */
  var cw = store.curWork, cc = store.curChapter;
  if(cc){
    if(_wlogCtx.chId !== cc.id){
      /* 章节切换/首次加载：刷新快照，不计账（避免把整章算进来） */
      _wlogCtx.chId = cc.id; _wlogCtx.last = n;
    }else if(n !== _wlogCtx.last){
      var _d = n - _wlogCtx.last;
      _wlogCtx.last = n;
      wlogAdd(cw ? cw.id : '', cc.id, _d);
    }
  }
  if(cc) cc.words = n;
  /* 【4批e-fix19】只输出数字，单位「字」由 HTML 静态 span 提供（避免重复成「12 字 字」） */
  if($('wordCount')) $('wordCount').textContent = n;
}
function setSaveState(s){
  var el = $('saveState');
  if(!el) return;
  el.textContent = s==='saving' ? t('write.saving') : t('write.saved');
  el.classList.toggle('saving', s==='saving');
}
var saveTimer = null;
function markDirty(){
  setSaveState('saving');
  if(saveTimer) clearTimeout(saveTimer);
  saveTimer = setTimeout(function(){ saveCurrent(); }, 800);
}
function saveCurrent(){
  var w = store.curWork, ch = store.curChapter;
  if(!w || !ch) return;
  setSaveState('saving');
  if($('chapterTitle')) ch.title = $('chapterTitle').value || t('tip.untitledChapter');
  if($('editor')) ch.content = $('editor').innerHTML;
  ch.utime = Date.now();
  w.utime = Date.now();
  updateWordCount();
  /* 【返修4批e-fix13】关键修复：正文/标题必须真正落盘，
     否则刷新后 loadWorks() 从 storage 读回旧内容（假保存）。 */
  saveWorks();
  setSaveState('saved');
  renderToc();
}

/* ---------------- 目录树 ---------------- */
function renderToc(){
  var list = $('tocList');
  var w = store.curWork;
  if(!list || !w) return;
  list.innerHTML = '';
  w.chapters.forEach(function(c, i){
    var row = document.createElement('div');
    row.className = 'toc-item' + (c===store.curChapter ? ' on' : '');
    var name = document.createElement('div');
    name.className = 'toc-name';
    name.textContent = (i+1) + '. ' + (c.title || t('tip.untitledChapter'));
    row.appendChild(name);
    row.addEventListener('click', function(){
      saveCurrent();
      loadChapter(c);
      renderToc();
      closeToc();
    });
    var pressTimer = null;
    row.addEventListener('touchstart', function(){ pressTimer = setTimeout(function(){ delChapterConfirm(c); }, 600); });
    row.addEventListener('touchend', function(){ if(pressTimer) clearTimeout(pressTimer); });
    row.addEventListener('touchmove', function(){ if(pressTimer) clearTimeout(pressTimer); });
    list.appendChild(row);
  });
}
function openToc(){
  if($('writeToc')){ $('writeToc').classList.remove('hidden'); }
}
function closeToc(){
  if($('writeToc')){ $('writeToc').classList.add('hidden'); }
}
function delChapterConfirm(ch){
  pop({
    title: ch.title || t('tip.untitledChapter'),
    okText: t('common.delete'), danger:true,
    onOk: function(){
      store.delChapter(store.curWork, ch);
      if(!store.curWork.chapters.length) store.addChapter(store.curWork, null);
      if(store.curChapter===null) loadChapter(store.curWork.chapters[0]);
      renderToc();
    }
  });
}

/* ---------------- 右上菜单 ---------------- */
function closeMenu(){ if($('menuPop')) $('menuPop').classList.remove('show'); }
function bindMenu(){
  /* 【返修4批e-fix15c】点三个点切换抽屉开/关，仅此一种开关方式 */
  var btn = $('writeMenu');
  if(btn) btn.addEventListener('click', function(e){
    e.stopPropagation();
    var panel = $('writeToc');
    if(panel && !panel.classList.contains('hidden')){
      closeToc();
    } else {
      renderToc();
      openToc();
    }
  });
  document.addEventListener('click', function(){ closeMenu(); });
  var acts = document.querySelectorAll('#menuPop [data-act]');
  Array.prototype.forEach.call(acts, function(el){
    el.addEventListener('click', function(e){
      e.stopPropagation();
      var act = el.getAttribute('data-act');
      closeMenu();
      if(act==='newchapter'){
        saveCurrent();
        pop({ title:t('write.newChapter'), input:{label:t('write.chapterName'), value:'', placeholder:t('write.chapterPh')}, onOk:function(v){
          var ch = store.addChapter(store.curWork, (v||'').trim() || null);
          loadChapter(ch);
          renderToc();
        }});
      } else if(act==='rename'){
        var ch = store.curChapter;
        pop({ title:t('write.renameChapter'), input:{label:t('write.chapterName'), value: ch?ch.title:'', placeholder:t('write.chapterPh')}, onOk:function(v){
          if(ch){ ch.title = (v||'').trim() || t('tip.untitledChapter'); loadChapter(ch); renderToc(); }
        }});
      } else if(act==='toc'){
        renderToc();
        openToc();
      }
    });
  });
  var addBtn = $('tocAddBtn');
  if(addBtn) addBtn.addEventListener('click', function(){
    saveCurrent();
    pop({ title:t('write.newChapter'), input:{label:t('write.chapterName'), value:'', placeholder:t('write.chapterPh')}, onOk:function(v){
      var ch = store.addChapter(store.curWork, (v||'').trim() || null);
      loadChapter(ch);
      renderToc();
    }});
  });
  var back = $('writeBack');
  if(back) back.addEventListener('click', function(){
    saveCurrent();
    closeSub('subWrite');
    renderShelf();
    /* 【返修4批e-fix18】退出写作页时刷新作品详情页章节列表，
       否则「字数」停留在进入前渲染的旧值（显示为 0）。 */
    if(_wiWork && _wiWork === store.curWork) renderWorkChapters();
  });
}

/* ---------------- 写作页字号（独立于 UI 字号） ---------------- */
function refreshWfontBar(){
  var bar = $('wfontBar');
  if(!bar) return;
  var cur = LS.get(K.FSIZE_W, 'm');
  var items = bar.querySelectorAll('.wfont-item');
  Array.prototype.forEach.call(items, function(el){
    var k = el.getAttribute('data-fs');
    el.textContent = t('set.size.'+k);
    el.classList.toggle('on', k===cur);
  });
}
function closeWfontBar(){ var b=$('wfontBar'); if(b) b.classList.add('hidden'); }
function bindWriteFont(){
  var bar = $('wfontBar');
  refreshWfontBar();
  if(bar){
    var items = bar.querySelectorAll('.wfont-item');
    Array.prototype.forEach.call(items, function(el){
      el.addEventListener('click', function(){
        var v = el.getAttribute('data-fs');
        LS.set(K.FSIZE_W, v);
        applyFontTheme();
        refreshWfontBar();
      });
    });
  }
  var btn = $('wtFont');
  if(btn) btn.addEventListener('click', function(){
    if(!bar) return;
    bar.classList.toggle('hidden');
  });
  var bold = $('wtBold');
  if(bold) bold.addEventListener('mousedown', function(e){ e.preventDefault(); document.execCommand('bold'); markDirty(); });
  var ita = $('wtItalic');
  if(ita) ita.addEventListener('mousedown', function(e){ e.preventDefault(); document.execCommand('italic'); markDirty(); });
  var save = $('wtSave');
  if(save) save.addEventListener('click', function(){ saveCurrent(); });
  var ed = $('editor');
  if(ed) ed.addEventListener('input', function(){ updateWordCount(); markDirty(); });
  var ttl = $('chapterTitle');
  if(ttl) ttl.addEventListener('input', markDirty);
}

/* ---------------- 设置页分段 ---------------- */
function syncSeg(segId, val){
  var seg = document.querySelectorAll('#'+segId+' .seg-item');
  Array.prototype.forEach.call(seg, function(el){
    el.classList.toggle('on', el.getAttribute('data-val')===val);
  });
}
function bindSeg(segId, key, cb){
  var seg = document.querySelectorAll('#'+segId+' .seg-item');
  Array.prototype.forEach.call(seg, function(el){
    el.addEventListener('click', function(){
      var v = el.getAttribute('data-val');
      LS.set(key, v);
      syncSeg(segId, v);
      if(cb) cb(v);
    });
  });
}

/* ---------------- 设置页 ---------------- */
function bindSettings(){
  // 【返修4批e】设置已成为 tab 页，返回按钮（settingsBack）随二级页一起移除

  bindSeg('segTheme', K.THEME, function(v){ applyFontTheme(); });
  bindSeg('segSkin', K.SKIN, function(v){ applyFontTheme(); });
  bindSeg('segLang', K.LANG, function(v){ curLang = v; applyI18N(); });
  bindSeg('segSize', K.FSIZE, function(v){ applyFontTheme(); });
  bindSeg('segModel', K.MODEL, function(v){ LS.set(K.MODEL, v); });
  // fix37 导出位置：显示当前路径 + 更换按钮（弹选择）
  refreshExportPath();
  var _epc = $('exportPathChange');
  if(_epc) _epc.addEventListener('click', function(){ changeExportPath(); });

  bindSeg('segFont', K.FONT, function(v){ applyFontTheme(); });
  // 【返修4批e-fix2】API Key：有值则掩码只读，点「修改」才解锁明文编辑
  var keySave = $('apiKeySave');
  if(keySave) keySave.addEventListener('click', function(){
    var inp = $('apiKeyInput');
    var v = inp ? (inp.value||'').trim() : '';
    // 处于只读掩码态时点保存：不读掩码值，直接忽略
    if(inp && inp.readOnly) return;
    if(v){ LS.set(K.APIKEY, v); applyI18N(); pop({ title:'已保存', okText:t('common.ok') }); refreshKeyField(); refreshToolGrid(); }
    else { pop({ title:'请先填入 API Key', okText:t('common.ok') }); }
  });
  var keyEdit = $('apiKeyEdit');
  if(keyEdit) keyEdit.addEventListener('click', function(){
    unlockKeyField();
  });
  var keyClear = $('apiKeyClear');
  if(keyClear) keyClear.addEventListener('click', function(){
    LS.set(K.APIKEY, '');
    unlockKeyField();
    refreshToolGrid();
    var inp = $('apiKeyInput');
    if(inp){ inp.value = ''; inp.focus(); }
  });
  // 【返修4批e】openSettingsBtn 已随「我」页移除（设置改为 tab）
}
function maskKey(k){
  if(!k) return '';
  if(k.length<=8) return '****';
  return k.slice(0,4) + '****' + k.slice(-4);
}
// fix37/fix38 刷新设置页「导出位置」显示
// 兼容普通路径与 SAF 的 content:// URI，展示更友好
function prettyExportPath(p){
  if(!p) return '';
  if(p.indexOf('content://') === 0){
    // content://com.android.externalstorage.documents/tree/primary%3ADownload
    try {
      var s = decodeURIComponent(p.split('/tree/').pop() || p);
      // 去掉 "primary:" 前缀，还原成更友好的路径样式
      if(s.indexOf('primary:') === 0) s = '内部存储/' + s.slice('primary:'.length);
      s = s.replace(/:/g,'/');
      return s;
    } catch(e){ return p; }
  }
  return p;
}
function refreshExportPath(){
  var el = $('exportPathView');
  if(!el) return;
  var cur = LS.get(K.EXPORTDIR,'') || '';
  if(!cur && window.Android && typeof window.Android.exportDir === 'function'){
    try { cur = window.Android.exportDir() || ''; } catch(e){ cur = ''; }
  }
  el.textContent = prettyExportPath(cur) || '—';
}
// fix38 更换导出位置：打开系统文件管理器，让用户自己挑选目录（SAF）
function changeExportPath(){
  if(window.Android && typeof window.Android.pickExportDir === 'function'){
    try {
      window.Android.pickExportDir();  // 打开系统文件管理器；结果通过下方回调返回
    } catch(e){}
    return;
  }
  // 兜底：没有桥时给个提示
  pop({ title: t('set.exportChange'), msg: t('set.exportHint'), okText: t('common.ok') });
}
// fix38 系统文件管理器选目录成功回调（由 MainActivity.onActivityResult 调用）
window.onExportDirPicked = function(uri){
  if(!uri) return;
  LS.set(K.EXPORTDIR, uri);
  refreshExportPath();
  pop({ title: t('set.exportDone'), msg: prettyExportPath(uri), okText: t('common.ok') });
};
// fix38 系统文件管理器取消回调
window.onExportDirCancel = function(){
  // 用户取消，无需处理
};
// 【返修4批e-fix2】根据是否已存 key，刷新输入框为「掩码只读」或「明文空可编辑」
function refreshKeyField(){
  var inp = $('apiKeyInput');
  var edit = $('apiKeyEdit');
  var saveBtn = $('apiKeySave');
  if(!inp) return;
  var k = LS.get(K.APIKEY,'') || '';
  if(k){
    inp.value = maskKey(k);
    inp.readOnly = true;
    inp.classList.add('masked');
    if(edit) edit.classList.remove('hidden');
    if(saveBtn) saveBtn.classList.add('hidden');
  } else {
    inp.value = '';
    inp.readOnly = false;
    inp.classList.remove('masked');
    if(edit) edit.classList.add('hidden');
    if(saveBtn) saveBtn.classList.remove('hidden');
  }
}
// 【返修4批e-fix2】解锁为明文可编辑（点「修改」/「清除」时）
function unlockKeyField(){
  var inp = $('apiKeyInput');
  var edit = $('apiKeyEdit');
  var saveBtn = $('apiKeySave');
  if(!inp) return;
  inp.readOnly = false;
  inp.classList.remove('masked');
  inp.value = LS.get(K.APIKEY,'') || '';
  inp.focus();
  if(edit) edit.classList.add('hidden');
  if(saveBtn) saveBtn.classList.remove('hidden');
}
function openSettings(){
  syncSeg('segTheme', LS.get(K.THEME,'light'));
    syncSeg('segSkin', LS.get(K.SKIN,'normal'));
  syncSeg('segLang', curLang);
  syncSeg('segSize', LS.get(K.FSIZE,'m'));
  syncSeg('segModel', LS.get(K.MODEL,'flash'));
  syncSeg('segFont', LS.get(K.FONT,'system'));
  // 【返修4批e-fix2】输入框按是否已存 key 显示掩码只读 / 明文空可编辑
  refreshKeyField();
  var dis = $('disclaimerText');
  if(dis) dis.classList.remove('hidden');
  // 切到设置 tab，并让所有抽屉收起
  var blocks = document.querySelectorAll('.drawer-block[data-key]');
  Array.prototype.forEach.call(blocks, function(b){ b.classList.remove('open'); });
  switchTab('set');
}

/* ---------------- 登录 ---------------- */
function bindLogin(){
  var lb = $('loginBtn');
  if(lb) lb.addEventListener('click', function(){
    var em = ($('loginEmail')||{}).value || '';
    var pw = ($('loginPwd')||{}).value || '';
    if(!em.trim() || !pw){ pop({ title:t('login.tipTitle'), okText:t('common.ok') }); return; }
    LS.set(K.EMAIL, em.trim());
    LS.set(K.LOGGED, '1');
    if($('loginRemember') && $('loginRemember').classList.contains('on')){
      LS.set(K.REMEMBER, '1');
      LS.set(K.PWD, btoa(pw));
    } else {
      LS.set(K.REMEMBER, '');
      LS.set(K.PWD, '');
    }
    showApp();
  });
  var lr = $('loginRemember');
  if(lr) lr.addEventListener('click', function(){ lr.classList.toggle('on'); });
  var ll = $('loginLocalBtn');
  if(ll) ll.addEventListener('click', function(){
    LS.set(K.LOCAL_ONLY, '1');
    showApp();
  });
  var lf = $('loginForgotBtn');
  if(lf) lf.addEventListener('click', function(){ pop({ title:t('login.forgot'), okText:t('common.ok') }); });
  var savedEmail = LS.get(K.EMAIL,'');
  if(savedEmail && $('loginEmail')) $('loginEmail').value = savedEmail;
  var savedPwd = LS.get(K.PWD,'');
  if(savedPwd && $('loginPwd')){ try{ $('loginPwd').value = atob(savedPwd); }catch(e){} }
  if(LS.get(K.REMEMBER,'') && lr) lr.classList.add('on');
}

/* ---------------- 我 ---------------- */
function renderMe(){
  // 【返修4批d】「我」页暂无动态内容
}
function bindMe(){
  var login = $('meLoginBtn');
  if(login) login.addEventListener('click', function(){
    if($('loginPage')) $('loginPage').classList.remove('hidden');
    if($('app')) $('app').classList.add('hidden');
  });
  var sw = $('meSwitchBtn');
  if(sw) sw.addEventListener('click', function(){
    LS.set(K.LOGGED, '');
    LS.set(K.LOCAL_ONLY, '');
    if($('loginEmail')) $('loginEmail').value = LS.get(K.EMAIL,'') || '';
    if($('loginPwd')) $('loginPwd').value = '';
    if($('loginPage')) $('loginPage').classList.remove('hidden');
    if($('app')) $('app').classList.add('hidden');
  });
  var pwd = $('mePwdBtn');
  if(pwd) pwd.addEventListener('click', function(){
    pop({ title:t('me.changePwd'), msg:t('me.pwdHint'), okText:t('common.ok') });
  });
  var lo = $('meLogoutBtn');
  if(lo) lo.addEventListener('click', function(){
    pop({ title:t('me.logout'), msg:t('me.logoutMsg'), danger:true, okText:t('me.logout'),
      onOk:function(){
        LS.set(K.LOGGED, '');
        LS.set(K.REMEMBER, '');
        LS.set(K.PWD, '');
        LS.set(K.LOCAL_ONLY, '');
        LS.set(K.EMAIL, '');
        loadWorks();
        renderShelf();
        if($('loginPage')) $('loginPage').classList.remove('hidden');
        if($('app')) $('app').classList.add('hidden');
        renderMe();
      }});
  });
  // 【返修4批d】云同步卡已移除，cloudAuto 绑定一并清除
}
function showApp(){
  if($('loginPage')) $('loginPage').classList.add('hidden');
  if($('app')) $('app').classList.remove('hidden');
  loadWorks();
  renderShelf();
  renderMe();
  // 【返修4批e】默认打开书架页（底部 tab：书架 / 工具 / 设置）
  switchTab('shelf', 'noAnim');
}

/* ---------------- 抽屉折叠 ---------------- */
function bindDrawers(){
  var heads = document.querySelectorAll('.drawer-head');
  Array.prototype.forEach.call(heads, function(h){
    h.addEventListener('click', function(){
      var block = h.closest('.drawer-block') || h.parentNode;
      if(!block) return;
      block.classList.toggle('open');
    });
  });
  // 【返修4批e-fix】所有抽屉默认收起，不再记忆展开状态
  var blocks = document.querySelectorAll('.drawer-block[data-key]');
  Array.prototype.forEach.call(blocks, function(b){
    b.classList.remove('open');
    var key = b.getAttribute('data-key');
    if(key) LS.set('xxzzu_drawer_'+key, '');
  });
}

/* ---------------- 工具页 ---------------- */
var TOOLS_LOCAL = [
  { id:'exportTxt', name:'tools.tTxt', desc:'tools.dTxt' },
  { id:'exportDocx', name:'tools.tDocx', desc:'tools.dDocx' },
  { id:'stats', name:'tools.tStats', desc:'tools.dStats' },
  { id:'backup', name:'tools.tBackup', desc:'tools.dBackup' }
];
var TOOLS_AI = [
  { id:'aiName', name:'tools.tName', desc:'tools.dName', ai:true },
  { id:'aiPersona', name:'tools.tPersona', desc:'tools.dPersona', ai:true },
  { id:'aiIdea', name:'tools.tIdea', desc:'tools.dIdea', ai:true },
  { id:'aiSetting', name:'tools.tSetting', desc:'tools.dSetting', ai:true }
];
/* 【4批e-fix21】8 个工具的内联线性 SVG 图标（对齐底部 tab 描边风格） */
var TOOL_ICONS = {
  exportTxt:  '<svg viewBox="0 0 24 24"><path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z"/><path d="M14 3v5h5"/><path d="M9 13h6M9 17h4"/></svg>',
  exportDocx: '<svg viewBox="0 0 24 24"><path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z"/><path d="M14 3v5h5"/><path d="M8.5 13.5l1.5 4 1.5-4 1.5 4 1.5-4"/></svg>',
  stats:      '<svg viewBox="0 0 24 24"><path d="M4 20V10M10 20V4M16 20v-7M22 20H2"/></svg>',
  backup:     '<svg viewBox="0 0 24 24"><path d="M21 12a9 9 0 1 1-2.6-6.4"/><path d="M21 4v5h-5"/><path d="M12 8v4l3 2"/></svg>',
  aiName:     '<svg viewBox="0 0 24 24"><path d="M12 3l2 5 5 2-5 2-2 5-2-5-5-2 5-2z"/><path d="M19 15l.8 2 2 .8-2 .8-.8 2-.8-2-2-.8 2-.8z"/></svg>',
  aiPersona:  '<svg viewBox="0 0 24 24"><circle cx="12" cy="8" r="3.5"/><path d="M5 20a7 7 0 0 1 14 0"/></svg>',
  aiIdea:     '<svg viewBox="0 0 24 24"><path d="M9 18h6M10 21h4"/><path d="M12 3a6 6 0 0 0-3.5 10.9c.5.4.8 1 .8 1.6h5.4c0-.6.3-1.2.8-1.6A6 6 0 0 0 12 3z"/></svg>',
  aiSetting:  '<svg viewBox="0 0 24 24"><path d="M4 6h16M4 12h16M4 18h16"/><circle cx="9" cy="6" r="2"/><circle cx="15" cy="12" r="2"/><circle cx="8" cy="18" r="2"/></svg>'
};
function buildToolGrid(el, arr){
  if(!el) return;
  el.innerHTML = '';
  arr.forEach(function(tk){
    var item = document.createElement('div');
    item.className = 'tool-item';
    item.setAttribute('data-id', tk.id);
    /* 【4批e-fix23】AI 工具：无 Key 时置灰（仅视觉，点击仍进 onToolClick 给提示） */
    if(tk.ai && !aiHasKey()) item.classList.add('locked');
    var ic = document.createElement('div');
    ic.className = 'tool-ic';
    ic.innerHTML = TOOL_ICONS[tk.id] || '';
    var nm = document.createElement('div');
    nm.className = 'tool-name';
    nm.textContent = t(tk.name);
    var ds = document.createElement('div');
    ds.className = 'tool-desc';
    ds.textContent = t(tk.desc);
    item.appendChild(ic);
    item.appendChild(nm);
    item.appendChild(ds);
    item.addEventListener('click', function(){ onToolClick(tk.id); });
    el.appendChild(item);
  });
}
/* 【4批e-fix23】根据 Key 状态刷新 AI 工具网格灰态（Key 变化 / 进工具页时调用） */
function refreshToolGrid(){
  var wrap = $('toolsAi');
  if(!wrap) return;
  var items = wrap.querySelectorAll('.tool-item');
  var has = aiHasKey();
  Array.prototype.forEach.call(items, function(it){
    if(has) it.classList.remove('locked');
    else it.classList.add('locked');
  });
}
/* 【4批e-fix21】统一的「写文件」封装：优先走 Android 桥，无桥则提示 */
function nativeSave(name, content){
  try{
    if(window.Android && typeof window.Android.saveTextFileEx === 'function'){
      var pref = LS.get(K.EXPORTDIR,'') || '';
      return window.Android.saveTextFileEx(name, content, pref);
    }
    if(window.Android && typeof window.Android.saveTextFile === 'function'){
      return window.Android.saveTextFile(name, content);
    }
  }catch(e){}
  return 'ERR:no-bridge';
}
function safeName(s){
  return String(s||'').replace(/[\\/:*?"<>|\s]+/g,'_').slice(0,40) || 'untitled';
}
function tsStamp(){
  var d = new Date();
  function p(n){ return (n<10?'0':'')+n; }
  return d.getFullYear()+p(d.getMonth()+1)+p(d.getDate())+'_'+p(d.getHours())+p(d.getMinutes())+p(d.getSeconds());
}
/* ============================================================
   【4批e-fix23】AI 工具引擎（DeepSeek 选填 · 纯本地调 API）
   - Key 存 localStorage(K.APIKEY)，仅本机，不上传任何服务器
   - 仅在用户点击「开始生成」时，才把提示词 + Key 发给 DeepSeek
   ============================================================ */
/* 模型映射：设置页 seg 实际存的是 flash / v41pro */
var AI_MODEL_MAP = {
  'flash':'deepseek-chat',
  'v41pro':'deepseek-reasoner',
  'deepseek-flash':'deepseek-chat'
};
var AI_ENDPOINT = 'https://api.deepseek.com/chat/completions';

function aiHasKey(){
  var k = LS.get(K.APIKEY,'') || '';
  return k.trim().length > 0;
}
function aiModel(){
  var m = LS.get(K.MODEL,'flash');
  return AI_MODEL_MAP[m] || 'deepseek-chat';
}

/* 4 个工具的提示词规格 */
var AI_SPECS = {
  aiName: {
    title:'ai.tName',
    sys:'你是一位深耕中文网文多年的资深起名编辑，熟悉玄幻修仙、都市异能、古言宫斗、悬疑推理、科幻星际、历史权谋、甜宠虐恋等各大平台主流风格。请紧扣用户给出的背景与口味，产出准确贴合设定、富有想象力的名字。要求：1) 名字要符合人物身份、时代、种族与世界观，读音顺口、容易记住、避免生僻字堆砌；2) 每个候选名后跟一句话（20字内）说明其寓意、气质或给人的联想；3) 兼顾“雅致”与“抓眼球”两类口味，可覆盖不同类型；4) 至少给出 8 个候选，按类别分组。输出要求：不要使用 Markdown 加粗、井号、星号、项目符号等多余符号，用纯文本行文，每行一个“名字——说明”，组别用一行短标题标注即可；不要输出与起名无关的寒暄、解释或自我介绍。',
    user:'请为以下需求起名：'
  },
  aiPersona: {
    title:'ai.tPersona',
    sys:'你是一位经验丰富的网文人物设定师，熟悉各大平台热门作品的人物塑造手法（玄幻修仙、都市、古言、悬疑、科幻、历史等）。请紧扣用户给出的设定与类型，创造一个准确、立体、有记忆点的角色，并大胆丰富细节，让人物有欲望、有软肋、有矛盾。\n必须严格按下面字段逐行输出，每行格式为「字段名：内容」：\n姓名：\n性别：\n年龄：\n种族：\n身份：\n外貌：\n背景故事：\n与其他角色的关系：\n要求：1) 字段名固定用上面 8 个，顺序不变；用户未提及的字段也要合理补全，不要留空（实在无法判断可给出符合设定的合理设定）；2) 每个字段内容具体、有画面感，外貌与背景故事可适当展开 1~3 句，关系字段若有多人可用顿号分隔逐条写；3) 设定须自洽，与用户给出的时代、类型、世界观一致。输出要求：不要使用 Markdown 加粗、井号、星号、项目符号等多余符号，纯文本、一行一个字段；不要输出与人物设定无关的寒暄、解释或自我介绍。',
    user:'请生成以下角色的人设：'
  },
  aiIdea: {
    title:'ai.tIdea',
    sys:'你是一位操盘过多种爆款的网文剧情策划，熟悉玄幻修仙、都市异能、古言宫斗、悬疑推理、科幻星际、历史权谋、甜宠虐恋等主流题材的爽点节奏与钩子设计。请根据用户要求构思剧情与大纲，大胆想象、给出有新意又不失逻辑的走向。要求：1) 依次给出「核心冲突、主线走向、三幕结构（起承转合）、关键转折点、高潮与结局方向」五个部分，每部分标题单独一行；2) 逻辑连贯，前因后果能对上，冲突要有张力，转折要出人意料又在情理之中；3) 兼顾“爽点/钩子”与人物成长线，贴合所选题材的平台调性。输出要求：不要使用 Markdown 加粗、井号、星号、项目符号等多余符号，用纯文本行文，可用“一、二、三”或短标题分段；不要输出与剧情大纲无关的寒暄、解释或自我介绍。',
    user:'请构思以下方向的剧情大纲：'
  },
  aiSetting: {
    title:'ai.tSetting',
    sys:'你是一位资深世界观设定整理师，服务过多部热门长篇网文，熟悉玄幻、都市、古言、悬疑、科幻、历史等题材的设定体系。请把用户给出的零散设定，整理成结构化、可查阅、彼此自洽的世界观资料，并在不违背原意的前提下合理补全关键细节，让世界更立体、更有想象力。要求：1) 按类别分条归类，类别可用「地理、势力、力量体系、历史、种族、规则、经济、文化」等，按内容取舍，每个类别标题单独一行；2) 语言精炼、条目清晰、便于写作时直接引用；3) 各设定之间要能自圆其说，避免前后矛盾。输出要求：不要使用 Markdown 加粗、井号、星号、项目符号等多余符号，用纯文本行文，类别用短标题、条目用换行缩进即可；不要输出与设定整理无关的寒暄、解释或自我介绍。',
    user:'请整理以下设定资料：'
  }
};

var _aiCurTool = 'aiName';
var _aiBusy = false;
var _aiLastResult = '';

/* 打开 AI 子页（from onToolClick） */
function openAiTool(id){
  var spec = AI_SPECS[id];
  if(!spec) return;
  _aiCurTool = id;
  _aiBusy = false;
  _aiLastResult = '';
  var ttl = $('aiTitle');
  if(ttl) ttl.textContent = t(spec.title);
  /* 徽章卡：当前工具图标 + 名称 */
  var hic = $('aiHeroIc');
  if(hic){
    var icon = (typeof TOOL_ICONS !== 'undefined' && TOOL_ICONS[id]) ? TOOL_ICONS[id] : '';
    hic.innerHTML = icon;
  }
  var hn = $('aiHeroName');
  if(hn) hn.textContent = t(spec.title);
  var lab = $('aiInputLabel');
  if(lab) lab.textContent = t('ai.inputLabel');
  var inp = $('aiInput');
  if(inp) inp.value = '';
  var st = $('aiStatus');
  if(st){ st.classList.add('hidden'); st.classList.remove('err'); st.textContent = ''; }
  var rw = $('aiResultWrap');
  if(rw) rw.classList.add('hidden');
  var rs = $('aiResult');
  if(rs) rs.textContent = '';
  /* 「写入设定」仅对人设/设定整理有用，其它工具隐藏 */
  var ap = $('aiAppend');
  if(ap){
    if(id==='aiPersona') ap.classList.remove('hidden');
    else ap.classList.add('hidden');
  }
  resetAiGenBtn(false);
  openSub('subAi');
}

function resetAiGenBtn(busy){
  var btn = $('aiGen');
  var txt = document.querySelector('#aiGen .ai-gen-txt');
  var load = document.querySelector('#aiGen .ai-gen-loading');
  if(btn) btn.disabled = !!busy;
  if(txt) txt.classList.toggle('hidden', !!busy);
  if(load) load.classList.toggle('hidden', !busy);
}

function aiSetStatus(msg, isErr){
  var st = $('aiStatus');
  if(!st) return;
  if(!msg){ st.classList.add('hidden'); st.textContent = ''; st.classList.remove('err'); return; }
  st.textContent = msg;
  st.classList.remove('hidden');
  st.classList.toggle('err', !!isErr);
}

/* DeepSeek 调用封装（OpenAI 兼容 /chat/completions） */
function aiCall(prompt, onOk, onErr){
  var key = (LS.get(K.APIKEY,'') || '').trim();
  if(!key){ onErr(t('ai.needKey')); return; }
  var body = {
    model: aiModel(),
    messages: [
      { role:'system', content: prompt.sys },
      { role:'user', content: prompt.user }
    ],
    stream: false,
    temperature: 1.0,
    max_tokens: 2048
  };
  var done = false;
  var timer = setTimeout(function(){
    if(done) return; done = true;
    onErr(t('ai.errNet'));
  }, 60000);
  function finish(err, val){
    if(done) return; done = true;
    clearTimeout(timer);
    if(err) onErr(err); else onOk(val);
  }
  try{
    fetch(AI_ENDPOINT, {
      method:'POST',
      headers:{
        'Content-Type':'application/json',
        'Authorization':'Bearer ' + key
      },
      body: JSON.stringify(body)
    }).then(function(res){
      return res.text().then(function(txt){
        var data = null;
        try{ data = JSON.parse(txt); }catch(e){}
        if(res.status === 401 || res.status === 403){
          return finish(t('ai.errKey'));
        }
        if(res.status === 429){
          return finish(t('ai.errBusy'));
        }
        if(res.status >= 500){
          return finish(t('ai.errServer'));
        }
        if(!res.ok || !data){
          return finish(t('ai.errServer'));
        }
        if(data.error && data.error.message){
          return finish(data.error.message);
        }
        var choice = data.choices && data.choices[0];
        var content = choice && choice.message && choice.message.content;
        if(!content || !String(content).trim()){
          return finish(t('ai.errEmpty'));
        }
        finish(null, String(content).trim());
      });
    }).catch(function(){
      finish(t('ai.errNet'));
    });
  }catch(e){
    finish(t('ai.errNet'));
  }
}

function aiGenerate(){
  if(_aiBusy) return;
  var spec = AI_SPECS[_aiCurTool];
  if(!spec) return;
  var inp = $('aiInput');
  var extra = inp ? (inp.value || '').trim() : '';
  if(!extra){ extra = t('ai.inputLabel'); }
  _aiBusy = true;
  _aiLastResult = '';
  resetAiGenBtn(true);
  aiSetStatus(t('ai.genHint'), false);
  var rw = $('aiResultWrap'); if(rw) rw.classList.add('hidden');
  var prompt = { sys: spec.sys, user: spec.user + '\n' + extra };
  aiCall(prompt, function(text){
    _aiBusy = false;
    resetAiGenBtn(false);
    _aiLastResult = text;
    aiSetStatus('', false);
    var rs = $('aiResult'); if(rs) rs.textContent = text;
    var rw2 = $('aiResultWrap'); if(rw2) rw2.classList.remove('hidden');
  }, function(msg){
    _aiBusy = false;
    resetAiGenBtn(false);
    aiSetStatus(msg, true);
  });
}

/* 复制结果 */
function aiCopyResult(){
  if(!_aiLastResult){ return; }
  function fallback(){
    try{
      var ta = document.createElement('textarea');
      ta.value = _aiLastResult;
      ta.style.position = 'fixed'; ta.style.left = '-9999px';
      document.body.appendChild(ta); ta.select();
      document.execCommand('copy');
      document.body.removeChild(ta);
      aiSetStatus(t('ai.copied'), false);
    }catch(e){ aiSetStatus(t('ai.copyFail'), true); }
  }
  if(navigator.clipboard && navigator.clipboard.writeText){
    navigator.clipboard.writeText(_aiLastResult).then(function(){
      aiSetStatus(t('ai.copied'), false);
    }).catch(fallback);
  } else {
    fallback();
  }
}

/* 【4批e-fix41】写入当前作品的设定（按工具分类落到设定体系，不再写简介）
   aiPersona → 人设：追加为一张人设卡（姓名取首行，正文放背景故事）
   aiSetting → 其他设定：追加文本到 settings.other
   其他工具未开放「写入设定」按钮 */
/* fix44：把 AI 生成文本按字段解析到人设卡。
   规则：
   - 识别形如「**姓名**：xxx」「姓名:xxx」「- 姓名：xxx」的键值行；
   - 键名做同义归一（身份/职业→identity；外貌/长相/外形→look；
     背景/背景故事/经历→bg；关系/人物关系/与其他角色的关系→rel；年龄/年纪→age）；
   - 未识别的行 → 归入「背景故事」；
   - 所有 markdown 符号（* # - 着重号）一律剥除；
   - 解析不到的字段保持空字符串（不写乱符号、不硬塞）。 */
function _stripMd(x){
  return String(x||'').replace(/^[#\-\*\s]+/, '').replace(/\*\*/g,'').trim();
}
function _personaKeyOf(rawKey){
  var k = String(rawKey||'').replace(/[\s\*\#\-：:]/g,'').trim();
  if(!k) return '';
  if(k==='姓名'||k==='名字'||k==='名称'||k==='name') return 'name';
  if(k==='性别'||k==='gender'||k==='sex') return 'gender';
  if(k==='年龄'||k==='年纪'||k==='age') return 'age';
  if(k==='种族'||k==='race'||k==='民族') return 'race';
  if(k==='身份'||k==='职业'||k==='identity'||k==='occupation') return 'identity';
  if(k==='外貌'||k==='长相'||k==='外形'||k==='look'||k==='appearance') return 'look';
  if(k==='背景'||k==='背景故事'||k==='经历'||k==='背景资料'||k==='bg'||k==='background') return 'bg';
  if(k==='关系'||k==='人物关系'||k==='与其他角色的关系'||k==='rel'||k==='relationship') return 'rel';
  return '';
}
function _parsePersonaText(text){
  var p0 = newPersonaObj();
  var extra = [];              /* 未识别键的行 → 背景故事 */
  var lines = String(text||'').split('\n');
  var curKey = '';             /* 多行值：遇到新键前，后续行归入当前键 */
  for(var i=0;i<lines.length;i++){
    var line = lines[i];
    var raw = line.replace(/^\s+/,'');
    if(!raw.trim()) continue;
    /* 匹配「键 ：值」或「键：值」（允许 ** 包裹键名） */
    var m = raw.match(/^(?:\*\*)?\s*([^：:\*\n]{1,12})\s*(?:\*\*)?\s*[：:]\s*(.*)$/);
    if(m){
      var key = _personaKeyOf(m[1]);
      var val = _stripMd(m[2] || '');
      if(key){
        curKey = key;
        if(val){ p0[key] = p0[key] ? (p0[key] + '\n' + val) : val; }
        continue;
      }
      /* 键名不认识 → 整行当背景补充 */
      curKey = '';
      extra.push(_stripMd(raw));
      continue;
    }
    /* 无冒号的行 */
    var md = _stripMd(raw);
    if(!md) continue;
    if(curKey && p0[curKey]){ p0[curKey] += '\n' + md; }
    else { extra.push(md); }
    /* 若该行本身像一个「小标题」（如 **性格**），也作为背景补充 */
  }
  if(extra.length){
    var ex = extra.join('\n').trim();
    p0.bg = p0.bg ? (p0.bg + '\n' + ex) : ex;
  }
  return p0;
}
function aiAppendResult(){
  if(!_aiLastResult){ return; }
  var list = (store.works||[]);
  if(!list.length){ return pop({ title:t('tools.ai'), msg:t('ai.noWork'), okText:t('common.ok') }); }
  /* fix47：无论几本作品，点「写入设定」都弹窗确认目标作品。
     这里是一个「待选清单」，不预选任何一项——由用户点击决定写哪本。 */
  var items = list.map(function(w){
    return { text: (w.title && String(w.title).trim()) || t('tip.untitledWork'), val: w };
  });
  pop({ title:t('ai.pickWork'), list:items, onPick:function(w){ _aiDoAppend(w); } });
}
/* 真正执行写入（已确定目标作品 w） */
function _aiDoAppend(w){
  if(!_aiLastResult || !w){ return; }
  var st = ensureSettings(w);
  var text = _aiLastResult;
  if(_aiCurTool === 'aiPersona'){
    /* fix44：按字段解析，对号入座；解析不到的字段留空，不塞符号 */
    var p0 = _parsePersonaText(text);
    if(!p0.name){ p0.name = t('set.cardTitle'); }
    st.personas.push(p0);
  } else {
    /* aiSetting：剥掉 markdown 首尾符号后落到「其他设定」 */
    var clean = String(text).split('\n').map(function(l){ return l.replace(/\*\*/g,'').replace(/^\s*\*\s+/,'\u2022 '); }).join('\n').trim();
    st.other = (st.other ? st.other + '\n' : '') + clean;
  }
  w.utime = Date.now();
  saveWorks();
  try{ renderShelf(); }catch(e){}
  pop({ title:t('tools.ai'), msg:t('ai.appendedTo').replace('{w}', w.title || t('tip.untitledWork')), okText:t('common.ok') });
}

/* ============================================================
   【4批e-fix41】作品设定体系：页面渲染 + 交互绑定
   ============================================================ */
var _setPane = 'persona';   // 当前 tab：persona | world | other
var _curPersona = null;     // 当前打开的人设卡对象
var _personaReadonly = false;

/* 打开设定页（从作品信息页三个按钮进入） */
function openSetting(pane){
  var w = _wiWork || store.curWork;
  if(!w){ return pop({ title:t('tools.ai'), msg:t('ai.noWork'), okText:t('common.ok') }); }
  ensureSettings(w);
  _setPane = pane || 'persona';
  renderSettingView();
  bindSettingOnce();
  openSub('subSetting');
}
/* 渲染当前 tab */
function renderSettingView(){
  var w = _wiWork || store.curWork;
  if(!w) return;
  var st = ensureSettings(w);
  /* tab 高亮 */
  var tabs = document.querySelectorAll('#subSetting .set-tab');
  for(var i=0;i<tabs.length;i++){
    tabs[i].classList.toggle('active', tabs[i].getAttribute('data-set') === _setPane);
  }
  /* 面板显隐 */
  if($('setPanePersona')) $('setPanePersona').classList.toggle('hidden', _setPane!=='persona');
  if($('setPaneWorld'))   $('setPaneWorld').classList.toggle('hidden', _setPane!=='world');
  if($('setPaneOther'))   $('setPaneOther').classList.toggle('hidden', _setPane!=='other');
  /* fix42：世界观 / 其他 改为条目卡片列表 */
  if(_setPane==='world'){ renderSettingItems('worldviewList', 'setWorldList', 'setWorldEmpty'); }
  if(_setPane==='other'){ renderSettingItems('otherList', 'setOtherList', 'setOtherEmpty'); }
  /* 人设列表 */
  if(_setPane==='persona') renderPersonaList();
}
/* fix42：渲染设定条目卡片列表（世界观 / 其他通用） */
function renderSettingItems(keyName, listId, emptyId){
  var w = _wiWork || store.curWork;
  if(!w) return;
  var st = ensureSettings(w);
  var list = $(listId);
  var empty = $(emptyId);
  if(!list) return;
  list.innerHTML = '';
  var arr = st[keyName] || [];
  if(empty) empty.classList.toggle('hidden', arr.length>0);
  arr.forEach(function(it){
    var card = document.createElement('div');
    card.className = 'set-card';
    var txt = document.createElement('div');
    txt.className = 'set-card-text';
    txt.textContent = it.text || '';
    var ops = document.createElement('div');
    ops.className = 'set-card-ops';
    var bEdit = document.createElement('button');
    bEdit.className = 'set-card-btn';
    bEdit.textContent = t('common.edit');
    bEdit.addEventListener('click', function(e){
      if(e && e.stopPropagation) e.stopPropagation();
      openSetCardModal(keyName, it, false);
    });
    var bDel = document.createElement('button');
    bDel.className = 'set-card-btn danger';
    bDel.textContent = t('common.delete');
    bDel.addEventListener('click', function(e){
      if(e && e.stopPropagation) e.stopPropagation();
      deleteSettingItem(keyName, it);
    });
    ops.appendChild(bEdit); ops.appendChild(bDel);
    card.appendChild(ops);
    card.appendChild(txt);
    list.appendChild(card);
  });
}
/* fix42：设定条目卡片弹窗（修改用） */
var _setCardKey = null, _setCardItem = null;
function openSetCardModal(keyName, item, readonly){
  _setCardKey = keyName;
  _setCardItem = item;
  if($('setCardTitle2')) $('setCardTitle2').textContent = (keyName==='worldviewList') ? t('set.worldview') : t('set.other');
  if($('setCardText')) $('setCardText').value = item.text || '';
  if($('setCardSave')) $('setCardSave').classList.toggle('hidden', !!readonly);
  if($('setCardMask')) $('setCardMask').classList.add('show');
  if($('setCardModal')) $('setCardModal').classList.add('show');
}
function closeSetCardModal(){
  if($('setCardMask')) $('setCardMask').classList.remove('show');
  if($('setCardModal')) $('setCardModal').classList.remove('show');
  _setCardKey = null; _setCardItem = null;
}
function setCardSave(){
  var w = _wiWork || store.curWork;
  if(!w || !_setCardItem) return;
  var txt = (($('setCardText')||{}).value || '').trim();
  if(!txt){ return pop({ title:t('set.cardTitle2'), msg:t('set.tipName'), okText:t('common.ok') }); }
  _setCardItem.text = txt;
  w.utime = Date.now();
  saveWorks();
  closeSetCardModal();
  renderSettingView();
  pop({ title:t('set.cardTitle2'), msg:t('set.saved'), okText:t('common.ok') });
}
function deleteSettingItem(keyName, item){
  var w = _wiWork || store.curWork;
  if(!w || !item) return;
  pop({ title:t('common.delete'), msg:t('set.delPersonaMsg'),
    okText:t('common.delete'), danger:true, cancelText:t('common.cancel'),
    onOk:function(){
      store.delSettingItem(w, keyName, item);
      renderSettingView();
      renderShelf();
    }});
}
/* 渲染人设卡简略列表（名字,性别｜修改） */
function renderPersonaList(){
  var w = _wiWork || store.curWork;
  if(!w) return;
  var st = ensureSettings(w);
  var list = $('personaList');
  var empty = $('personaEmpty');
  if(!list) return;
  list.innerHTML = '';
  var arr = st.personas;
  if(empty) empty.classList.toggle('hidden', arr.length>0);
  arr.forEach(function(p0){
    var row = document.createElement('div');
    row.className = 'set-item';
    var info = document.createElement('div');
    info.className = 'set-item-main';
    /* fix44：圆形头像色块，取姓名首字 */
    var av = document.createElement('div');
    av.className = 'set-avatar';
    av.textContent = (p0.name || t('set.cardTitle')).trim().charAt(0) || '?';
    var nm = document.createElement('div');
    nm.className = 'set-item-name';
    nm.textContent = p0.name || t('set.cardTitle');
    var meta = document.createElement('div');
    meta.className = 'set-item-sub';
    meta.textContent = p0.gender || '—';
    info.appendChild(nm); info.appendChild(meta);
    row.appendChild(av);
    var edit = document.createElement('button');
    edit.className = 'mini-btn ghost set-item-edit';
    edit.textContent = t('set.editCard');
    /* 点击「修改」→ 打开卡片的可编辑态 */
    edit.addEventListener('click', function(e){
      if(e && e.stopPropagation) e.stopPropagation();
      openPersonaModal(p0, false);
    });
    row.appendChild(info);
    row.appendChild(edit);
    /* 点击卡片本体 → 只读查看 */
    row.addEventListener('click', function(){ openPersonaModal(p0, true); });
    list.appendChild(row);
  });
}
/* 打开人设卡弹窗；readonly=true 表示查看（保存后只读） */
var _isNewPersona = false;
function openPersonaModal(persona, readonly){
  _curPersona = persona;
  _personaReadonly = !!readonly;
  if($('pFName')) $('pFName').value = persona.name || '';
  if($('pFGender')) $('pFGender').value = persona.gender || '';
  if($('pFAge')) $('pFAge').value = persona.age || '';
  if($('pFRace')) $('pFRace').value = persona.race || '';
  if($('pFIdentity')) $('pFIdentity').value = persona.identity || '';
  if($('pFLook')) $('pFLook').value = persona.look || '';
  if($('pFBg')) $('pFBg').value = persona.bg || '';
  if($('pFRel')) $('pFRel').value = persona.rel || '';
  var body = document.querySelector('#personaModal .persona-modal-body');
  if(body) body.classList.toggle('readonly', _personaReadonly);
  /* fix44：只读时真正锁死所有输入框（原生 readOnly + tabindex=-1），
     不依赖 pointer-events（部分 WebView 下对 input/textarea 不彻底）。 */
  var __roFields = ['pFName','pFGender','pFAge','pFRace','pFIdentity','pFLook','pFBg','pFRel'];
  for(var __ri=0; __ri<__roFields.length; __ri++){
    var __el = $(__roFields[__ri]);
    if(!__el) continue;
    __el.readOnly = _personaReadonly;
    if(_personaReadonly){ __el.setAttribute('tabindex','-1'); }
    else { __el.removeAttribute('tabindex'); }
    if(__el.classList){ __el.classList.toggle('is-readonly', _personaReadonly); }
  }
  /* fix42：只读时仅隐藏保存；删除按钮始终显示（只读页右上角也能删） */
  if($('personaSave')) $('personaSave').classList.toggle('hidden', _personaReadonly);
  if($('personaDel')) $('personaDel').classList.remove('hidden');
  if($('personaEdit')) $('personaEdit').classList.add('hidden'); /* 修改入口只在简略卡片处 */
  if($('personaMask')) $('personaMask').classList.add('show');
  if($('personaModal')) $('personaModal').classList.add('show');
}
function closePersonaModal(){
  /* fix42：新建未保存的空卡直接丢弃，不残留 */
  _isNewPersona = false;
  if($('personaMask')) $('personaMask').classList.remove('show');
  if($('personaModal')) $('personaModal').classList.remove('show');
  _curPersona = null;
}
/* 保存人设卡：写回 persona 对象并持久化 */
function personaSave(){
  var w = _wiWork || store.curWork;
  if(!w || !_curPersona) return;
  var nm = ($('pFName')||{}).value || '';
  if(!nm.trim()){ return pop({ title:t('set.cardTitle'), msg:t('set.tipName'), okText:t('common.ok') }); }
  /* fix42：新建卡在保存成功后才入列表（禁空卡残留） */
  if(_isNewPersona && ensureSettings(w).personas.indexOf(_curPersona) < 0){
    ensureSettings(w).personas.push(_curPersona);
    if(!_curPersona.id) _curPersona.id = uid();
    if(!_curPersona.ctime) _curPersona.ctime = Date.now();
  }
  _isNewPersona = false;
  _curPersona.name = nm.trim();
  _curPersona.gender = ($('pFGender')||{}).value || '';
  _curPersona.age = ($('pFAge')||{}).value || '';
  _curPersona.race = ($('pFRace')||{}).value || '';
  _curPersona.identity = ($('pFIdentity')||{}).value || '';
  _curPersona.look = ($('pFLook')||{}).value || '';
  _curPersona.bg = ($('pFBg')||{}).value || '';
  _curPersona.rel = ($('pFRel')||{}).value || '';
  w.utime = Date.now();
  saveWorks();
  closePersonaModal();
  renderPersonaList();
  renderShelf();
  pop({ title:t('set.cardTitle'), msg:t('set.saved'), okText:t('common.ok') });
}
/* 删除人设卡（二次确认） */
function personaDelete(){
  var w = _wiWork || store.curWork;
  if(!w || !_curPersona) return;
  var target = _curPersona;
  pop({ title:t('set.delPersona'), msg:t('set.delPersonaMsg'),
    okText:t('common.delete'), danger:true, cancelText:t('common.cancel'),
    onOk:function(){
      store.delPersona(w, target);
      closePersonaModal();
      renderPersonaList();
      renderShelf();
    }});
}
/* 绑定一次（幂等） */
var _setBound = false;
function bindSettingOnce(){
  if(_setBound) return;
  _setBound = true;
  /* 返回 */
  if($('setBack')) $('setBack').addEventListener('click', function(){ closeSub('subSetting'); });
  /* tab 切换 */
  var tabs = document.querySelectorAll('#subSetting .set-tab');
  for(var i=0;i<tabs.length;i++){
    (function(btn){
      btn.addEventListener('click', function(){
        _setPane = btn.getAttribute('data-set') || 'persona';
        renderSettingView();
      });
    })(tabs[i]);
  }
  /* 新建人设卡 */
  if($('personaAdd')) $('personaAdd').addEventListener('click', function(){
    var w = _wiWork || store.curWork;
    if(!w) return;
    /* fix42：先不入库，保存成功才 push（禁空卡） */
    _isNewPersona = true;
    openPersonaModal(newPersonaObj(), false);
  });
  /* 人设卡弹窗按钮 */
  if($('personaClose')) $('personaClose').addEventListener('click', closePersonaModal);
  /* fix42：点击旁边空白处不再关闭弹窗（需求1） */
  if($('personaSave')) $('personaSave').addEventListener('click', personaSave);
  if($('personaDel')) $('personaDel').addEventListener('click', personaDelete);
  /* fix42：设定条目卡片弹窗按钮 */
  if($('setCardClose')) $('setCardClose').addEventListener('click', closeSetCardModal);
  if($('setCardDel')) $('setCardDel').addEventListener('click', function(){
    var it = _setCardItem, kk = _setCardKey;
    closeSetCardModal();
    if(it) deleteSettingItem(kk, it);
  });
  if($('setCardSave')) $('setCardSave').addEventListener('click', setCardSave);
  /* 世界观 / 其他 保存 */
  if($('setWorldSave')) $('setWorldSave').addEventListener('click', function(){
    var w = _wiWork || store.curWork;
    if(!w) return;
    var txt = (($('setWorldText')||{}).value || '').trim();
    if(!txt){ return pop({ title:t('set.newWorld'), msg:t('set.tipName'), okText:t('common.ok') }); }
    store.addSettingItem(w, 'worldviewList', txt);
    if($('setWorldText')) $('setWorldText').value = '';
    renderSettingView();
    renderShelf();
  });
  if($('setOtherSave')) $('setOtherSave').addEventListener('click', function(){
    var w = _wiWork || store.curWork;
    if(!w) return;
    var txt = (($('setOtherText')||{}).value || '').trim();
    if(!txt){ return pop({ title:t('set.newSetting'), msg:t('set.tipName'), okText:t('common.ok') }); }
    store.addSettingItem(w, 'otherList', txt);
    if($('setOtherText')) $('setOtherText').value = '';
    renderSettingView();
    renderShelf();
  });
}

/* AI 子页交互绑定（进 init 调用） */
var _aiBound = false;
function bindAi(){
  if(_aiBound) return;
  _aiBound = true;
  var back = $('aiBack');
  if(back) back.addEventListener('click', function(){ closeSub('subAi'); });
  var gen = $('aiGen');
  if(gen) gen.addEventListener('click', aiGenerate);
  var cp = $('aiCopy');
  if(cp) cp.addEventListener('click', aiCopyResult);
  var ap = $('aiAppend');
  if(ap) ap.addEventListener('click', aiAppendResult);
}

function onToolClick(id){
  if(id==='exportTxt') return toolExportTxt();
  if(id==='exportDocx') return toolExportDocx();
  if(id==='stats') return toolStats();
  if(id==='backup') return toolBackup();
  /* 【4批e-fix23】AI 四项：无 Key → 提示；有 Key → 打开 AI 子页 */
  if(id==='aiName' || id==='aiPersona' || id==='aiIdea' || id==='aiSetting'){
    if(!aiHasKey()){
      return pop({ title:t('tools.ai'), msg:t('ai.needKey'), okText:t('common.ok'),
        onOk:function(){ switchTab('set'); } });
    }
    return openAiTool(id);
  }
  /* 未知工具（兜底） */
  pop({ title: t('tools.wip'), msg: t('tools.wipMsg'), okText: t('common.ok') });
}
/* --- 导出 TXT：所有作品 → 各自一个 txt（含章节标题） --- */
function toolExportTxt(){
  if(!store.works.length) return pop({ title:t('tools.tTxt'), msg:t('tools.emptyMsg'), okText:t('common.ok') });
  var okN = 0, paths = [];
  store.works.forEach(function(w){
    var lines = [w.title, '作者：' + (w.author||'未署名'), ''];
    (w.chapters||[]).forEach(function(c){
      lines.push('【' + (c.title||t('tip.untitledChapter')) + '】');
      lines.push(c.content||'');
      lines.push('');
    });
    var r = nativeSave('作品_' + safeName(w.title) + '_' + tsStamp() + '.txt', lines.join('\r\n'));
    if(r && r.indexOf('ERR:')!==0){ okN++; paths.push(r); }
  });
  if(okN>0) pop({ title:t('tools.tTxt'), msg:t('tools.exportOk') + '\n' + paths.join('\n'), okText:t('common.ok') });
  else pop({ title:t('tools.tTxt'), msg:t('tools.exportFail'), okText:t('common.ok') });
}
/* --- 导出 DOCX：简化版 .doc（HTML 内容，Word/WPS 可打开） --- */
function toolExportDocx(){
  if(!store.works.length) return pop({ title:t('tools.tDocx'), msg:t('tools.emptyMsg'), okText:t('common.ok') });
  var okN = 0, paths = [];
  store.works.forEach(function(w){
    var html = '<html><head><meta charset="utf-8"><title>' + esc(w.title) + '</title></head><body>';
    html += '<h1>' + esc(w.title) + '</h1>';
    html += '<p>' + esc('作者：' + (w.author||'未署名')) + '</p>';
    (w.chapters||[]).forEach(function(c){
      html += '<h2>' + esc(c.title||t('tip.untitledChapter')) + '</h2>';
      html += '<p>' + esc(c.content||'').replace(/\n/g,'<br>') + '</p>';
    });
    html += '</body></html>';
    var r = nativeSave('作品_' + safeName(w.title) + '_' + tsStamp() + '.doc', html);
    if(r && r.indexOf('ERR:')!==0){ okN++; paths.push(r); }
  });
  if(okN>0) pop({ title:t('tools.tDocx'), msg:t('tools.exportOk') + '\n' + paths.join('\n'), okText:t('common.ok') });
  else pop({ title:t('tools.tDocx'), msg:t('tools.exportFail'), okText:t('common.ok') });
}
function esc(s){ return String(s==null?'':s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;'); }
/* --- 写作统计：作品数/章节数/总字数 + 各作品明细 --- */
/* ============================================================
   【4批e-fix22】写作统计页
   - 时间维度：today/yesterday/d7/d30/month/lastMonth → wlogSum 真按天统计
   - 折线图：近 7 天每日净增，内联 SVG 手写（无外部库）
   - 作品维度：总章节/总字数，支持切换作品
   ============================================================ */
var _statsRange = 'today';
var _statsWorkId = null;
function toolStats(){
  /* 原弹窗改为打开独立子页（4批e-fix22） */
  renderStats();
  openSub('subStats');
}
/* 六区间标签 i18n key */
var STATS_RANGE_KEY = {
  today:'stats.today', yesterday:'stats.yesterday', d7:'stats.d7',
  d30:'stats.d30', month:'stats.month', lastMonth:'stats.lastMonth'
};
/* 折线图：纯内联 SVG，输入 [{k:'MM-DD',v:数字}] */
function buildLineChart(el, data){
  if(!el) return;
  el.innerHTML = '';
  var W = 300, H = 150, PL = 28, PR = 10, PT = 14, PB = 22;
  var iw = W - PL - PR, ih = H - PT - PB;
  var maxV = 0;
  data.forEach(function(d){ if(d.v > maxV) maxV = d.v; });
  if(maxV <= 0) maxV = 1;
  var n = data.length;
  function px(i){ return PL + (n<=1 ? iw/2 : iw*i/(n-1)); }
  function py(v){ return PT + ih - ih*(v/maxV); }
  /* 网格基线（0 与 顶线） */
  var svg = '';
  svg += '<line x1="'+PL+'" y1="'+PT+'" x2="'+(W-PR)+'" y2="'+PT+'" stroke="var(--line)" stroke-width="1"/>';
  svg += '<line x1="'+PL+'" y1="'+(PT+ih)+'" x2="'+(W-PR)+'" y2="'+(PT+ih)+'" stroke="var(--line)" stroke-width="1"/>';
  /* 数据点 + 折线 */
  var pts = [];
  data.forEach(function(d,i){ pts.push([px(i), py(d.v)]); });
  var path = '';
  pts.forEach(function(p,i){ path += (i===0?'M':'L') + p[0].toFixed(1) + ' ' + p[1].toFixed(1) + ' '; });
  if(n>1){
    svg += '<path d="'+path+'" fill="none" stroke="var(--accent)" stroke-width="2" stroke-linejoin="round" stroke-linecap="round"/>';
    /* 面积填充 */
    var area = path + 'L' + pts[n-1][0].toFixed(1) + ' ' + (PT+ih) + ' L' + pts[0][0].toFixed(1) + ' ' + (PT+ih) + ' Z';
    svg += '<path d="'+area+'" fill="var(--accent)" opacity="0.08" stroke="none"/>';
  }
  pts.forEach(function(p){
    svg += '<circle cx="'+p[0].toFixed(1)+'" cy="'+p[1].toFixed(1)+'" r="3" fill="var(--accent)"/>';
  });
  /* 底部日期标签（首、中、尾，避免拥挤） */
  var labelIdx = n<=2 ? [0,n-1] : [0, Math.floor((n-1)/2), n-1];
  labelIdx.forEach(function(i){
    if(i<0||i>=n) return;
    svg += '<text x="'+px(i).toFixed(1)+'" y="'+(H-6)+'" font-size="10" fill="var(--text-2)" text-anchor="middle">'+data[i].k+'</text>';
  });
  /* 顶部最大值 */
  svg += '<text x="'+PL+'" y="'+(PT-3)+'" font-size="10" fill="var(--text-2)" text-anchor="start">'+maxV+'</text>';
  el.innerHTML = '<svg viewBox="0 0 '+W+' '+H+'" preserveAspectRatio="none">'+svg+'</svg>';
}
/* 渲染统计页全部内容 */
function renderStats(){
  /* 1) 大字数值：当前选中区间净增和 */
  var sum = wlogSum(_statsRange);
  if($('statsTotal')) $('statsTotal').textContent = sum;
  if($('statsRangeLabel')) $('statsRangeLabel').textContent = t(STATS_RANGE_KEY[_statsRange]);
  /* 2) 切换条 active 状态 */
  var seg = $('statsSeg');
  if(seg){
    var items = seg.querySelectorAll('.stats-seg-item');
    Array.prototype.forEach.call(items, function(it){
      if(it.getAttribute('data-range') === _statsRange) it.classList.add('active');
      else it.classList.remove('active');
    });
  }
  /* 3) 折线图：近 7 天 */
  buildLineChart($('statsChart'), wlogDaily(7));
  /* 4) 作品维度 */
  renderStatsWorks();
}
/* 作品维度渲染（切换器 + 当前作品统计） */
function renderStatsWorks(){
  var sw = $('statsWorkSwitch');
  var empty = $('statsEmpty');
  var card = document.querySelector('.stats-work-card');
  if(!store.works.length){
    if(sw) sw.innerHTML = '';
    if(empty) empty.classList.remove('hidden');
    if(card) card.classList.add('hidden');
    return;
  }
  if(empty) empty.classList.add('hidden');
  if(card) card.classList.remove('hidden');
  /* 默认选中：偏好 curWork，其次第一部 */
  var exists = false;
  store.works.forEach(function(w){ if(w.id === _statsWorkId) exists = true; });
  if(!exists){
    _statsWorkId = (store.curWork && store.curWork.id) ? store.curWork.id : store.works[0].id;
  }
  /* 切换器 */
  if(sw){
    sw.innerHTML = '';
    store.works.forEach(function(w){
      var chip = document.createElement('button');
      chip.className = 'stats-work-chip' + (w.id === _statsWorkId ? ' active' : '');
      chip.textContent = w.title || t('tip.untitledWork');
      chip.addEventListener('click', function(){
        _statsWorkId = w.id;
        renderStatsWorks();
      });
      sw.appendChild(chip);
    });
  }
  /* 当前作品统计 */
  var cur = null;
  store.works.forEach(function(w){ if(w.id === _statsWorkId) cur = w; });
  if(!cur){ cur = store.works[0]; _statsWorkId = cur.id; }
  var chs = (cur.chapters||[]).length, words = 0;
  (cur.chapters||[]).forEach(function(c){ words += (c.words||0); });
  if($('statsWorkTitle')) $('statsWorkTitle').textContent = cur.title || t('tip.untitledWork');
  if($('statsWorkCh')) $('statsWorkCh').textContent = chs;
  if($('statsWorkWords')) $('statsWorkWords').textContent = words;
}
/* 绑定统计页交互（切换条 + 返回），在 init 调一次 */
function bindStats(){
  var back = $('statsBack');
  if(back) back.addEventListener('click', function(){ closeSub('subStats'); });
  var seg = $('statsSeg');
  if(seg){
    var items = seg.querySelectorAll('.stats-seg-item');
    Array.prototype.forEach.call(items, function(it){
      it.addEventListener('click', function(){
        _statsRange = it.getAttribute('data-range') || 'today';
        renderStats();
      });
    });
  }
}
/* --- 本地备份：导出全部作品 JSON --- */
function toolBackup(){
  var data = JSON.stringify({ app:'XXZZu', time:Date.now(), account:accountKey(), works:store.works });
  var r = nativeSave('XXZZu_备份_' + tsStamp() + '.json', data);
  if(r && r.indexOf('ERR:')!==0) pop({ title:t('tools.tBackup'), msg:t('tools.exportOk') + '\n' + r, okText:t('common.ok') });
  else pop({ title:t('tools.tBackup'), msg:t('tools.exportFail'), okText:t('common.ok') });
}
function renderTools(){
  var tf = $('shelfAddBtn');
  if(tf) tf.addEventListener('click', function(){ openSub('subCreate'); });
  buildToolGrid($('toolsLocal'), TOOLS_LOCAL);
  buildToolGrid($('toolsAi'), TOOLS_AI);
  var sSync = $('shelfSyncBtn');
  if(sSync) sSync.addEventListener('click', function(){ pop({ title:t('me.cloud'), msg:t('me.cloudHint'), okText:t('common.ok') }); });
  /* 【4批e-fix23】构建后刷新 AI 四项灰态 */
  refreshToolGrid();
}

/* ---------------- 启动 ---------------- */
function bindTabs(){
  var items = document.querySelectorAll('.tab-item');
  Array.prototype.forEach.call(items, function(el){
    el.addEventListener('click', function(){ switchTab(el.getAttribute('data-tab')); });
  });
}
var _inited = false;
function init(){
  if(_inited) return;
  _inited = true;
  applyFontTheme();
  applyI18N();
  bindTabs();
  bindLogin();
  bindCreate();
  bindSettings();
  bindMenu();
  bindWriteFont();
  bindDrawers();
  bindWorkInfo();
  bindMe();
  renderTools();
  renderMe();
  /* 【4批e-fix22】统计页交互绑定 */
  bindStats();
  /* 【4批e-fix23】AI 子页交互绑定 + 初始灰态刷新 */
  bindAi();
  bindSettingOnce();
  refreshToolGrid();

  var pm = $('popMask');
  if(pm) pm.addEventListener('click', closePop);
  popMaskEl = $('popMask');
  popSheetEl = $('popSheet');
  popTitleEl = $('popTitle');
  popBodyEl = $('popBody');

  // 【返修4批e-fix7】免责声明改为常显，移除点击展开逻辑

  // 【返修4批e-fix6】关于弹窗：底部灰字「XXZZu · 本地优先」点击弹圆框
  var aboutEntry = $('aboutEntry');
  var aboutMask = $('aboutMask');
  var aboutBox = $('aboutBox');
  if(aboutEntry) aboutEntry.addEventListener('click', function(){
    if(aboutMask) aboutMask.classList.add('show');
    if(aboutBox) aboutBox.classList.add('show');
  });
  function closeAbout(){
    if(aboutMask) aboutMask.classList.remove('show');
    if(aboutBox) aboutBox.classList.remove('show');
  }
  if(aboutMask) aboutMask.addEventListener('click', closeAbout);
  var aboutClose = $('aboutClose');
  if(aboutClose) aboutClose.addEventListener('click', closeAbout);

  // 【返修4批c】取消登录态：始终直接进入主界面，纯本地使用
  LS.set(K.LOCAL_ONLY, '1');
  showApp();
  // 【4批e-fix38】开屏防闪：等 init 完成、主界面已就绪后再解除 boot-hide，
  // 避免 WebView 先渲染出未套主题的默认页闪一下
  document.body.classList.remove('boot-hide');
  requestAnimationFrame(function(){
    document.body.classList.remove('boot-hide');
  });
  // 【4批e-fix40】滑动质感：默认硬件加速渲染；仅在输入框聚焦时切软件层以兼容中文输入法。
  // 用事件委托监听全局 input/textarea 的 focusin/focusout，避免逐元素绑定。
  (function bindSoftRender(){
    if(!(window.Android && typeof window.Android.setSoftRender === 'function')) return;
    function isField(n){
      return !!(n && n.nodeType === 1 && (n.tagName === 'INPUT' || n.tagName === 'TEXTAREA' || n.isContentEditable));
    }
    document.addEventListener('focusin', function(e){
      if(isField(e.target)){ try{ window.Android.setSoftRender(true); }catch(err){} }
    }, true);
    document.addEventListener('focusout', function(e){
      if(isField(e.target)){ try{ window.Android.setSoftRender(false); }catch(err){} }
    }, true);
  })();
}

window.XXZZU = {
  t:t, pop:pop, closePop:closePop, switchTab:switchTab,
  openSub:openSub, closeSub:closeSub, applyI18N:applyI18N,
  store:store, renderShelf:renderShelf, openWrite:openWrite,
  saveCurrent:saveCurrent, renderMe:renderMe, openSettings:openSettings
};

document.addEventListener('DOMContentLoaded', init);
if(document.readyState!=='loading' && document.readyState!=='interactive'){ init(); }

})();

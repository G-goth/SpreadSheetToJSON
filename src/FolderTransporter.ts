// ファイルを作成したところへのリンクを表示させる
function GenerateFilesLink(folderId: string) {
    const url = "https://drive.google.com/drive/folders/" + folderId;
    // tslint:disable-next-line:prefer-const
    let htmlOutput = HtmlService
    .createHtmlOutput('<p><a href="' + url + '" target="blank">JSONファイル生成しました</a></p>')
    .setSandboxMode(HtmlService.SandboxMode.IFRAME)
    .setWidth(250)
    .setHeight(100);
    SpreadsheetApp.getUi().showModelessDialog(htmlOutput, "ファイルへのリンク");
}

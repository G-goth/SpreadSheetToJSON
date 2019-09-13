// メニューからJSONダウンロードスクリプトを呼べるようにするための変数の用意
let methodNames: string[] = ["DownloadJsonFileActiveSheet", "DownloadJsonFileSheetAllinOne"];

// Google SpreadSheetに拡張メニューを追加
function onOpen() {
    const ui = SpreadsheetApp.getUi();
    const menu = ui.createMenu("マスタデータ");
    menu.addItem("現在のシートをJSONに出力", methodNames[0]);
    menu.addItem("すべてのシートをJSONに出力", methodNames[1]);
    menu.addToUi();
}
// 現在アクティブになっているシートのデータをJSONファイルに出力する
function DownloadJsonFileActiveSheet() {
    const dlJsonFile = new DownloadJSONFile();
    dlJsonFile.DownloadJsonFileActiveSheet();
}
// 開いているスプレッドシートのすべてのシートをJSONファイルに出力する(個別ファイルに出力)
function DownloadJsonFileSheetAllinOne() {
    const dlJsonFile = new DownloadJSONFile();
    dlJsonFile.DownloadJsonFileSheetAllinOne();
}

class FileTrasporter {
    private folderId: string;
    private url: string = "https://drive.google.com/drive/folders/";
    private myFolderUrl: string = "https://drive.google.com/drive/";
    
    constructor(folderId: string) {
        this.folderId = folderId;
    }
    
    public GenereteFolderPathLink(): void {
        this.url += this.folderId;
        const htmlOutput = HtmlService
        .createHtmlOutput('<p><a href="' + this.url + '" target="blank">JSONファイル生成しました</a></p>')
        .setSandboxMode(HtmlService.SandboxMode.IFRAME)
        .setWidth(250)
        .setHeight(100);
        SpreadsheetApp.getUi().showModelessDialog(htmlOutput, "ファイルへのリンク");
    }

    public GenerateMyFolderPathLink() {
        this.myFolderUrl += this.folderId;
        const htmlOutput = HtmlService
        .createHtmlOutput('<p><a href="' + this.myFolderUrl + '" target="blank">JSONファイル生成しました</a></p>')
        .setSandboxMode(HtmlService.SandboxMode.IFRAME)
        .setWidth(250)
        .setHeight(100);
        SpreadsheetApp.getUi().showModelessDialog(htmlOutput, "ファイルへのリンク");
    }
}

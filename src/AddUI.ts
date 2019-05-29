// メニューからJSONダウンロードスクリプトを呼べるようにするための変数の用意
// tslint:disable-next-line:max-line-length
let methodNames: string[] = ["DownloadJsonFileActiveSheet", "DownloadJsonFileSheetAllinOne", "DownloadJsonFilendividualPackagingSheet"];

// Google SpreadSheetに拡張メニューを追加
function onOpen() {
    const ui = SpreadsheetApp.getUi();
    const menu = ui.createMenu("マスタデータ");
    // menu.addItem("現在のシートをJSONに出力", methodNames[0]);
    menu.addItem("すべてのシートをJSONに出力", methodNames[1]);
    // menu.addItem("すべてのシートをJSONに出力(個別ファイル)", methodNames[2]);
    menu.addToUi();
}

// メニューからJSONダウンロードスクリプトを呼べるようにするための変数の用意
let methodNames: string[] = ["DownloadJsonFileActiveSheet", "DownloadJsonFileAllSheet"];

// Google SpreadSheetに拡張メニューを追加
function onOpen() {
    const ui = SpreadsheetApp.getUi();
    const menu = ui.createMenu("マスタデータ");
    menu.addItem("現在のシートをJSONに出力", methodNames[0]);
    menu.addItem("すべてのシートをJSONに出力", methodNames[1]);
    menu.addToUi();
}
// 現在アクティブになっているシートのデータをJSONファイルに出力する
function DownloadJsonFileActiveSheet() {
    const activeSheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    ImportMasterDataSheetActive(activeSheet);
}

// 開いているスプレッドシートのすべてのシートをJSONファイルに出力する
function DownloadJsonFileAllSheet() {
    const allSheets = SpreadsheetApp.getActiveSpreadsheet().getSheets();
    ImportMasterDataAllSheets(allSheets);
}

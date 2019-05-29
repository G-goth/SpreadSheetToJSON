// 現在アクティブになっているシートのデータをJSONファイルに出力する
function DownloadJsonFileActiveSheet() {
    const activeSheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    ImportMasterDataSheetActive(activeSheet);
}

// 開いているスプレッドシートのすべてのシートをJSONファイルに出力する(個別ファイルに出力)
function DownloadJsonFileSheetAllinOne() {
    const allInOneSheets = SpreadsheetApp.getActiveSpreadsheet().getSheets();
    ImportMasterDataSheetAllinOne(allInOneSheets);
}

// 開いているスプレッドシートのすべてのシートをJSONファイルに出力する(個別ファイルに出力)
function DownloadJsonFilendividualPackagingSheet() {
    const allSheets = SpreadsheetApp.getActiveSpreadsheet().getSheets();
    ImportMasterDataSheetIndividualPackaging(allSheets);
}

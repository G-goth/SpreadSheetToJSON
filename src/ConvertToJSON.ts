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

class DownloadJSONFile {
    public DownloadJsonFileActiveSheet() {
        const getData = new GetSpreadSheetData();
        const activeSheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
        getData.OutPutActiveMasterDataToJSON(activeSheet);
    }
    
    // 開いているスプレッドシートのすべてのシートをJSONファイルに出力する(個別ファイルに出力)
    public DownloadJsonFileSheetAllinOne() {
        const getData = new GetSpreadSheetData();
        const allInOneSheets = SpreadsheetApp.getActiveSpreadsheet().getSheets();
        getData.OutPutMasterDataToJSON(allInOneSheets);
    }
}

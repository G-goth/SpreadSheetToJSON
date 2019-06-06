class DownloadJSONFile {
    public DownloadJsonFileActiveSheet(): void {
        const getData = new GetSpreadSheetData();
        const activeSheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
        // getData.OutPutActiveMasterDataToJSON(activeSheet);
    }
    
    // 開いているスプレッドシートのすべてのシートをJSONファイルに出力する(個別ファイルに出力)
    public DownloadJsonFileSheetAllinOne(): void {
        const getData = new GetSpreadSheetData();
        const allInOneSheets = SpreadsheetApp.getActiveSpreadsheet().getSheets();
        getData.OutPutMasterDataToJSON(allInOneSheets);
    }
}

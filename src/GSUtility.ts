function GetMasterDataActiveSheetName() {
    const activeSheet: string = SpreadsheetApp.getActiveSheet().getName();
    return activeSheet;
}

// 各シート名を変数に入れて配列で返す
function GetMasterDataAllSheetNames() {
    // シート名を一括で受け取る
    const sheetNames: string[] = [];
    const allSheets = SpreadsheetApp.getActiveSpreadsheet().getSheets();
    // tslint:disable-next-line:forin
    for (const i in allSheets) {
        sheetNames[i] = allSheets[i].getName();
    }
    return sheetNames;
}

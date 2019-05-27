// アクティブになっているスプレッドシートのデータを取得
// tslint:disable-next-line:max-line-length
function ImportMasterDataSheet(googleSheet: GoogleAppsScript.Spreadsheet.Sheet, sheetName?: string) {
    // シートの最終行番号、最終列番号を取得
    const startRow = 3;
    const startCol = 1;
    const lastRow = googleSheet.getLastRow();
    const lastCol = googleSheet.getLastColumn();
    const sheetData = googleSheet.getSheetValues(startRow, startCol, lastRow, lastCol);
    const sheetColumnData = googleSheet.getSheetValues(startRow, startCol, startRow, lastCol);

    let container = {};
    const goldfishMasterArray: any[] = [];
    for (let i = 0; i < (sheetData.length - startRow); ++i) {
        for (let j = 0; j < sheetData[0].length; ++j) {
            container[sheetColumnData[0][j].toString()] = sheetData[i + 1][j];
        }
        goldfishMasterArray[i] = container;
        container = {};
    }
    const result = {[sheetName]: goldfishMasterArray};
    return JSON.stringify(result);
}
// アクティブになっているスプレッドシートのデータを取得してJSON用に整形した文字列を受け取る
function ImportMasterDataSheetActive(googleSheet: GoogleAppsScript.Spreadsheet.Sheet) {
    const sheetName = googleSheet.getSheetName();
    const jsonStr = ImportMasterDataSheet(googleSheet, sheetName);
    MakeJsonFileSequentially(jsonStr, googleSheet.getSheetName());
}
// すべてのスプレッドシートのデータを取得してJSON用に整形した文字列を受け取る
function ImportMasterDataAllSheets(googleSheet: GoogleAppsScript.Spreadsheet.Sheet[]) {
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < googleSheet.length; ++i) {
        const sheetName = googleSheet[i].getSheetName();
        const jsonStr = ImportMasterDataSheet(googleSheet[i], sheetName);
        MakeJsonFileSequentially(jsonStr, googleSheet[i].getSheetName());
    }
}

// スプレッドシートのデータを取得のベース
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
    return {[sheetName]: goldfishMasterArray};
}
// スプレッドシートのデータを取得のベース
// tslint:disable-next-line:max-line-length
function ImportMasterDataSheetAll(googleSheet: GoogleAppsScript.Spreadsheet.Sheet[]) {
    // シートの最終行番号、最終列番号を取得
    const startRow = 3;
    const startCol = 1;
    let lastRow: number;
    let lastCol: number;
    let sheetData: any;
    let sheetColumnData: any;

    let container = {};
    const goldfishMasterArray: any[] = [];
    for (let i = 0; i < (googleSheet.length - startRow); ++i) {
        lastRow = googleSheet[i].getLastRow();
        lastCol = googleSheet[i].getLastColumn();
        sheetData = googleSheet[i].getSheetValues(startRow, startCol, lastRow, lastCol);
        sheetColumnData = googleSheet[i].getSheetValues(startRow, startCol, startRow, lastCol);

        for (let j = 0; j < sheetData[0].length; ++j) {
            container[sheetColumnData[0][j].toString()] = sheetData[i + 1][j];
        }
        goldfishMasterArray[i] = container;
        container = {};
    }

    let result = {};
    result = { [sheetColumnData[0][0].toString()]: goldfishMasterArray};
    return JSON.stringify(goldfishMasterArray);
}
// アクティブになっているスプレッドシートのデータを取得してJSON用に整形した文字列を受け取る
function ImportMasterDataSheetActive(googleSheet: GoogleAppsScript.Spreadsheet.Sheet) {
    const sheetName = googleSheet.getSheetName();
    const jsonStr = ImportMasterDataSheet(googleSheet, sheetName);
    MakeJsonFile(JSON.stringify(jsonStr));
}
// すべてのスプレッドシートのデータを取得してJSON用に整形した文字列を受け取る
function ImportMasterDataAllSheets(googleSheet: GoogleAppsScript.Spreadsheet.Sheet[]) {
    const jsonStrArray: any[] = [];
    const fileNames: string[] = [];
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < googleSheet.length; ++i) {
        fileNames[i] = googleSheet[i].getSheetName();
        jsonStrArray[i] = ImportMasterDataSheet(googleSheet[i], fileNames[i]);
    }
    // Browser.msgBox(JSON.stringify(jsonStrArray));
    MakeJsonFile(JSON.stringify(jsonStrArray));
}
// すべてのシートを1つのJSONファイルに出力
function ImportMasterDataSheetAllinOne(googleSheet: GoogleAppsScript.Spreadsheet.Sheet[]) {
    // let jsonStr: string = "";
    // const jsonStr = ImportMasterDataSheet(googleSheet[i], sheetName);
    // jsonStr = ImportMasterDataSheetAll(googleSheet);
    // Browser.msgBox(jsonStr.toString());
    // MakeJsonFile(jsonStr);
}

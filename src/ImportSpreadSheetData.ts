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

    const goldfishMasterArray: any[] = [];
    const columnDiffCount: number = sheetData.length - startRow;

    let container = {};
    let result: string = "";
    // マスターのカラムが1つしかない場合
    if (columnDiffCount <= 1) {
        for (let i = 0; i < sheetData[0].length; ++i) {
            container[sheetColumnData[0][i].toString()] = sheetData[1][i];
        }
        result = JSON.stringify(container);
    }
    // マスターのカラムが2つ以上ある場合
    // tslint:disable-next-line:one-line
    else {
        for (let i = 0; i < (sheetData.length - startRow); ++i) {
            for (let j = 0; j < sheetData[0].length; ++j) {
                container[sheetColumnData[0][j].toString()] = sheetData[i + 1][j];
            }
            goldfishMasterArray[i] = container;
            container = {};
        }
        result = JSON.stringify(goldfishMasterArray);
    }
    return '"' + sheetName + '":' + result;
}
// アクティブになっているスプレッドシートのデータを取得してJSON用に整形した文字列を受け取る
function ImportMasterDataSheetActive(googleSheet: GoogleAppsScript.Spreadsheet.Sheet) {
    const sheetName = googleSheet.getSheetName();
    const jsonStr = ImportMasterDataSheet(googleSheet, sheetName);
    // Browser.msgBox(jsonStr);
    MakeJsonFile(JSON.stringify(jsonStr));
}
// すべてのスプレッドシートのデータを取得してJSON用に整形した文字列を受け取る
function ImportMasterDataSheetAllinOne(googleSheet: GoogleAppsScript.Spreadsheet.Sheet[]) {
    let joinedJsonStr: string = "";
    const jsonStrArray: any[] = [];
    const fileNames: string[] = [];
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < googleSheet.length; ++i) {
        fileNames[i] = googleSheet[i].getSheetName();
        jsonStrArray[i] = ImportMasterDataSheet(googleSheet[i], fileNames[i]);
    }

    // JSONにシリアライズされた文字列同士を結合
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < (jsonStrArray.length - 1); ++i) {
        joinedJsonStr += jsonStrArray[i] + ",";
    }
    joinedJsonStr += jsonStrArray[jsonStrArray.length - 1];
    // Browser.msgBox("{" + joinedJsonStr + "}");
    MakeJsonFile("{" + joinedJsonStr + "}");
}
// すべてのシートを1つのJSONファイルに出力
function ImportMasterDataSheetIndividualPackaging(googleSheet: GoogleAppsScript.Spreadsheet.Sheet[]) {
    Browser.msgBox("今はカラ");
}

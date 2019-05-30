// スプレッドシートのデータを取得のベース
class GetSpreadSheetData {
    private startRow: number = 3;
    private startCol: number = 1;

    // すべてのシートのデータをJSON文字列として出力
    public OutPutMasterDataToJSON(googleSheet: GoogleAppsScript.Spreadsheet.Sheet[]): string {
        let result: string = "";
        for (let i = 0; i < (googleSheet.length - 1); ++i) {
            result += this.ImportMasterDataSheet(googleSheet[i], googleSheet[i].getSheetName()) + ",";
        }
        result += this.ImportMasterDataSheet(googleSheet[googleSheet.length - 1], googleSheet[googleSheet.length - 1].getSheetName());
        Browser.msgBox("{" + result + "}");
        return "";
    }
    public OutPutActiveMasterDataToJSON(googleSheet: GoogleAppsScript.Spreadsheet.Sheet) {
        const result: string = this.ImportMasterDataSheet(googleSheet, googleSheet.getSheetName()) + ",";
        Browser.msgBox("{" + result + "}");
    }

    private ImportMasterDataSheet(googleSheet: GoogleAppsScript.Spreadsheet.Sheet, sheetName: string): string {
        const lastRow = googleSheet.getLastRow();
        const lastCol = googleSheet.getLastColumn();
        const sheetData = googleSheet.getSheetValues(this.startRow, this.startCol, lastRow, lastCol);
        const sheetColumnData = googleSheet.getSheetValues(this.startRow, this.startCol, this.startRow, lastCol);
        const columnDiffCount: number = sheetData.length - this.startRow;

        let result: string = "";
        if (columnDiffCount <= 1) {
            result = this.ImportOneDataSpreadSheet(sheetColumnData, sheetData, columnDiffCount);
        }
        else {
            result = this.ImportMultipleLinesDataSpreadSheet(sheetColumnData, sheetData, columnDiffCount);
        }
        return '"' + sheetName + '":' + result;
    }

    // スプレッドシート内のマスタデータが1列しかなかっときのメソッド
    private ImportOneDataSpreadSheet(columnDataArray: object[][], sheetData: object[][], columnDiffCount: number): string {
        const container = {};
        for (let i = 0; i < sheetData[0].length; ++i) {
            container[columnDataArray[0][i].toString()] = sheetData[1][i];
        }
        const result = JSON.stringify(container);
        return result;
    }
    // スプレッドシート内のマスタデータが2列以上ある場合のメソッド
    private ImportMultipleLinesDataSpreadSheet(columnDataArray: object[][], sheetData: object[][], columnDiffCount: number): string {
        const goldfishMasterArray: object[] = [];
        let container = {};
        for (let i = 0; i < (sheetData.length - this.startRow); ++i) {
            for (let j = 0; j < sheetData[0].length; ++j) {
                container[columnDataArray[0][j].toString()] = sheetData[i + 1][j];
            }
            goldfishMasterArray[i] = container;
            container = {};
        }
        const result = JSON.stringify(goldfishMasterArray);
        return result;
    }
}

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
    // Browser.msgBox("{" + jsonStr + "}");
    MakeJsonFile(("{" + jsonStr + "}"));
}
// すべてのスプレッドシートのデータを取得してJSON用に整形した文字列を受け取る
function ImportMasterDataSheetAllinOne(googleSheet: GoogleAppsScript.Spreadsheet.Sheet[]) {
    let joinedJsonStr: string = "";
    const jsonStrArray: any[] = [];
    const fileNames: string[] = [];
    for (let i = 0; i < googleSheet.length; ++i) {
        fileNames[i] = googleSheet[i].getSheetName();
        jsonStrArray[i] = ImportMasterDataSheet(googleSheet[i], fileNames[i]);
    }

    // JSONにシリアライズされた文字列同士を結合
    for (let i = 0; i < (jsonStrArray.length - 1); ++i) {
        joinedJsonStr += jsonStrArray[i] + ",";
    }
    joinedJsonStr += jsonStrArray[jsonStrArray.length - 1];
    // Browser.msgBox("{" + joinedJsonStr + "}");
    MakeJsonFile("{" + joinedJsonStr + "}");
}

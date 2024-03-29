// スプレッドシートのデータを取得のベース
class GetSpreadSheetData {
    private startRow: number = 3;
    private startCol: number = 1;

    // すべてのシートのデータをJSON文字列として出力
    public OutPutMasterDataToJSON(googleSheet: GoogleAppsScript.Spreadsheet.Sheet[]): void {
        const makeJson: MakeJsonFiles = new MakeJsonFiles();
        // const makeJsonMyFolder: MakeJsonFilesMyFolder = new MakeJsonFilesMyFolder();
        let result: string = "";

        for (let i = 0; i < (googleSheet.length - 1); ++i) {
            result += this.ImportMasterDataSheet(googleSheet[i], googleSheet[i].getSheetName()) + ",";
        }
        result += this.ImportMasterDataSheet(googleSheet[googleSheet.length - 1], googleSheet[googleSheet.length - 1].getSheetName());
        
        makeJson.MakeJsonFile("{" + result + "}");
        // makeJsonMyFolder.MakeJsonFileMyFolder("{" + result + "}");
        // Browser.msgBox("{" + result + "}");
    }

    // アクティブになっているシートをJSON文字列に変換
    public OutPutActiveMasterDataToJSON(googleSheet: GoogleAppsScript.Spreadsheet.Sheet): void {
        const makeJson: MakeJsonFiles = new MakeJsonFiles();
        // const makeJsonMyFolder: MakeJsonFilesMyFolder = new MakeJsonFilesMyFolder();
        const result: string = this.ImportMasterDataSheet(googleSheet, googleSheet.getSheetName());

        makeJson.MakeActiveJsonFile("{" + result + "}");
        // makeJsonMyFolder.MakeActiveJsonFileMyFolder("{" + result + "}");
        // Browser.msgBox("{" + result + "}");
    }

    private ImportMasterDataSheet(googleSheet: GoogleAppsScript.Spreadsheet.Sheet, sheetName: string): string {
        const lastRow = googleSheet.getLastRow();
        const lastCol = this.GetCorrectColumnNumber(googleSheet);
        const sheetData = googleSheet.getSheetValues(this.startRow, this.startCol, lastRow, lastCol);
        const sheetColumnData = googleSheet.getSheetValues(this.startRow, this.startCol, this.startRow, lastCol);
        const columnDiffCount: number = sheetData.length - this.startRow;

        let result: string = "";
        if (columnDiffCount <= 1) {
            result = this.ImportOneDataSpreadSheet(sheetColumnData, sheetData);
        }
        else {
            result = this.ImportMultipleLinesDataSpreadSheet(sheetColumnData, sheetData);
        }
        return '"' + sheetName + '":' + result;
    }

    // スプレッドシート内のマスタデータが1列しかなかった時のメソッド
    private ImportOneDataSpreadSheet(columnDataArray: object[][], sheetData: object[][]): string {
        const container = {};
        for (let i = 0; i < sheetData[0].length; ++i) {
            container[columnDataArray[0][i].toString()] = sheetData[1][i];
        }
        const result = JSON.stringify(container, undefined, "\t");
        return result;
    }

    // スプレッドシート内のマスタデータが2列以上ある場合のメソッド
    private ImportMultipleLinesDataSpreadSheet(columnDataArray: object[][], sheetData: object[][]): string {
        const goldfishMasterArray: object[] = [];
        let container = {};
        for (let i = 0; i < (sheetData.length - this.startRow); ++i) {
            for (let j = 0; j < sheetData[0].length; ++j) {
                container[columnDataArray[0][j].toString()] = sheetData[i + 1][j];
            }
            goldfishMasterArray[i] = container;
            container = {};
        }
        const result = JSON.stringify(goldfishMasterArray, undefined, "\t");
        return result;
    }

    // キー値が空白の部分を抜かした行数を返す
    private GetCorrectColumnNumber(googleSheet: GoogleAppsScript.Spreadsheet.Sheet): number {
        const lastColumn = googleSheet.getLastColumn();
        const keyValueArray = googleSheet.getRange(3, 1, 1, lastColumn).getValues();
        let spaceCount: number = 0;

        for (let i = 0; i < keyValueArray[0].length; ++i) {
            if (keyValueArray[0][i] === "") {
                ++spaceCount;
            }
        }
        return (lastColumn - spaceCount);
    }
}

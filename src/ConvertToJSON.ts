// Google SpreadSheetに拡張メニューを追加
function AddOnMenu() {
    SpreadsheetApp
        .getActiveSpreadsheet()
        .addMenu("JSONデータ出力", [
            {name: "データ出力", functionName: "GetMainSheet"},
        ]);
}

// アクティブになっているスプレッドシートのデータを取得
function GetMainSheet() {
    // // URL特定のシートをすべて取得
    // const sheets = spreadSheet.getSheets();

    // // URLから取得したスプレッドシートの特定シートの代入
    // const sheet = sheets[1];

    // // シートの最終行番号、最終列番号を取得
    // const startRow = 3;
    // const startCol = 1;
    // const lastRow = sheet.getLastRow();
    // const lastCol = sheet.getLastColumn();
    // const sheetData = sheet.getSheetValues(startRow, sttrtCol, lastRow, lastCol);

    // Logger.log(sheetData[0][0]);
}

function MakeJsonFiles() {
    // const contentType = "text/plain";
    // const charSet = "UTF-8";
    // const lineDelimiter = ",";
    // const newLineChar = "\n";
    // const fileName = "setting.json";　// 任意のjsonのファイル名を記入
    // const folderId = "1iMwhsPKiY4SbXLSst0aOmjbsflicX8wZJEGf8yGK7jU";
    // const folder = DriveApp.getFolderById(folderId).getFilesByName(fileName).next().getId();
    // Logger.log(folder);
}

// セルのデータをスクリプトに入れ込む
function ImportSpreadSheetCellData() {
    Logger.log("Test Log");
}

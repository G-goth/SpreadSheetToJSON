// メニューからJSONダウンロードスクリプトを呼べるようにするための変数の用意
let methodNames: string[] = ["DownloadJsonFileActiveSheet", "DownloadJsonFileAllSheet"];
let spreadSheetId = "1lYnchQUgjBV1L7UVWQtG-dGRL6yWVDVQQJBpR97Lkuc";

// Google SpreadSheetに拡張メニューを追加
function onOpen() {
    const ui = SpreadsheetApp.getUi();
    const menu = ui.createMenu("マスタデータ");
    menu.addItem("現在のシートをJSONに出力", methodNames[0]);
    menu.addItem("すべてのシートをJSONに出力", methodNames[1]);
    menu.addToUi();
}
// 多次元配列のここの配列数を返す
function TwoDimensionsArrayLength(array: any[][]) {
    // tslint:disable-next-line:prefer-const
    let arrayLength: number;
    arrayLength = array[0].length;
    // // tslint:disable-next-line:prefer-for-of
    // for (let sheetCountF = 0; sheetCountF < array.length; ++sheetCountF) {
    //     // tslint:disable-next-line:prefer-for-of
    //     for (let sheetCountS = 0; sheetCountS < array[sheetCountS].length; ++sheetCountS) {
    //         arrayLength += 1;
    //     }
    // }
    return arrayLength;
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

// アクティブになっているスプレッドシートのデータを取得
function ImportMasterDataSheetActive(googleSheet: GoogleAppsScript.Spreadsheet.Sheet) {
    // シートの最終行番号、最終列番号を取得
    const startRow = 3;
    const startCol = 1;
    const lastRow = googleSheet.getLastRow();
    const lastCol = googleSheet.getLastColumn();
    const sheetData = googleSheet.getSheetValues(startRow, startCol, lastRow, lastCol);

    if (googleSheet.getSheetName() === "基本ゲームデータ") {
        Browser.msgBox("基本ゲームデータのマスタだよ。");
    }
}

// すべてのスプレッドシートのデータを取得
function ImportMasterDataAllSheets(googleSheet: GoogleAppsScript.Spreadsheet.Sheet[]) {
    let jsonStr: string = "{";
    const startRow = 3;
    const startCol = 1;
    const sheetNames = GetMasterDataAllSheetNames();
    // const lastRow = googleSheet[1].getLastRow();
    // const lastCol = googleSheet[1].getLastColumn();
    // const sheetData = googleSheet[1].getSheetValues(startRow, startCol, lastRow, lastCol);

    // 金魚すくいゲームマスターデータの呼び出し
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < googleSheet.length; ++i) {
        const lastRow = googleSheet[i].getLastRow();
        const lastCol = googleSheet[i].getLastColumn();
        const sheetData = googleSheet[i].getSheetValues(startRow, startCol, lastRow, lastCol);

        // 基本ゲームデータマスターデータ
        if (googleSheet[i].getSheetName() === sheetNames[0]) {
            jsonStr += '"base_game_data": {';
            for (let sheetDataCount = 1; sheetDataCount < sheetData[i].length - 1; ++sheetDataCount) {
                jsonStr += '"base_game_data_id": ' + sheetData[sheetDataCount][0] + ",";
                jsonStr += '"play_time": ' + sheetData[sheetDataCount][1] + ",";
                jsonStr += '"fever_time": ' + sheetData[sheetDataCount][2];
            }
            jsonStr += "},";
        }
        // 金魚マスターデータ
        if (googleSheet[i].getSheetName() === sheetNames[1]) {
            jsonStr += '"kingyo": [';
            // tslint:disable-next-line:max-line-length
            jsonStr += JSON.stringify({kingyo_id: sheetData[1][0], probability_id: sheetData[1][2], score_id: sheetData[1][3]});
            jsonStr += "]";
        }
    }
    // tslint:disable-next-line:no-console
    jsonStr += "}";
    Browser.msgBox(jsonStr);
    // MakeJsonFile(jsonStr);
    //     // シート別JSON文字列の整形
    //     // 基本ゲームデータシート
    //     if (googleSheet[i].getSheetName() === sheetNames[0]) {
    //         // マスタデータをJSON文字列にコンバート
    //         Browser.msgBox(TwoDimensionsArrayLength(sheetData).toString());
    //     }
    //     // 金魚シート
    //     if (googleSheet[i].getSheetName() === sheetNames[i]) {
    //         for (let sheetCount = 1; sheetCount < sheetData.length; ++sheetCount) {
    //             // tslint:disable-next-line:max-line-length
    //             jsonStr += JSON.stringify({kingyo: [sheetData[sheetCount][0], sheetData[sheetCount][2], sheetData[sheetCount][3]]});
    //         }
    //     }
    //     // 確率シート
    //     if (googleSheet[i].getSheetName() === sheetNames[i]) {
    //         for (let sheetCount = 1; sheetCount < sheetData.length; ++sheetCount) {
    //             // tslint:disable-next-line:max-line-length
    //             jsonStr += JSON.stringify({probability_id: sheetData[sheetCount][0], kingyo_id: sheetData[sheetCount][1], OccurrenceProbability: sheetData[sheetCount][2]});
    //         }
    //     }
    //     // 得点シート
    //     if (googleSheet[i].getSheetName() === sheetNames[i]) {
    //         for (let sheetCount = 1; sheetCount < sheetData.length; ++sheetCount) {
    //             // tslint:disable-next-line:max-line-length
    //             jsonStr += JSON.stringify({probability_id: sheetData[sheetCount][0], kingyo_id: sheetData[sheetCount][1], score: sheetData[sheetCount][2], festival_point: sheetData[sheetCount][3]});
    //         }
    //     }
    //     // ポイゲージシート
    //     if (googleSheet[i].getSheetName() === sheetNames[i]) {
    //         for (let sheetCount = 1; sheetCount < sheetData.length; ++sheetCount) {
    //             // tslint:disable-next-line:max-line-length
    //             jsonStr += JSON.stringify({poi_gauge_id: sheetData[sheetCount][0], max_strength_level: sheetData[sheetCount][1], min_strength_level: sheetData[sheetCount][2], decrease_point: sheetData[sheetCount][3]});
    //         }
    //     }
    //     // お祭りタイムシート
    //     if (googleSheet[i].getSheetName() === sheetNames[i]) {
    //         for (let sheetCount = 1; sheetCount < sheetData.length; ++sheetCount) {
    //             // tslint:disable-next-line:max-line-length
    //             jsonStr += JSON.stringify({festival_time_id: sheetData[sheetCount][0], festival_time_count: sheetData[sheetCount][1], up_to_wasshoi: sheetData[sheetCount][2], in_fes_times_festival_point: sheetData[sheetCount][3], festival_time_coeff: sheetData[sheetCount][4]});
    //         }
    //     }
    //     // ギフトポイントシート
    //     if (googleSheet[i].getSheetName() === sheetNames[i]) {
    //         for (let sheetCount = 1; sheetCount < sheetData.length; ++sheetCount) {
    //             // tslint:disable-next-line:max-line-length
    //             jsonStr += JSON.stringify({gift_point_id: sheetData[sheetCount][0], festival_point: [sheetCount][2]});
    //         }
    //     }
    // }
    // MakeJsonFile(jsonStr);
}

function MakeJsonFile(jsonStr: any) {
    const contentType = "text/plain";
    const charSet = "UTF-8";
    const lineDelimiter = ",";
    const newLineChar = "\n";
    const fileName = "setting.json";　// 任意のjsonのファイル名を記入
    const folderId = "1D0s0eM3jDNW6NRyk3Qcfbe-dnxLbXEeA";

    // ファイルの作成
    const folder = DriveApp.getFolderById(folderId);
    folder.createFile(fileName, jsonStr);
}

function DownloadJsonFileActiveSheet() {
    const activeSheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    ImportMasterDataSheetActive(activeSheet);
}

function DownloadJsonFileAllSheet() {
    const allSheets = SpreadsheetApp.getActiveSpreadsheet().getSheets();
    ImportMasterDataAllSheets(allSheets);
}

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
    const startRow = 3;
    const startCol = 1;
    const sheetNames = GetMasterDataAllSheetNames();

    // 基本ゲームデータマスタデータ系
    const baseGameDataGroup: any[] = [];
    // 金魚マスタデータ系
    const kingyo: any[] = [];
    let inKingyoDataGroup: any;
    // 確率マスタデータ系
    const probability: any[] = [];
    let inProbabilityDataGroup: any;
    // 得点マスタデータ系
    const score: any[] = [];
    let inScoreDataGroup: any;
    // ポイゲージ関連マスタデータ系
    const poiGauge: any[] = [];
    let inPoiGaugeDataGroup: any;
    // 祭りタイムマスタデータ系
    const festival: any[] = [];
    let inFestivalDataGroup: any;
    // ギフト関連マスタデータ系
    const gift: any[] = [];
    let inGiftDataGroup: any;

    // 金魚すくいゲームマスターデータの呼び出し
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < googleSheet.length; ++i) {
        const lastRow = googleSheet[i].getLastRow();
        const lastCol = googleSheet[i].getLastColumn();
        const sheetData = googleSheet[i].getSheetValues(startRow, startCol, lastRow, lastCol);

        // 基本ゲームデータマスタデータシート
        if (googleSheet[i].getSheetName() === sheetNames[0]) {
            for (let sheetDataCount = 1; sheetDataCount <= (lastRow - startRow); ++sheetDataCount) {
                baseGameDataGroup[sheetDataCount - 1] = {
                    base_game_data_id: sheetData[sheetDataCount][0],
                    play_time: sheetData[sheetDataCount][1],
                    // tslint:disable-next-line:object-literal-sort-keys
                    fever_time: sheetData[sheetDataCount][2],
                };
            }
        }
        // 金魚マスタデータシート
        if (googleSheet[i].getSheetName() === sheetNames[1]) {
            for (let sheetDataCount = 1; sheetDataCount <= (lastRow - startRow); ++sheetDataCount) {
                inKingyoDataGroup = {
                    kingyo_id: sheetData[sheetDataCount][0],
                    probability_id: sheetData[sheetDataCount][2],
                    score_id: sheetData[sheetDataCount][3],
                };
                kingyo[sheetDataCount - 1] = inKingyoDataGroup;
            }
        }
        // 確率マスタデータシート
        if (googleSheet[i].getSheetName() === sheetNames[2]) {
            for (let sheetDataCount = 1; sheetDataCount <= (lastRow - startRow); ++sheetDataCount) {
                inProbabilityDataGroup = {
                    probability_id: sheetData[sheetDataCount][0],
                    // tslint:disable-next-line:object-literal-sort-keys
                    kingyo_id: sheetData[sheetDataCount][1],
                    occurrence_probability: sheetData[sheetDataCount][2],
                };
                probability[sheetDataCount - 1] = inProbabilityDataGroup;
            }
        }
        // 得点マスタデータシート
        if (googleSheet[i].getSheetName() === sheetNames[3]) {
            for (let sheetDataCount = 1; sheetDataCount <= (lastRow - startRow); ++sheetDataCount) {
                inScoreDataGroup = {
                    score_id: sheetData[sheetDataCount][0],
                    kingyo_id: sheetData[sheetDataCount][1],
                    score: sheetData[sheetDataCount][2],
                    festival_point: sheetData[sheetDataCount][3],
                };
                score[sheetDataCount - 1] = inScoreDataGroup;
            }
        }
        // ポイゲージマスタデータシート
        if (googleSheet[i].getSheetName() === sheetNames[4]) {
            for (let sheetDataCount = 1; sheetDataCount <= (lastRow - startRow); ++sheetDataCount) {
                inPoiGaugeDataGroup = {
                    poigauge_id: sheetData[sheetDataCount][0],
                    max_gauge_id: sheetData[sheetDataCount][1],
                    min_gauge_id: sheetData[sheetDataCount][2],
                    decrease_point: sheetData[sheetDataCount][3],
                };
                poiGauge[sheetDataCount - 1] = inPoiGaugeDataGroup;
            }
        }
        // 祭りタイムマスタデータシート
        if (googleSheet[i].getSheetName() === sheetNames[5]) {
            for (let sheetDataCount = 1; sheetDataCount <= (lastRow - startRow); ++sheetDataCount) {
                inFestivalDataGroup = {
                    festival_time_id: sheetData[sheetDataCount][0],
                    festival_time_count: sheetData[sheetDataCount][1],
                    up_to_wasshoi_count: sheetData[sheetDataCount][2],
                    in_wasshoi_festival_point: sheetData[sheetDataCount][3],
                    festival_coeff: sheetData[sheetDataCount][4],
                };
                festival[sheetDataCount - 1] = inFestivalDataGroup;
            }
        }
        // ギフトマスタデータシート
        if (googleSheet[i].getSheetName() === sheetNames[6]) {
            for (let sheetDataCount = 1; sheetDataCount <= (lastRow - startRow); ++sheetDataCount) {
                inGiftDataGroup = {
                    gift_point_id: sheetData[sheetDataCount][0],
                    gift_name: sheetData[sheetDataCount][1],
                    festival_point: sheetData[sheetDataCount][2],
                };
                gift[sheetDataCount - 1] = inGiftDataGroup;
            }
        }
    }
    const result = {base_game_data: baseGameDataGroup, kingyo, probability, score, poiGauge, festival, gift};
    Browser.msgBox(JSON.stringify(result));
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

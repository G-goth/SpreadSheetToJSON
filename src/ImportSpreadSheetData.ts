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
    // Browser.msgBox(JSON.stringify(result));
    MakeJsonFile(JSON.stringify(result));
}
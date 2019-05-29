// 受け取った文字列をJSONファイルを作る
function MakeJsonFile(jsonStr: string) {
    /*const contentType = "text/plain";
    const charSet = "UTF-8";
    const lineDelimiter = ",";
    const newLineChar = "\n";*/
    const fileName = "GoldFishCaptureMasterData.json";　// 任意のjsonのファイル名を記入
    const folderId = "1pbBwWgWKsEZde6q75q1jQI4kK1FX9pQx";

    // 既に同名のファイルがある場合は削除する
    const folder = DriveApp.getFolderById(folderId);
    if (folder.getFilesByName(fileName).hasNext()) {
        const opt = Browser.msgBox("既にマスタデータファイルがあります。生成してもよろしいですか？", Browser.Buttons.OK_CANCEL);
        if (opt === "ok") {
            // ファイルの削除
            const jsonFile = folder.getFilesByName(fileName).next();
            folder.removeFile(jsonFile);
            // ファイルの作成
            folder.createFile(fileName, jsonStr);
            GenerateFilesLink(folderId);
        } else {
            Browser.msgBox("ファイルの生成を取りやめました。");
        }
    } else {
        // ファイルの新規作成
        folder.createFile(fileName, jsonStr);
        GenerateFilesLink(folderId);
    }
}

// 受け取った文字列をJSONファイルを作る(すべて)
function MakeJsonFileSequentially(jsonStr: any, fileName: string) {
    /*const contentType = "text/plain";
    const charSet = "UTF-8";
    const lineDelimiter = ",";
    const newLineChar = "\n";*/
    const fullFileName = fileName + ".json";
    const folderId = "1pbBwWgWKsEZde6q75q1jQI4kK1FX9pQx";

    // 既に同名のファイルがある場合は削除する
    const folder = DriveApp.getFolderById(folderId);
    if (folder.getFilesByName(fullFileName).hasNext()) {
        // ファイルの削除
        const jsonFile = folder.getFilesByName(fullFileName).next();
        folder.removeFile(jsonFile);
        // ファイルの作成
        folder.createFile(fullFileName, jsonStr);
    } else {
        // ファイルの新規作成
        folder.createFile(fullFileName, jsonStr);
    }
    GenerateFilesLink(folderId);
}

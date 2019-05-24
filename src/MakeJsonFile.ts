// 受け取った文字列をJSONファイルを作る
function MakeJsonFile(jsonStr: any) {
    const contentType = "text/plain";
    const charSet = "UTF-8";
    const lineDelimiter = ",";
    const newLineChar = "\n";
    const fileName = "GoldFishCaptureMasterData.json";　// 任意のjsonのファイル名を記入
    const folderId = "1D0s0eM3jDNW6NRyk3Qcfbe-dnxLbXEeA";

    // 既に同盟のファイルがある場合は削除する
    const folder = DriveApp.getFolderById(folderId);
    if (folder.getFilesByName(fileName).hasNext()) {
        let opt = Browser.msgBox("既にマスタデータファイルがあります。生成してもよろしいですか？", Browser.Buttons.OK_CANCEL);
        if (opt === "ok") {
            // ファイルの削除
            let jsonFile = folder.getFilesByName(fileName).next();
            folder.removeFile(jsonFile);
            // ファイルの作成
            folder.createFile(fileName, jsonStr);
        }
        else {
            Browser.msgBox("ファイルの生成を取りやめました。");
        }
    }
    else {
        // ファイルの新規作成
        folder.createFile(fileName, jsonStr);
    }
}
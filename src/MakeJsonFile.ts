// 受け取った文字列をJSONファイルを作る
class MakeJsonFiles {
    private fileName: string = "GoldFishCaptureMasterData.json";　// 任意のjsonのファイル名を記入
    private folderId: string = "1pbBwWgWKsEZde6q75q1jQI4kK1FX9pQx";
    private folder: GoogleAppsScript.Drive.Folder = DriveApp.getFolderById(this.folderId);
    public MakeJsonFile(jsonStr: string): void {
        /*const fileName: string = "GoldFishCaptureMasterData.json";　// 任意のjsonのファイル名を記入
        const folderId: string = "1pbBwWgWKsEZde6q75q1jQI4kK1FX9pQx";
        const folder: GoogleAppsScript.Drive.Folder = DriveApp.getFolderById(folderId);*/
        
        if (this.folder.getFilesByName(this.fileName).hasNext()) {
            // 同名ファイルがあった場合は削除
            this.MakeNewJsonFile(jsonStr);
        }
        else {
            // ファイルの新規作成
            this.folder.createFile(this.fileName, jsonStr);
            GenerateFilesLink(this.folderId);
        }
    }

    private MakeNewJsonFile(jsonStr: string): void {
        const opt = Browser.msgBox("", Browser.Buttons.OK_CANCEL);
        if (opt === "ok") {
            // ファイルの削除
            const jsonFile = this.folder.getFilesByName(this.fileName).next();
            this.folder.removeFile(jsonFile);
            // ファイルの作成
            this.folder.createFile(this.fileName, jsonStr);
            GenerateFilesLink(this.folderId);
        }
        else {
            Browser.msgBox("ファイルの生成を取りやめました。");
        }
    }
}

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
        }
        else {
            Browser.msgBox("ファイルの生成を取りやめました。");
        }
    }
    else {
        // ファイルの新規作成
        folder.createFile(fileName, jsonStr);
        GenerateFilesLink(folderId);
    }
}

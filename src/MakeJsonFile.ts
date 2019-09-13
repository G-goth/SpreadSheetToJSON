// 受け取った文字列をJSONファイルを作る
class MakeJsonFiles {
    // private allInFileName: string = "GoldFishCaptureMasterData.json";　// 任意のjsonのファイル名を記入
    private allInFileName: string = "Test.json";　// 任意のjsonのファイル名を記入
    private activeInFileName: string = "ActiveGoldFishCaptureMasterData.json";　// 任意のjsonのファイル名を記入
    private folderId: string = "1pbBwWgWKsEZde6q75q1jQI4kK1FX9pQx";
    private myFolderId: string = "u/0/my-drive";
    private folder: GoogleAppsScript.Drive.Folder = DriveApp.getFolderById(this.folderId);
    private myFolder: GoogleAppsScript.Drive.Folder = DriveApp.getFolderById(this.myFolderId);

    public MakeJsonFile(jsonStr: string): void {
        const addUi: FileTrasporter = new FileTrasporter(this.folderId);

        if (this.folder.getFilesByName(this.allInFileName).hasNext()) {
            // 同名ファイルがあった場合は削除
            this.MakeNewJsonFile(jsonStr);
        }
        else {
            // ファイルの新規作成
            this.folder.createFile(this.allInFileName, jsonStr);
            addUi.GeneretaFolderPathLink();
        }
    }
    public MakeActiveJsonFile(jsonStr: string): void {
        const addUi: FileTrasporter = new FileTrasporter(this.folderId);

        if (this.folder.getFilesByName(this.activeInFileName).hasNext()) {
            // 同名ファイルがあった場合は削除
            this.MakeNewJsonFile(jsonStr);
        }
        else {
            // ファイルの新規作成
            this.folder.createFile(this.activeInFileName, jsonStr);
            addUi.GeneretaFolderPathLink();
        }
    }

    private MakeNewJsonFile(jsonStr: string): void {
        const addUi: FileTrasporter = new FileTrasporter(this.folderId);
        const opt = Browser.msgBox("同名のマスタデータファイルが既にあります。上書き保存しますか？", Browser.Buttons.OK_CANCEL);
        if (opt === "ok") {
            // ファイルの削除
            const jsonFile = this.folder.getFilesByName(this.allInFileName).next();
            this.folder.removeFile(jsonFile);
            // ファイルの作成
            this.folder.createFile(this.allInFileName, jsonStr);
            addUi.GeneretaFolderPathLink();
        }
        else {
            Browser.msgBox("ファイルの生成を取りやめました。");
        }
    }
}

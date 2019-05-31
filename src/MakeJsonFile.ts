// 受け取った文字列をJSONファイルを作る
class MakeJsonFiles {
    private fileName: string = "GoldFishCaptureMasterData.json";　// 任意のjsonのファイル名を記入
    private folderId: string = "1pbBwWgWKsEZde6q75q1jQI4kK1FX9pQx";
    private folder: GoogleAppsScript.Drive.Folder = DriveApp.getFolderById(this.folderId);

    public MakeJsonFile(jsonStr: string): void {
        const addUi: FileTrasporter = new FileTrasporter(this.folderId);

        if (this.folder.getFilesByName(this.fileName).hasNext()) {
            // 同名ファイルがあった場合は削除
            this.MakeNewJsonFile(jsonStr);
        }
        else {
            // ファイルの新規作成
            this.folder.createFile(this.fileName, jsonStr);
            addUi.GeneretaFolderPathLink();
        }
    }

    private MakeNewJsonFile(jsonStr: string): void {
        const addUi: FileTrasporter = new FileTrasporter(this.folderId);
        const opt = Browser.msgBox("同名のマスタデータファイルが既にあります。上書き保存しますか？", Browser.Buttons.OK_CANCEL);
        if (opt === "ok") {
            // ファイルの削除
            const jsonFile = this.folder.getFilesByName(this.fileName).next();
            this.folder.removeFile(jsonFile);
            // ファイルの作成
            this.folder.createFile(this.fileName, jsonStr);
            addUi.GeneretaFolderPathLink();
        }
        else {
            Browser.msgBox("ファイルの生成を取りやめました。");
        }
    }
}

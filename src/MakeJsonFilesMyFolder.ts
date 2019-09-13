// 受け取った文字列をJSONファイルを作る
class MakeJsonFilesMyFolder {
    private allInFileName: string = "Test.json";　// 任意のjsonのファイル名を記入
    private myFolderId: string = "u/0/my-drive";
    private myFolder: GoogleAppsScript.Drive.Folder = DriveApp.getFolderById(this.myFolderId);

    public MakeJsonFileMyFolder(jsonStr: string): void {
        const addUi: FileTrasporter = new FileTrasporter(this.myFolderId);

        if (this.myFolder.getFilesByName(this.allInFileName).hasNext()) {
            // 同名ファイルがあった場合は削除
            this.MakeNewJsonFileMyFolder(jsonStr);
        }
        else {
            // ファイルの新規作成
            this.myFolder.createFile(this.allInFileName, jsonStr);
            addUi.GeneretaFolderPathLink();
        }
    }
    private MakeNewJsonFileMyFolder(jsonStr: string): void {
        const addUi: FileTrasporter = new FileTrasporter(this.myFolderId);
        const opt = Browser.msgBox("同名のマスタデータファイルが既にあります。上書き保存しますか？", Browser.Buttons.OK_CANCEL);
        if (opt === "ok") {
            // ファイルの削除
            const jsonFile = this.myFolder.getFilesByName(this.allInFileName).next();
            this.myFolder.removeFile(jsonFile);
            // ファイルの作成
            this.myFolder.createFile(this.allInFileName, jsonStr);
            addUi.GeneretaFolderPathLink();
        }
        else {
            Browser.msgBox("ファイルの生成を取りやめました。");
        }
    }
}
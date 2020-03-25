import {ExError} from "../utility/exError";
import GoogleForm = GoogleAppsScript.Forms.Form;
import GoogleSpreadSheet = GoogleAppsScript.Spreadsheet.Spreadsheet;
import DriveFolder = GoogleAppsScript.Drive.Folder;
import DriveFile = GoogleAppsScript.Drive.File;
import {ExString} from "../utility/exString";
import File = GoogleAppsScript.Drive.File;
import {ExIO} from "../utility/exIO";

/**
 * GoogleDrive extension class.
 */
export class ExGoogleDrive {

    /**
     * Creates GoogleSpreadSheet on GoogleDrive.
     * @param {string} spreadSheetName
     * @param {string} driveFolderId
     * @returns {GoogleSpreadSheet}
     */
    public static createSpreadSheet(spreadSheetName: string, driveFolderId: string): GoogleSpreadSheet {
        let spreadsheet: GoogleSpreadSheet = SpreadsheetApp.create(spreadSheetName);
        this.addFile(spreadsheet.getId(), driveFolderId);
        return spreadsheet;
    }

    /**
     * Creates GoogleForm on GoogleDrive.
     * @param {string} formTitle
     * @param {string} driveFolderId
     * @returns {GoogleForm}
     */
    public static createForm(formTitle: string, driveFolderId: string): GoogleForm {
        let form: GoogleForm = FormApp.create(formTitle);
        this.addFile(form.getId(), driveFolderId);
        return form;
    }

    /**
     * Creates file.
     * @param {string} driveFolderId
     * @param {string} fileName
     * @param {string} content
     * @returns {File}
     */
    public static createFile(googleDriveFolderId: string, fileName: string, content: string): File {
        ExError.throwIfNull(googleDriveFolderId);
        ExError.throwIfNull(fileName);
        ExError.throwIfNull(content);
        if (ExIO.hasNotExtension(fileName)) {
            new Error("fileName parameter has not extension.")
        }
        return DriveApp.getFolderById(googleDriveFolderId).createFile(fileName, content);
    }

    /**
     * Deletes all files in folder.
     * @param {string} googleDriveFolderId
     */
    public static deleteAllFilesByDriveFolderId(googleDriveFolderId: string): void {
        let folder: GoogleAppsScript.Drive.Folder = DriveApp.getFolderById(googleDriveFolderId);
        ExError.throwIfNullOrUndefined(folder);
        let files: GoogleAppsScript.Drive.FileIterator = folder.getFiles();
        while (files.hasNext()) {
            const file = files.next();
            DriveApp.removeFile(file);
            folder.removeFile(file);
        }
    }

    /**
     * Copies file to Google Drive folder.
     * @param {string} sourceFileId
     * @param {string} destinationFolderId
     * @param {string} newFileName
     * @returns {GoogleAppsScript.Drive.File}
     */
    public static copy(sourceFileId: string, destinationFolderId: string, newFileName: string): File {
        const sourceFile = DriveApp.getFileById(sourceFileId);
        const destinationFolder = DriveApp.getFolderById(destinationFolderId);
        return sourceFile.makeCopy(newFileName, destinationFolder);
    }

    /**
     * Creates drive file on GoogleDrive.
     * @param {string} driveFileId
     * @param {string} driveFolderId
     */
    private static addFile(driveFileId: string, driveFolderId: string): void {
        if (ExString.isNullOrEmpty(driveFileId) || ExString.isNullOrEmpty(driveFolderId)) {
            ExError.throwIfNull("driveFileId or driveFolderId is null or empty.");
        }

        let driveFile: DriveFile = DriveApp.getFileById(driveFileId);
        ExError.throwIfNullOrUndefined(driveFile);
        let driveFolder: DriveFolder = DriveApp.getFolderById(driveFolderId);
        ExError.throwIfNullOrUndefined(driveFolder);
        driveFolder.addFile(driveFile);
        DriveApp.getRootFolder().removeFile(driveFile);
    }
}
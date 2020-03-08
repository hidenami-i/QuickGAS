import {ExError} from "../utility/exError";
import GoogleForm = GoogleAppsScript.Forms.Form;
import GoogleSpreadSheet = GoogleAppsScript.Spreadsheet.Spreadsheet;
import DriveFolder = GoogleAppsScript.Drive.Folder;
import DriveFile = GoogleAppsScript.Drive.File;
import {ExString} from "../utility/exString";

/**
 * GoogleDrive extension class.
 */
export class ExGoogleDrive {

    /**
     * Creates GoogleSpreadSheet on GoogleDrive.
     * @param {string} spreadSheetName
     * @param {string} driveFolderId
     */
    public static createSpreadSheet(spreadSheetName: string, driveFolderId: string): GoogleSpreadSheet {
        let spreadsheet: GoogleSpreadSheet = SpreadsheetApp.create(spreadSheetName);
        this.create(spreadsheet.getId(), driveFolderId);
        return spreadsheet;
    }

    /**
     * Creates GoogleForm on GoogleDrive.
     * @param {string} formTitle
     * @param {string} driveFolderId
     */
    public static createForm(formTitle: string, driveFolderId: string): GoogleForm {
        let form: GoogleForm = FormApp.create(formTitle);
        this.create(form.getId(), driveFolderId);
        return form;
    }

    /**
     * Deletes all files in folder.
     * @param {string} googleDriveFolderId
     */
    public static deleteAllFilesByDriveFolderId(googleDriveFolderId: string): void {
        let folder: GoogleAppsScript.Drive.Folder = DriveApp.getFolderById(googleDriveFolderId);
        ExError.throwIfNullOrUndefined(folder);
        let files: GoogleAppsScript.Drive.FileIterator = folder.getFiles();
        while (files.hasNext) {
            const file = files.next();
            DriveApp.removeFile(file);
            folder.removeFile(file);
        }
    }

    /**
     * Creates drive file on GoogleDrive.
     * @param {string} driveFileId
     * @param {string} driveFolderId
     */
    private static create(driveFileId: string, driveFolderId: string) {
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
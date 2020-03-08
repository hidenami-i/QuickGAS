import {ExError} from "../utility/exError";
import SpreadSheet = GoogleAppsScript.Spreadsheet.Spreadsheet;
import Form = GoogleAppsScript.Forms.Form;

/**
 * GoogleDrive extension class.
 */
export class ExGoogleDrive {

    /**
     * Creates GoogleSpreadSheet on GoogleDrive.
     * @param {string} spreadSheetName
     * @param {string} driveFolderId
     */
    public static createSpreadSheet(spreadSheetName: string, driveFolderId: string): SpreadSheet {
        let driveFile = Drive.Files?.insert({
            'title': spreadSheetName,
            'mimeType': DriveMimeType.SpreadSheet,
            'parents': [{'id': driveFolderId}]
        });

        ExError.throwIfUndefined(driveFile);
        ExError.throwIfUndefined(driveFile?.id);
        let spreadSheetId = driveFile?.id || "";

        return SpreadsheetApp.openById(spreadSheetId);
    }

    /**
     * Creates GoogleForm on GoogleDrive.
     * @param {string} formTitle
     * @param {string} driveFolderId
     */
    public static createForm(formTitle: string, driveFolderId: string): Form {
        let form = FormApp.create(formTitle);
        let formFile = DriveApp.getFileById(form.getId());
        let driveFolder = DriveApp.getFolderById(driveFolderId);
        driveFolder.addFile(formFile);
        DriveApp.getRootFolder().removeFile(formFile);

        // ExError.throwIfUndefined(driveFile);
        // ExError.throwIfUndefined(driveFile?.id);
        // let formId = driveFile?.id || "";

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

}
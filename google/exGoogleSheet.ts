import Spreadsheet = GoogleAppsScript.Spreadsheet.Spreadsheet;
import Sheet = GoogleAppsScript.Spreadsheet.Sheet;
import {ExString} from "../utility/exString";
import {UI} from "../spreadSheet/ui";

/**
 * Google Sheet Extension class.
 *
 * TODO
 * 1. sort sheet
 * 2. row height pretty
 * 3. column width pretty
 * 4. alignment
 */
export class ExGoogleSheet {

    /**
     * Gets spread sheet by spread sheet id.
     * current active spreadSheet if targetSpreadSheetId parameter is null; otherwise target SpreadSheet.
     * @param {string} targetSpreadSheetId
     * @returns {Spreadsheet} GoogleAppsScript.Spreadsheet.Spreadsheet
     */
    public static getSpreadSheetById(targetSpreadSheetId: string = ""): Spreadsheet {
        if (ExString.isNullOrEmpty(targetSpreadSheetId)) {
            return SpreadsheetApp.getActiveSpreadsheet();
        } else {
            return SpreadsheetApp.openById(targetSpreadSheetId);
        }
    }

    /**
     * Gets spread sheet by spread sheet url.
     * current active spreadSheet if targetSpreadSheetUrl parameter is null; otherwise target SpreadSheet.
     * @param {string} targetSpreadSheetUrl
     * @returns {Spreadsheet} GoogleAppsScript.Spreadsheet.Spreadsheet
     */
    public static getSpreadSheetByUrl(targetSpreadSheetUrl: string = ""): Spreadsheet {
        if (ExString.isNullOrEmpty(targetSpreadSheetUrl)) {
            return SpreadsheetApp.getActiveSpreadsheet();
        } else {
            return SpreadsheetApp.openByUrl(targetSpreadSheetUrl);
        }
    }

    /**
     * Copy target sheet to target SpreadSheet.
     * @param {Sheet} targetSheet
     * @param {Spreadsheet} targetSpreadSheet
     * @param {string} newSheetName target sheet name if newSheetName parameter is null or empty, otherwise new sheet name.
     */
    public static copyTo(targetSheet: Sheet, targetSpreadSheet: Spreadsheet, newSheetName: string = "") {
        let sheet = targetSheet.copyTo(targetSpreadSheet);
        if (ExString.isNotNullOrEmpty(newSheetName)) {
            sheet.setName(newSheetName);
        }
    }

    /**
     * Creates sheet url.
     * @param {string} spreadSheetId
     * @param {Sheet} sheet
     */
    public static createSheetUrl(spreadSheetId: string, sheet: Sheet): string {
        return "https://docs.google.com/spreadsheets/d/" + spreadSheetId + "/edit#gid=" + sheet.getSheetId();
    }

    /**
     * Deletes sheet by sheet name.
     * @param {string} sheetName
     */
    public static deleteSheetBySheetName(sheetName: string): void {
        if (UI.OkCancel("Confirm delete sheet", `Do you sure want to delete ${sheetName} sheet`)) {
            return;
        }

        const spreadSheet = SpreadsheetApp.getActiveSpreadsheet();
        const sheets = spreadSheet.getSheets();
        sheets.forEach(sheet => {
            const sheetName = sheet.getName();
            if (sheetName != sheetName) {
                return;
            }
            spreadSheet.deleteSheet(sheet);
        })
    }

    /**
     * Deletes sheets.
     * @param {string} regexp
     */
    public static deleteSheets(regexp: string): void {
        if (UI.OkCancel("Confirm delete sheets", "Do you sure want to delete sheets")) {
            return;
        }

        const spreadSheet = SpreadsheetApp.getActiveSpreadsheet();
        const sheets = spreadSheet.getSheets();
        sheets.forEach(sheet => {
            const sheetName = sheet.getName();
            if (!sheetName.match(regexp)) {
                return;
            }
            spreadSheet.deleteSheet(sheet);
        })
    }
}
import Spreadsheet = GoogleAppsScript.Spreadsheet.Spreadsheet;
import Sheet = GoogleAppsScript.Spreadsheet.Sheet;
import Range = GoogleAppsScript.Spreadsheet.Range;
import { ExString } from "../utility/exString";

/**
 * Google Sheet Extension class.
 * 
 * TODO
 * 1. sort sheet
 * 2. row height pretty
 * 3. column widht pretty
 * 4. alignment
 */
export class ExGoogleSheet {
    
    /**
     * Gets spread sheet by spread sheet id.
     * current active spreadSheet if targetSpreadSheetId parameter is null; otherwise target SpreadSheet.
     * @param {string} targetSpreadSheetId
     * @returns {Spreadsheet} GoogleAppsScript.Spreadsheet.Spreadsheet
     */
    public static GetSpreadSheetById(targetSpreadSheetId: string = ""): Spreadsheet {
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
    public static GetSpreadSheetByUrl(targetSpreadSheetUrl: string = ""): Spreadsheet {
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
    public static CopyTo(targetSheet: Sheet, targetSpreadSheet: Spreadsheet, newSheetName: string = "") {
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
}
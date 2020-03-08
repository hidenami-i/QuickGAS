import { RepositoryBase } from "../quick-repository/repositoryBase";
import { SheetEntity } from "./sheetEntity";
import { ExString } from "../utility/exString";
import { ExError } from "../utility/exError";

/**
 * Sheet Entity Repository.
 */
export class SheetRepository extends RepositoryBase<SheetEntity> {

    /**
     * cache spread sheet.
     */
    spreadSheet: GoogleAppsScript.Spreadsheet.Spreadsheet;

    /**
     * Initialize target spread sheet.
     * @param {SheetEntity} spreadSheet
     * @param {string} sheetName
     */
    constructor(spreadSheet: GoogleAppsScript.Spreadsheet.Spreadsheet, targetSheetName: string = "") {
        super();

        this.spreadSheet = spreadSheet;

        if (ExString.isNullOrEmpty(targetSheetName)) {
            const sheets = this.spreadSheet.getSheets();
            sheets.forEach((v, i) => this.insert(new SheetEntity(i, v)));
            return;
        }

        const sheet = this.spreadSheet.getSheetByName(targetSheetName);
        if (sheet == null) {
            throw new Error(`can not find [${targetSheetName}] sheet.`);
        }

        this.insert(new SheetEntity(0, sheet));
    }

    /**
     * unused method.
     */
    public insertAll(values: Array<{ [key: string]: any }>): void {
        ExError.throwNotImplemented();
    }

    /**
     * Finds sheet by sheet name.
     * @param {string} sheetName
     * @param {SheetEntity} out SheetEntity
     */
    public tryFindBySheetName(sheetName: string, out: (entity: SheetEntity) => void): void {
        let result: SheetEntity | undefined;
        this.entities.forEach(x => {
            if (x.sheet.getSheetName() === sheetName) {
                result = x;
                return;
            }
        });

        if (result == undefined) {
            Logger.log(`can not find [${sheetName}] sheet.`)
            return;
        }

        out(result);
    }

    /**
     * Finds sheet by sheet name.
     * @param {string} str partial match sheet name.
     * @param {SheetEntity} out
     */
    public tryFindMatchSheetName(str: string, out: (entity: SheetEntity) => void): void {
        let result: SheetEntity | undefined;
        this.entities.forEach(x => {
            if (x.sheet.getSheetName().match(str)) {
                result = x;
                return;
            }
        });

        if (result == undefined) {
            Logger.log(`No sheets with names containing ${str} were found.`)
            return;
        }

        out(result);
    }
}
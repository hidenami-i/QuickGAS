import {RepositoryBase} from "../quick-repository/repositoryBase";
import {SheetEntity} from "./sheetEntity";
import {ExString} from "../utility/exString";
import {ExError} from "../utility/exError";
import {UI} from "./ui";
import Sheet = GoogleAppsScript.Spreadsheet.Sheet;

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
     * All sheet initialize if targetSheetName parameter is null or empty, otherwise targetSheet initialize.
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
     * Gets SheetEntity by sheet name.
     * @param {string} sheetName
     * @returns {SheetEntity}
     */
    public getBySheetName(sheetName: string): SheetEntity {
        let result: SheetEntity | undefined;
        this.tryFindBySheetName(sheetName, entity => {
            result = entity;
        });
        ExError.throwIfUndefined(result);

        // @ts-ignore
        return result;
    }

    /**
     * Gets SheetEntity match sheet name.
     * @param {string} regexp
     * @returns {SheetEntity}
     */
    public getMatchSheetName(regexp: string): SheetEntity {
        let result: SheetEntity | undefined;
        this.tryFindMatchSheetName(regexp, entity => {
            result = entity;
        });
        ExError.throwIfUndefined(result);

        // @ts-ignore
        return result;
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
     * @param {string} regexp partial match sheet name.
     * @param {SheetEntity} out
     */
    public tryFindMatchSheetName(regexp: string, out: (entity: SheetEntity) => void): void {
        let result: SheetEntity | undefined;
        this.entities.forEach(x => {
            if (x.sheet.getSheetName().match(regexp)) {
                result = x;
                return;
            }
        });

        if (result == undefined) {
            Logger.log(`No sheets with names containing ${regexp} were found.`)
            return;
        }

        out(result);
    }

    /**
     * Sets active sheet by sheet name.
     * @param {string} sheetName
     * @returns {SheetEntity}
     */
    public setActiveSheetBySheetName(sheetName: string): SheetEntity {
        let sheetEntity: SheetEntity | undefined = undefined;
        this.tryFindBySheetName(sheetName, entity => {
            this.spreadSheet.setActiveSheet(entity.sheet);
            sheetEntity = entity;
        });

        ExError.throwIfUndefined(sheetEntity);
        // @ts-ignore
        return sheetEntity;
    }

    /**
     * Sets active sheet by sheet name.
     * @param {string} regexp
     * @returns {SheetEntity}
     */
    public setActiveSheetByMatchSheetName(regexp: string): SheetEntity {
        let sheetEntity: SheetEntity | undefined = undefined;
        this.tryFindMatchSheetName(regexp, entity => {
            this.spreadSheet.setActiveSheet(entity.sheet);
            sheetEntity = entity;
        });

        ExError.throwIfUndefined(sheetEntity);
        // @ts-ignore
        return sheetEntity;
    }

    /**
     * Duplicates active sheet.
     * @param {string} targetSheetName
     * @param {string} newSheetName
     * @returns {SheetEntity} duplicate sheet entity.
     */
    public duplicateSheet(targetSheetName: string, newSheetName: string): SheetEntity {
        this.setActiveSheetBySheetName(targetSheetName);
        const sheet: Sheet = this.spreadSheet.duplicateActiveSheet();
        sheet.setName(newSheetName);
        const sheetEntity: SheetEntity = new SheetEntity(this.count() + 1, sheet);
        this.insert(sheetEntity);
        return sheetEntity;
    }

    /**
     * Deletes sheet by sheet name.
     * @param {string} sheetName
     */
    public deleteSheetBySheetName(sheetName: string): void {
        if (UI.OkCancel("Confirm delete sheet", `Do you sure want to delete ${sheetName} sheet`)) {
            return;
        }

        this.tryFindBySheetName(sheetName, entity => this.spreadSheet.deleteSheet(entity.sheet));
    }

    /**
     * Deletes sheets.
     * @param {string} regexp
     */
    public deleteSheets(regexp: string): void {
        if (UI.OkCancel("Confirm delete sheets", "Do you sure want to delete sheets")) {
            return;
        }

        this.findAll().filter(x => x.sheetName.match(regexp)).forEach(x => this.spreadSheet.deleteSheet(x.sheet));
    }
}
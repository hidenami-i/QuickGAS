import {EntityBase} from "../quick-repository/entityBase";
import {ExString} from "../utility/exString";
import {ExArray} from "../utility/exArray";
import {ExMath} from "../utility/exMath";
import {ExError} from "../utility/exError";
import Sheet = GoogleAppsScript.Spreadsheet.Sheet;
import Range = GoogleAppsScript.Spreadsheet.Range;
import Integer = GoogleAppsScript.Integer;

/**
 * Entity class for each sheet.
 */
export class SheetEntity extends EntityBase {

    /**
     * GoogleAppsScript.Spreadsheet. Sheet cache.
     */
    readonly sheet: Sheet;

    /**
     * GoogleAppsScript.Spreadsheet. Range cache.
     */
    readonly dataRange: Range;

    /**
     * valid values.
     */
    readonly values: Array<Array<any>>;

    /**
     * sheet name.
     */
    readonly sheetName: string;

    /**
     * sheet id.
     */
    readonly sheetId: Integer;

    /**
     * valid transpose values.
     */
    private transposeValues: Array<Array<any>>;

    /**
     * constructor
     * @param {number} id unique id
     * @param {GoogleAppsScript.Spreadsheet.Sheet} sheet target sheet
     */
    constructor(id: number, sheet: Sheet) {
        super(id);
        this.sheet = sheet;
        this.sheetName = sheet.getSheetName();
        this.sheetId = sheet.getSheetId();
        this.dataRange = sheet.getDataRange();
        this.values = this.dataRange.getValues();
        this.transposeValues = [];
    }

    /**
     * --------------------------------------------------------------------------------
     *
     * Range
     *
     * --------------------------------------------------------------------------------
     */

    /**
     * Gets all data range.
     * @returns {Range} all data range.
     */
    public getSafeRange(): Range;

    /**
     * Gets data range.
     * The specified value if parameters is positive number. otherwise 1.
     * @param {number} leftTopRow 1 ~
     * @param {number} leftTopColumn 1 ~
     * @returns {GoogleAppsScript.Spreadsheet.Range}
     */
    public getSafeRange(leftTopRow: number, leftTopColumn: number): Range;

    /**
     * Gets data range.
     * The specified value if parameters is positive number. otherwise 1.
     * @param {number} leftTopRow 1 ~
     * @param {number} leftTopColumn 1 ~
     * @param {number} height (number of rows) 1 ~
     * @returns {GoogleAppsScript.Spreadsheet.Range}
     */
    public getSafeRange(leftTopRow: number, leftTopColumn: number, height: number): Range;

    /**
     * Gets data range.
     * The specified value if parameters is positive number. otherwise 1.
     * @param {number} leftTopRow 1 ~
     * @param {number} leftTopColumn 1 ~
     * @param {number} height (number of rows) 1 ~
     * @param {number} width (number of columns) 1 ~
     * @returns {GoogleAppsScript.Spreadsheet.Range}
     */
    public getSafeRange(leftTopRow: number, leftTopColumn: number, height: number, width: number): Range;

    /**
     * Gets data range.
     * The specified value if parameters is positive number. otherwise 1.
     * @param {number} leftTopRow 1 ~
     * @param {number} leftTopColumn 1 ~
     * @param {number} height (number of rows) 1 ~
     * @param {number} width (number of columns) 1 ~
     * @returns {GoogleAppsScript.Spreadsheet.Range}
     */
    public getSafeRange(leftTopRow: number = 1, leftTopColumn: number = 1, height: number = 1, width: number = 1): Range {
        return this.sheet.getRange(Math.max(leftTopRow, 1), Math.max(leftTopColumn, 1), Math.max(height, 1), Math.max(width, 1));
    }

    /**
     * Gets data range.
     * The specified value if parameters is positive number. otherwise 1.
     * @param {number} leftTopRow 1 ~
     * @param {number} columnA1 1 ~
     * @param {number} height (number of rows) 1 ~
     * @param {number} width (number of columns) 1 ~
     * @returns {GoogleAppsScript.Spreadsheet.Range}
     */
    public getSafeRangeA1(leftTopRow: number, columnA1: string): Range;

    /**
     * Gets data range.
     * The specified value if parameters is positive number. otherwise 1.
     * @param {number} leftTopRow 1 ~
     * @param {number} columnA1 1 ~
     * @param {number} height (number of rows) 1 ~
     * @param {number} width (number of columns) 1 ~
     * @returns {GoogleAppsScript.Spreadsheet.Range}
     */
    public getSafeRangeA1(leftTopRow: number, columnA1: string, height: number): Range;

    /**
     * Gets data range.
     * The specified value if parameters is positive number. otherwise 1.
     * @param {number} leftTopRow 1 ~
     * @param {number} columnA1 1 ~
     * @param {number} height (number of rows) 1 ~
     * @param {number} width (number of columns) 1 ~
     * @returns {GoogleAppsScript.Spreadsheet.Range}
     */
    public getSafeRangeA1(leftTopRow: number, columnA1: string, height: number, width: number): Range;

    /**
     * Gets data range.
     * The specified value if parameters is positive number. otherwise 1.
     * @param {number} leftTopRow 1 ~
     * @param {number} columnA1 1 ~
     * @param {number} height (number of rows) 1 ~
     * @param {number} width (number of columns) 1 ~
     * @returns {GoogleAppsScript.Spreadsheet.Range}
     */
    public getSafeRangeA1(leftTopRow: number, columnA1: string, height: number = 1, width: number = 1): Range {
        return this.sheet.getRange(Math.max(leftTopRow, 1), Math.max(ExString.convertLetterToNumber(columnA1), 1), Math.max(height, 1), Math.max(width, 1));
    }

    /**
     * Gets target row GoogleAppsScript.Spreadsheet.Range.
     * @param {number} targetRowIndex 1 ~
     * @param {number} startColumnIndex 1 ~
     * @returns {GoogleAppsScript.Spreadsheet.Range}
     */
    public getRowRange(targetRowIndex: number, startColumnIndex = 1): Range {
        const index = Math.max(targetRowIndex - 1, 0);
        const values = this.values[index];
        if (ExArray.isNullOrEmpty(values)) {
            ExError.throwIfNullOrUndefined(`[${index}] values is null or undefined.`);
        }
        return this.getSafeRange(targetRowIndex, 1, startColumnIndex, values.length);
    }

    /**
     * Gets target column GoogleAppsScript.Spreadsheet.Range.
     * @param {number} targetColumnIndex 1 ~
     * @param {number} startRowIndex 1 ~
     * @returns {GoogleAppsScript.Spreadsheet.Range}
     */
    public getColumnRange(targetColumnIndex: number, startRowIndex = 1): Range {
        const index = Math.max(targetColumnIndex - 1, 0);
        const values = this.getTransposeValues()[index];
        if (ExArray.isNullOrEmpty(values)) {
            ExError.throwIfNullOrUndefined(`[${index}] values is null or undefined.`);
        }
        return this.getSafeRange(targetColumnIndex, targetColumnIndex, values.length, 1);
    }

    /**
     * Gets target column GoogleAppsScript.Spreadsheet.Range.
     * @param {number} columnA1 A ~
     * @param {number} startRowIndex 1 ~
     * @returns {GoogleAppsScript.Spreadsheet.Range}
     */
    public getColumnRangeA1(columnA1: string, startRowIndex = 1): Range {
        return this.getSafeRange(startRowIndex, ExString.convertLetterToNumber(columnA1), this.getTransposeValues()[Math.max(ExString.convertLetterToNumber(columnA1) - 1, 0)].length, 1);
    }

    /**
     * Gets sheet value by row and column index.
     * @param {number} rowIndex cell row index 1 ~
     * @param {number} columnIndex cell column index 1 ~
     * @returns {any}
     * @example
     * let value = getValue(1, 1);
     */
    public getValue(rowIndex: number, columnIndex: number): any {
        return this.values[Math.max(rowIndex - 1, 0)][Math.max(columnIndex - 1, 0)];
    }

    /**
     * Gets sheet value by row and column alphabet.
     * @param {number} rowIndex cell row index 1 ~
     * @param {string} columnA1 cell column index A ~
     * @returns {any}
     * @example
     * let value = getValue(1, "A");
     */
    public getValueByA1(rowIndex: number, columnA1: string): any {
        return this.getValue(Math.max(rowIndex - 1, 0), Math.max(ExString.convertLetterToNumber(columnA1), 0));
    }

    /**
     * Gets transpose sheet values.
     * @param {boolean} clearCache
     * @returns {Array<Array<any>>}
     */
    public getTransposeValues(clearCache: boolean = false): Array<Array<any>> {
        if (ExArray.isNullOrEmpty(this.transposeValues) || clearCache) {
            this.transposeValues = ExMath.Transpose(this.values);
        }
        return this.transposeValues
    }

    /**
     * Gets column values.
     * @param {number} columnIndex 1 ~
     * @returns {Array<any>}
     */
    public getColumnValues(columnIndex: number): Array<any> {
        return this.getTransposeValues()[Math.max(columnIndex - 1, 0)];
    }

    /**
     * Gets column values.
     * @param {string} columnA1 A ~
     * @returns {Array<any>}
     */
    public getColumnValuesByA1(columnA1: string): Array<any> {
        return this.getColumnValues(Math.max(ExString.convertLetterToNumber(columnA1), 0));
    }

    /**
     * Gets row values by row index.
     * @param {number} rowIndex 1 ~
     * @returns {Array<any>}
     */
    public getRowValues(rowIndex: number): Array<any> {
        return this.values[Math.max(rowIndex - 1, 0)];
    }

    /**
     * Gets point by value.
     * @param {string | number | null | undefined} target target value
     * @returns {[number, number]} [rowIndex, columnIndex]
     */
    public getPointByValue(target: string | number | null | undefined): [number, number] {
        let result: [number, number] = [0, 0];

        end:
            for (let rowIndex = 0; rowIndex < this.values.length; rowIndex++) {
                let rowValues = this.values[rowIndex];
                for (let columnIndex = 0; columnIndex < rowValues.length; columnIndex++) {
                    let value = rowValues[columnIndex];
                    if (value === target) {

                        // normalize point
                        result = [rowIndex + 1, columnIndex + 1];
                        break end;
                    }
                }
            }

        return result;
    }

    /**
     * Sets value at left top point.
     * This function is much slower than "setValuesAtLeftTopPoint".
     * @param {number} rowIndex 1 ~
     * @param {string} columnIndex A ~
     * @param {any[][]} value any value
     * @returns {GoogleAppsScript.Spreadsheet.Range}
     * @example
     * let value = "a";
     * setValueAtPoint(1, 1, value);
     */
    public setValueAtPoint(rowIndex: number, columnIndex: number, value: any): Range {
        return this.getSafeRange(rowIndex, columnIndex).setValue(value);
    }

    /**
     * Sets value at left top point.
     * This function is much slower than "setValuesAtLeftTopPointA1".
     * @param {number} rowIndex 1 ~
     * @param {string} columnA1 A ~
     * @param {any[][]} value any value
     * @returns {GoogleAppsScript.Spreadsheet.Range}
     * @example
     * let value = "a";
     * setValueAtPointA1(1, "A", value);
     */
    public setValueAtPointA1(rowIndex: number, columnA1: string, value: any): Range {
        return this.getSafeRangeA1(rowIndex, columnA1).setValue(value);
    }

    /**
     * Sets values at left top point.
     * @param {number} leftTopRow start left top row index. 1 ~
     * @param {number} leftTopColumn start left top row index. 1 ~
     * @param {any[][]} values [[1, 0, "a"], [2, 1, "b"], [3, 2, "c"]]
     * @returns {GoogleAppsScript.Spreadsheet.Range}
     * @example
     * let values = [[1, 0, "a"], [2, 1, "b"], [3, 2, "c"]];
     * setValuesAtLeftTopPoint(1, 1, valeus);
     */
    public setValuesAtLeftTopPoint(leftTopRow: number, leftTopColumn: number, values: any[][]): Range {
        return this.getSafeRange(leftTopRow, leftTopColumn, values.length, values[0].length).setValues(values);
    }

    /**
     * Sets values at left top point.
     * @param {number} leftTopRow start left top row index. 1 ~
     * @param {string} leftTopColumnA1 start left top column A ~
     * @param {any[][]} values [[1, 0, "a"], [2, 1, "b"], [3, 2, "c"]]
     * @returns {GoogleAppsScript.Spreadsheet.Range}
     * @example
     * let values = [[1, 0, "a"], [2, 1, "b"], [3, 2, "c"]];
     * setValuesAtLeftTopPointA1(1, "A", valeus);
     */
    public setValuesAtLeftTopPointA1(leftTopRow: number, leftTopColumnA1: string, values: any[][]): Range {
        return this.getSafeRangeA1(leftTopRow, leftTopColumnA1, values.length, values[0].length).setValues(values);
    }

    /**
     * Sets vertical alignment.
     * @param {GoogleAppsScript.Spreadsheet.Range} range
     * @param {VerticalAlignments} alignments
     * @returns {GoogleAppsScript.Spreadsheet.Range}
     */
    public setVerticalAlignment(alignments: VerticalAlignments, range: Range): Range {
        return range.setVerticalAlignment(alignments);
    }

    /**
     * Sets vertical alignment.
     * @param {GoogleAppsScript.Spreadsheet.Range} range
     * @param {HorizontalAlignments} alignments
     * @returns {GoogleAppsScript.Spreadsheet.Range}
     */
    public setHorizontalAlignment(alignments: HorizontalAlignments, range: Range): Range {
        return range.setHorizontalAlignment(alignments);
    }

    /**
     * Sets auto resize all columns.
     * @returns {GoogleAppsScript.Spreadsheet.Sheet}
     */
    public setAutoResizeColumns(): Sheet;

    /**
     * Sets auto resize columns.
     * @param {number} startColumnIndex 1 ~
     * @param {number} width 1 ~
     * @returns {GoogleAppsScript.Spreadsheet.Sheet}
     */
    public setAutoResizeColumns(startColumnIndex: number = 0, width: number = 0): Sheet {
        if (startColumnIndex <= 0 && width <= 0) {
            startColumnIndex = 1;
            width = this.getNumberOfColumns();
        }
        return this.sheet.autoResizeColumns(startColumnIndex, width);
    }

    /**
     * Sets auto resize columns.
     * @param {string} startColumnA1 A ~
     * @param {number} width 1 ~
     * @returns {GoogleAppsScript.Spreadsheet.Sheet}
     */
    public setAutoResizeColumnsA1(startColumnA1: string, width: number): Sheet {
        return this.sheet.autoResizeColumns(Math.max(ExString.convertLetterToNumber(startColumnA1), 1), Math.max(width, 1));
    }

    /**
     * Sets auto resize all rows.
     * @returns {GoogleAppsScript.Spreadsheet.Sheet}
     */
    public setAutoResizeRows(): Sheet;

    /**
     * Sets auto resize rows.
     * @param {number} startRowIndex 1 ~
     * @param {number} height 1 ~
     * @returns {GoogleAppsScript.Spreadsheet.Sheet}
     */
    public setAutoResizeRows(startRowIndex: number = 0, height: number = 0): Sheet {
        if (startRowIndex <= 0 && height <= 0) {
            startRowIndex = 1;
            height = this.getNumberOfRows();
        }
        return this.sheet.autoResizeRows(startRowIndex, height);
    }

    /**
     * Sets all columns width.
     * @param {number} cellWidth
     * @param {number} startColumnIndex
     * @param {number} width
     * @returns {GoogleAppsScript.Spreadsheet.Sheet}
     */
    public setColumnsWidths(cellWidth: number, startColumnIndex: number = 1, width: number = 1): Sheet {
        if (startColumnIndex <= 0 && width <= 0) {
            startColumnIndex = 1;
            width = this.getNumberOfColumns();
        }
        return this.sheet.setColumnWidths(startColumnIndex, width, Math.max(cellWidth, 0));
    }

    /**
     * Sets all rows height.
     * @param {number} cellWidth
     * @returns {GoogleAppsScript.Spreadsheet.Sheet}
     */
    public setRowsHeights(cellHeight: number): Sheet;

    /**
     * Sets all rows height.
     * @param {number} cellWidth
     * @param {number} startColumnIndex
     * @param {number} width
     * @returns {GoogleAppsScript.Spreadsheet.Sheet}
     */
    public setRowsHeights(cellHeight: number, startRowIndex: number = 0, height: number = 0): Sheet {
        if (startRowIndex <= 0 && height <= 0) {
            startRowIndex = 1;
            height = this.getNumberOfColumns();
        }
        return this.sheet.setRowHeights(startRowIndex, height, Math.max(cellHeight, 0));
    }

    /**
     * Clear all cell content.
     * @param isClearCache true if
     */
    public clearAllContent(isClearCache = false) {
        this.sheet.getRange(1, 1, this.values.length, this.values[0].length).clearContent();
        if (isClearCache) {
            ExArray.clear(this.values);
        }
    }

    /**
     *
     * @param sheetName
     */
    public isEqualSheetName(sheetName: string): boolean {
        return this.sheet.getSheetName() == sheetName;
    }

    /**
     * Converts sheet values to map values.
     * [[id, name], [1, "a"]] → [{id=1, name="a"}]
     * @param headerRowIndex 1 ~
     * @param dataStartRowIndex 1 ~
     * @returns [{id=1, name="a"}]
     */
    public toMapValues(headerRowIndex: number, dataStartRowIndex: number): Array<any> {
        let headers = this.values[Math.max(headerRowIndex - 1, 0)];
        let slice = this.values.slice(Math.max(dataStartRowIndex - 1, 0));
        return ExArray.convertMultipleToMapArray(headers, slice);
    }

    /**
     * Gets number of rows.
     * @returns number of rows.
     */
    public getNumberOfRows(): number {
        if (ExArray.isNullOrEmpty(this.values)) {
            return 0;
        }

        return this.values.length;
    }

    /**
     * Gets number of columns.
     * @returns number of columns.
     */
    public getNumberOfColumns(): number {
        if (ExArray.isNullOrEmpty(this.values)) {
            return 0;
        }

        return this.values[0].length;
    }

    /**
     * Converts sheet values to json data.
     * @param replacer
     * @param space
     * @returns <example> [{"id":1},{"id":2}]
     */
    public toJson(replacer?: (this: any, key: string, value: any) => any, space?: string | number): string {
        return JSON.stringify(this.values, replacer, space);
    }

    /**
     * Converts sheet values to pretty print json data.
     * @param replacer
     */
    public toJsonAsPrettyPrint(replacer?: (this: any, key: string, value: any) => any): string {
        return JSON.stringify(this.values, replacer, "\t");
    }

    /**
     * Converts sheet values to json data as map format.
     * @param jsonKey
     * @param replacer
     * @param space
     * @returns <example> { "key" : [{"id" : 1}, {"id" : 2}] }
     * @summary
     * this function required runtimeVersion V8
     */
    public toJsonAsMap(jsonKey: string, replacer?: (this: any, key: string, value: any) => any, space?: string | number): string {
        const map = new Map<string, Array<any>>().set(jsonKey, this.values);
        return JSON.stringify(Object.fromEntries(map), replacer, space);
    }

    /**
     * Log all values.
     */
    public LogValues() {
        if (ExArray.isNullOrEmpty(this.values)) {
            return;
        }

        for (let rowIndex = 0; rowIndex < this.values.length; rowIndex++) {
            const rowValues = this.values[rowIndex];
            for (let columnIndex = 0; columnIndex < rowValues.length; columnIndex++) {
                const value = rowValues[columnIndex];
                Logger.log(`row : ${rowIndex}, column : ${columnIndex}, value : ${value}`);
            }
        }
    }
}
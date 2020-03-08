import { TestDatabase } from "./testDatabase";
import { SheetRepository } from "../spreadSheet/sheetRepository";
import { ExArray } from "../utility/exArray";
import { ExString } from "../utility/exString";

let db: TestDatabase;

function testDatabase() {

    db = new TestDatabase();

    let activeSpreadSheet = new SheetRepository(SpreadsheetApp.getActiveSpreadsheet());

    activeSpreadSheet.tryFindBySheetName("FruitBox", sheetEntity => {
        // db.masterBook.insertAll(sheetEntity.toMapValues(1, 4));

        // custom header and values
        let headers = sheetEntity.getRowValues(1);
        let data = sheetEntity.values.slice(3);
        let values = ExArray.convertMultipleToMapArray(headers, data);
        db.masterFruit.insertAll(values);
    });

    db.masterBook.findAll().forEach(x => Logger.log(x));

    db.masterBook.tryFirst(entity => {
        entity.name = "aaaa";
    });

    db.masterBook.findAll().forEach((x, i) => {
        x.name = i.toString();
    })

    Logger.log(ExString.convertLetterToNumber("A"));

    activeSpreadSheet.tryFindBySheetName("Book", sheetEntity => {

        let range = db.masterBook.convertEntitiesToRange();
        Logger.log(range);
        // sheetEntity.setValuesByLeftTopPoint(range, 4, 1);

        // db.masterBook.tryFirst(book => {
        //     sheetEntity.sheet.getRange("B4").setValue(book.name);
        // });
    });
}
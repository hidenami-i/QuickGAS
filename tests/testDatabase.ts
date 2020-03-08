import { Database } from "../quick-repository/database";
import { MasterBook } from "./masterBook";
import { MasterFruit } from "./masterFruit";

export class TestDatabase extends Database {

    masterBook: MasterBook.Repository;
    masterFruit: MasterFruit.Repository;

    constructor() {
        super();
        this.masterBook = this.getOrCreateInstance(MasterBook.Repository, "mbr");
        this.masterFruit = this.getOrCreateInstance(MasterFruit.Repository, "mfr");
    }
}
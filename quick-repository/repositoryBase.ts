import {EntityBase} from "./entityBase";
import {ExArray} from "../utility/exArray";

/**
 * Repository base abstract class.
 */
export abstract class RepositoryBase<TEntity extends EntityBase> {
    protected entities: Array<TEntity>;
    protected constructor() {
        this.entities = new Array<TEntity>();
    }
    /**
     * Inserts entity data.
     * @param {TEntity} entity
     */
    public add(entity: TEntity): void {

        if (entity == null) {
            throw new Error("entity is null.");
        }

        if (this.entities.find(x => x.id == entity.id)) {
            console.log(`already exist id = [${entity.id}]`)
            return;
        }

        this.entities.push(entity);
    }

    /**
     * Inserts multiple data.
     * @param {Array<{ [key: string]: any }>} values [{"id":1,"name":"Tom"},{"id":2,"name":"Ann"}]
     */
    public abstract addAll(values: Array<{ [key: string]: any }>): void;

    /**
     * Inserts multiple data.
     * @param {Array<{ [key: string]: any }} values
     * @param {(new (...args: any) => TEntity)} entityInstance
     */
    protected internalAddAll(values: Array<{ [key: string]: any }>, entityInstance: (new (...args: any) => TEntity)): void {

        values.forEach(keyValues => {

            // create empty EntityBase instance
            let newEntity: TEntity = new entityInstance();
            newEntity.setPropertyValues(keyValues);

            this.entities.push(newEntity);
        });
    }

    /**
     * Finds entity by id.
     * @param {number} id entity id.
     * @param {(entity: TEntity) => void)} out
     */
    public tryFindById(id: number, out: (entity: TEntity) => void): void {
        this.entities.forEach(x => {
            if (x.id === id) {
                out(x);
                return;
            }
        });
    }

    /**
     * Gets first entity.
     * @param {(entity: TEntity) => void)} out
     */
    public tryFirst(out: (entity: TEntity) => void): void {
        const result = this.entities[0];
        if (result == null) {
            return;
        }
        out(result);
    }

    /**
     * Gets last entity.
     * @param {(entity: TEntity) => void)} out
     */
    public tryLast(out: (entity: TEntity) => void): void {
        const result = this.entities[this.count() - 1];
        if (result == null) {
            return;
        }
        out(result);
    }

    /**
     * Gets all entity.
     * @returns {Array<TEntity>}
     */
    public findAll(): Array<TEntity> {
        return this.entities;
    }

    /**
     * Gets all entity by.
     * @param {(value: TEntity, index: number, array: TEntity[]) => unknown, thisArg?: any} callbackFunction
     * @returns {Array<TEntity>}
     */
    public findAllBy(callbackFunction: (value: TEntity, index: number, array: TEntity[]) => unknown, thisArg?: any): Array<TEntity> {
        return this.entities.filter(callbackFunction);
    }

    /**
     * Deletes all entities.
     */
    public deleteAll(): void {
        this.entities = new Array<TEntity>();
    }

    /**
     * Gets entity count.
     * @returns {number}
     */
    public count(): number {
        return this.entities.length;
    }

    /**
     * Indicates whether the specified "entities" is null or empty.
     * @returns {boolean} true if the "entities" is null or empty; otherwise false.
     */
    public isNullOrEmpty(): boolean {
        return ExArray.isNullOrEmpty(this.entities);
    }

    /**
     * Indicates whether the specified "entities" is not null or empty.
     * @returns {boolean} true if the "entities" is not null or empty; otherwise false.
     */
    public isNotNullOrEmpty(): boolean {
        return !this.isNullOrEmpty();
    }

    /**
     * Converts entities to json string.
     * @param {(this: any, key: string, value: any) => any} replacer
     * @param {string | number} space
     * @returns {string} json string.
     */
    public toJson(replacer?: (this: any, key: string, value: any) => any, space?: string | number): string {
        return JSON.stringify(this.entities, replacer, space);
    }

    /**
     * Converts entities to map json string.
     * @param {string} jsonKey json root key.
     * @returns {string} json string.
     */
    public toJsonAsMap(jsonKey: string): string {
        const map = new Map<string, Array<TEntity>>().set(jsonKey, this.entities);
        return JSON.stringify(Object.fromEntries(map));
    }

    /**
     * Inserts entities from json string.
     * @param {string} json
     */
    public fromJson(json: string): void {
        if (json == null || json === "") {
            return;
        }

        this.entities = JSON.parse(json);
    }

    /**
     * Converts entities to GoogleAppsScript.Spreadsheet.Range
     * @return {any[][]}
     */
    public convertEntitiesToRange(excludeKeyList: Array<string> = new Array()): any[][] {
        let result: any[][] = [];

        this.findAll().forEach(entity => {
            result.push(entity.convertPropertyToArray(excludeKeyList));
        });

        return result;
    }

    // public updateById(id: number, entity: TEntity): void {

    //     if (entity == null) {
    //         throw new Error("entity is null.");
    //     }

    //     let targetEntity = this.entities.find(x => x.id == id);

    //     if (targetEntity == null) {
    //         Logger.log(`target entity is null.`)
    //         return;
    //     }

    //     targetEntity.setValues(entity.toJson());
    // }
}
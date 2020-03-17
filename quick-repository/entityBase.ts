import {ExArray} from "../utility/exArray";

export class EntityBase {

    /**
     * unique incremental id
     */
    id: number;

    /**
     * constructor
     * @param {number} id
     */
    public constructor(id: number = 0) {
        this.id = id;
    }

    /**
     * set values.
     * @param {{ [key: string]: any; }} newKeyValues {"id":1, "name":"tom"}
     */
    public setPropertyValues(newKeyValues: { [key: string]: any; }): void {

        for (const key in newKeyValues) {

            // ignore key.
            if (!Reflect.has(this, key)) {
                continue;
            }

            if (newKeyValues.hasOwnProperty(key)) {
                const element = newKeyValues[key];
                Reflect.set(this, key, element);
            }
        }
    }

    /**
     * Converts property value to array.
     * @returns {any[]} [1,2,3,"tom"]
     */
    public convertPropertyToArray(excludeKeyList: Array<string> = new Array()): any[] {
        let result: any[] = [];

        Object.getOwnPropertyNames(this).forEach(key => {
            if (!excludeKeyList.includes(key)) {
                result.push(Reflect.get(this, key));
            }
        });

        return result;
    }

    /**
     * Converts entity object to json.
     * @param {(this: any, key: string, value: any) => any} replacer
     * @param {string | number} space
     */
    public toJson(replacer?: (this: any, key: string, value: any) => any, space?: string | number): string {
        return JSON.stringify(this, replacer, space);
    }
}
import { EntityBase } from "../quick-repository/entityBase";
import { RepositoryBase } from "../quick-repository/repositoryBase";

export namespace MasterFruit {

    class Entity extends EntityBase {

        constructor(id: number, public name: string, public color: string, public taste: string) {
            super(id);
            this.name = name;
            this.color = color;
            this.taste = taste;
        }
    }

    export class Repository extends RepositoryBase<Entity> {

        constructor() {
            super();
        }

        public insertAll(values: Array<{ [key: string]: any }>): void {
            super.internalInsertAll(values, Entity);
        }
    }
}
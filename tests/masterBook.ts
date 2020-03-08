import { RepositoryBase } from "../quick-repository/repositoryBase";
import { EntityBase } from "../quick-repository/entityBase";

export namespace MasterBook {

    export class Entity extends EntityBase {

        constructor(id: number, public name: string, public author: string) {
            super(id);
            this.name = name;
        }
    }

    export class Repository extends RepositoryBase<Entity> {

        constructor() {
            super();
        }

        public insertAll(values: Array<{ [key: string]: any }>): void {
            super.internalInsertAll(values, Entity);
        }

        public tryFindByAuthor(author: string, out: (entity: Entity) => void): void {
            let result = this.entities.find(x => x.author == author);
            if (result != null) {
                out(result);
            }
        }
    }
}
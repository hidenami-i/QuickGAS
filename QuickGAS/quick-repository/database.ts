import { RepositoryBase } from "./repositoryBase";
import { EntityBase } from "./entityBase";

/**
 * database class
 */
export class Database {

    readonly repositoryCaches: Map<string, RepositoryBase<EntityBase>>;

    public constructor() {
        this.repositoryCaches = new Map();
    }

    /**
     * Deletes all repository cache.
     */
    public deleteAll(): void {

        this.repositoryCaches.forEach((value, key) => {
            value.deleteAll();
        });

        this.repositoryCaches.clear();
    }

    /**
     * Gets instance if the cache is null; otherwise cache.
     * @param {type: (new () => KRepository} type 
     * @param {string} key 
     * @returns {KRepository} repository cache instance.
     */
    protected getOrCreateInstance<KRepository extends RepositoryBase<EntityBase>>(type: (new () => KRepository), key: string = ""): KRepository {

        if (!this.repositoryCaches.has(key)) {
            this.repositoryCaches.set(key, new type());
        }

        return this.repositoryCaches.get(key) as KRepository;
    }
}
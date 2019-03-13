export class MongoException extends Error {
    public constructor(...args: string[]) {
        super(...args);
    }
}

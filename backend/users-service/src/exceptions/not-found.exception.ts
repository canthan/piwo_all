export class NotFoundException extends Error {
    public constructor(...args: string[]) {
        super(...args);
    }
}

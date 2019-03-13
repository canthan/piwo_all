export class BadRequestException extends Error {
    public constructor(...args: string[]) {
        super(...args);
    }
}

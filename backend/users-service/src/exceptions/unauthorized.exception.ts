export class UnauthorizedException extends Error {
    public constructor(...args: string[]) {
        super(...args);
    }
}

import { Context } from 'koa';
import { getLogger } from 'log4js';

type AsyncFunction = (...args: unknown[]) => Promise<unknown>;

import Exceptions from '../exceptions/exceptions';

export enum HTTP_STATUS {
    OK = 200,
    CREATED = 201,
    BAD_REQUEST = 400,
    UNAUTHORIZED = 401,
    NOT_FOUND = 404,
    INTERNAL_SERVER_ERROR = 500,
}

const logger = getLogger();

export const errorHandlerMiddleware = async (
    ctx: Context,
    next: AsyncFunction
) => {
    try {
        await next();
    } catch (error) {
        let code: number;
        switch (error.constructor) {
            case Exceptions.BadRequestException:
                code = HTTP_STATUS.BAD_REQUEST;
                break;

            case Exceptions.UnauthorizedException:
                code = HTTP_STATUS.UNAUTHORIZED;
                break;

            case Exceptions.NotFoundException:
                code = HTTP_STATUS.NOT_FOUND;
                break;

            case Exceptions.MongoException: {
                code = HTTP_STATUS.INTERNAL_SERVER_ERROR;
                break;
            }

            default:
                code = HTTP_STATUS.INTERNAL_SERVER_ERROR;
        }

        ctx.status =
            code || error.statusCode || error.status;
        ctx.body = {
            message: error.message,
        };
        ctx.app.emit('error', error, ctx);
    }
};

export const errorEmitter = (error: Error, ctx: Context) =>
    logger.error(ctx.status, `${error}`);

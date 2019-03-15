import { Context } from 'koa';
import { getLogger } from 'log4js';

import { AnyFunction } from '../types/types';
import { HTTP_STATUS } from '../common/middlewares/error-handler.middleware';

const logger = getLogger();

export class IndexRouteHandlers {
	public errorHandler = async (
		ctx: Context,
		next: AnyFunction
	): Promise<void> => {
		ctx.throw(ctx.status, ctx.message, 'Error');
	};

	public getIndex = async (ctx: Context, next: AnyFunction): Promise<void> => {
		try {
            logger.info(`Test route`);            
            logger.info(ctx);

			ctx.body = {
				status: HTTP_STATUS.OK,
				data: 'hello, world!',
			};
		} catch (error) {
			ctx.throw(ctx.status, error);
		}
	};
}

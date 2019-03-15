import { Context } from 'koa';
import { getLogger } from 'log4js';

import { AnyFunction } from '../types/types';
import { HTTP_STATUS } from '../common/middlewares/error-handler.middleware';

const logger = getLogger();

export class BatchesController {

        public getTest = async (ctx: Context, next: AnyFunction): Promise<void> => {
		try {
            logger.info(`Test batches`);            
            logger.info(ctx);

			ctx.body = {
				status: HTTP_STATUS.OK,
				data: 'hello, batches!',
			};
		} catch (error) {
			ctx.throw(ctx.status, error);
		}
	};
}
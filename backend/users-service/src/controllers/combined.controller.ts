import { Context } from 'koa';
import { getLogger } from 'log4js';

import { UsersService } from './../services/user.service';
import { AnyFunction } from '../types/types';
import { HTTP_STATUS } from '../common/middlewares/error-handler.middleware';

const logger = getLogger();

export class CombinedController {

    public getUserById = async (
        ctx: Context,
        next: AnyFunction
    ): Promise<void> => {
        try {
            const id = ctx.params.userId;
            const user = await UsersService.getUserById(id);
            logger.info(`Got ${user.username} user`);

            ctx.body = {
                status: HTTP_STATUS.OK,
                data: user,
            };

        } catch (error) {
            ctx.throw(ctx.status, error);
        }
    }

    public getTest = async (ctx: Context, next: AnyFunction): Promise<void> => {
		try {
            logger.info(`Test combined`);            
            logger.info(ctx);

			ctx.body = {
				status: HTTP_STATUS.OK,
				data: 'hello, combined!',
			};
		} catch (error) {
			ctx.throw(ctx.status, error);
		}
	};
}
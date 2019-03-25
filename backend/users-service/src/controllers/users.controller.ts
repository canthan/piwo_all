import { Context } from 'koa';
import { getLogger } from 'log4js';

import { UsersService } from './../services/user.service';
import { AnyFunction } from '../types/types';
import { HTTP_STATUS } from '../common/middlewares/error-handler.middleware';

const logger = getLogger();

export class UsersController {

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

    public getUsers = async (
        ctx: Context,
        next: AnyFunction
    ): Promise<void> => {
        try {
            const users = await UsersService.getUsers();
            logger.info(`Got ${users.length} users`);

            ctx.body = {
                status: HTTP_STATUS.OK,
                data: users,
            };

        } catch (error) {
            ctx.throw(ctx.status, error);
        }
    }

    public getTest = async (ctx: Context, next: AnyFunction): Promise<void> => {
		try {
            logger.info(`Test users`);            
            logger.info(ctx);

			ctx.body = {
				status: HTTP_STATUS.OK,
				data: 'hello, users!',
			};
		} catch (error) {
			ctx.throw(ctx.status, error);
		}
	};
}
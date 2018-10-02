import { Context } from 'koa';
import { getLogger } from 'log4js';

import { UserQueries } from '../db/queries/users';

import { AnyFunction } from '../types/types';
import { HTTP_STATUS } from '../middlewares/error-handler.middleware';

const logger = getLogger();

export class UsersRouteHandlers {
	private userQueries: UserQueries;
	constructor(userQueries: UserQueries = new UserQueries()) {
		this.userQueries = userQueries;
	}

	public errorHandler = async (
		ctx: Context,
		next: AnyFunction
	): Promise<void> => {
		ctx.throw(ctx.status, ctx.message, 'Error');
	};

	public getUsers = async (ctx: Context, next: AnyFunction): Promise<void> => {
		try {
			logger.info(`Getting all users from database`);
			const users = await this.userQueries.getAllUsers();
			logger.info(`Got ${users.length} users`);

			ctx.body = {
				status: HTTP_STATUS.OK,
				data: users,
			};
		} catch (error) {
			ctx.throw(ctx.status, error);
		}
	};

	public getUserById = async (
		ctx: Context,
		next: AnyFunction
	): Promise<void> => {
		try {
			const id = Number(ctx.params.userId);
			logger.info(`Getting user ${id}`);
			let user = await this.userQueries.getSingleUser(id);
			user = JSON.parse(JSON.stringify(user))[0];
			logger.info(`Got ${user.length} user`);

			ctx.body = {
				status: HTTP_STATUS.OK,
				data: user,
			};
		} catch (error) {
			ctx.throw(ctx.status, error);
		}
	};
}

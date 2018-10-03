import * as Router from 'koa-router';
import { UsersRouteHandlers } from './users-route.handler';

export class UsersRouter {
	public static init(router: Router, path: string = '/batches') {
		const usersRouteHandlers = new UsersRouteHandlers();

		router.get(`${path}/:userId`, usersRouteHandlers.getUserById);
	}
}

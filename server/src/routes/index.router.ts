import * as Router from 'koa-router';
import { IndexRouteHandlers } from './index-route.handler';

export class IndexRouter {
	public static init(router: Router, path: string = '/') {
		const indexRouteHandlers = new IndexRouteHandlers();

		router.get(path, indexRouteHandlers.getIndex);
	}
}

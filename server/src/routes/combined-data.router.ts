import * as Router from 'koa-router';
import { CombinedDataRouteHandlers } from './combined-data-route.handler';

export class CombinedDataRouter {
	public static init(router: Router, path: string = '/combinedData') {
		const combinedDataRouteHandlers = new CombinedDataRouteHandlers();

		router.get(`${path}/:userId`, combinedDataRouteHandlers.getUserDataById);
	}
}

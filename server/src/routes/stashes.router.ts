import * as Router from 'koa-router';
import { StashesRouteHandlers } from './stashes-route.handler';

export class StashesRouter {
	public static init(router: Router, path: string = '/batches') {
		const stashesRouteHandlers = new StashesRouteHandlers();

		router.get(`${path}/:stashId`, stashesRouteHandlers.getStashById);
		router.get(
			`${path}/:userId/:batchId`,
			stashesRouteHandlers.getStashesByBatchId
		);
		router.put(`${path}/:stashId/:batchId`, stashesRouteHandlers.editStash);
		router.post(`${path}/:userId/:batchId`, stashesRouteHandlers.addStash);
	}
}

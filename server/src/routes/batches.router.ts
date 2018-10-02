import * as Router from 'koa-router';
import { BatchesRouteHandlers } from './batches-route.handler';

export class BatchesRouter {
	public static init(router: Router, path: string = '/batches') {
		const batchesRouteHandlers = new BatchesRouteHandlers();

		router.get(`${path}/:userId`, batchesRouteHandlers.getBatchByUserId);
		router.post(`${path}/:userId`, batchesRouteHandlers.addBatch);
		router.put(`${path}/:userId/:batchId`, batchesRouteHandlers.editBatch);
		router.delete(`${path}/:userId/:batchId`, batchesRouteHandlers.removeBatch);
	}
}

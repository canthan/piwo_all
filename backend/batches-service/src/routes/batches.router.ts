import * as Router from 'koa-router';
import { BatchesController } from '../controllers/batches.controller';
// import { BatchesRouteHandlers } from './batches-route.handler';

export class BatchesRouter {
    public batchesController: BatchesController = new BatchesController();

    public init(router: Router, path: string = '/batches') {
        router.get(path, this.batchesController.getTest);
    }
}
	// public static init(router: Router, path: string = '/batches') {
		// const batchesRouteHandlers = new BatchesRouteHandlers();

		// router.get(`${path}/:userId`, batchesRouteHandlers.getBatchByUserId);
		// router.post(`${path}/:userId`, batchesRouteHandlers.addBatch);
		// router.put(`${path}/:userId/:batchId`, batchesRouteHandlers.editBatch);
		// router.delete(`${path}/:userId/:batchId`, batchesRouteHandlers.removeBatch);
	// }
// }

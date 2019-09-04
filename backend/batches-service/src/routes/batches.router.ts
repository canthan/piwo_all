import * as Router from 'koa-router';

import { BatchesController } from '../controllers/batches.controller';

export class BatchesRouter {
  public static init(router: Router, path: string = '/batches') {
    const batchesController: BatchesController = new BatchesController();

    router.get(path, batchesController.getTest);
    router.get(`${path}/all`, batchesController.getAllBatches);
    router.get(`${path}/:userId`, batchesController.getBatchByUserId);
    router.post(`${path}/:userId`, batchesController.addBatch);
    router.patch(`${path}/:batchId`, batchesController.updateQuantities);
    router.put(`${path}/:userId/:batchId`, batchesController.editBatch);
    router.delete(`${path}/:userId/:batchId`, batchesController.removeBatch);
  }
}

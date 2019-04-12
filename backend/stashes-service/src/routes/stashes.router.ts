import * as Router from 'koa-router';

import { StashesController } from '../controllers/stashes.controller';

export class StashesRouter {
  public static init(router: Router, path: string = '/') {
    const stashesController: StashesController = new StashesController();

    router.get(path, stashesController.getTest);
    router.get(`${path}/all`, stashesController.getAllStashes);
    router.get(`${path}/user/:userId`, stashesController.getStashesByUserId);
    router.get(`${path}/batch/:batchId`, stashesController.getStashesByBatchId);
    router.get(`${path}/:stashId`, stashesController.getStashById);
    router.put(`${path}/:stashId`, stashesController.editStash);
    router.post(`${path}/:stashId`, stashesController.addStash);
  }
}
 
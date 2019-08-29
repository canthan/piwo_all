import * as Router from 'koa-router';

import { StashesController } from '../controllers/stashes.controller';

enum routes {
  all = 'all',
  user = 'user',
  batch = 'batch',
  stashByName = 'stashByName',
  userId = 'userId',
  batchId = 'batchId',
  stashId = 'stashId',
  stashName = 'stashName',
}

export class StashesRouter {
  public static init(router: Router, path: string = '/') {
    const stashesController: StashesController = new StashesController();

    const { all, user, batch, stashByName, userId, batchId, stashId, stashName } = routes;

    router.get(path, stashesController.getTest);
    router.get(`${path}/${all}`, stashesController.getAllStashes);
    router.get(`${path}/${user}/:${userId}`, stashesController.getStashesByUserId);
    router.get(`${path}/${batch}/:${batchId}`, stashesController.getStashesByBatchId);
    router.get(`${path}/:${stashId}`, stashesController.getStashById);
    router.get(`${path}/${stashByName}/:${stashName}`, stashesController.getStashByName);
    router.put(`${path}/:${userId}/:${batchId}`, stashesController.editStash);
    router.patch(`${path}/${stashByName}`, stashesController.editStashName);
    router.post(`${path}/:${userId}/:${batchId}`, stashesController.addStash);
    router.delete(`${path}/:${stashId}`, stashesController.removeStashById);
    router.delete(`${path}/${stashByName}/:${stashName}`, stashesController.removeStashByName);
  }
}

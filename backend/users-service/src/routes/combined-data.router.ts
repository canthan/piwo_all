import * as Router from 'koa-router';

import { CombinedController } from '../controllers/combined.controller';

export class CombinedDataRouter {
	public static init(router: Router, path: string = '/combined') {
    const combinedController: CombinedController = new CombinedController();

    router.get(path, combinedController.getTest);
		router.get(`${path}/:userId`, combinedController.getUserById);
	}
}

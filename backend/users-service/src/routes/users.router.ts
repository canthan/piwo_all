import * as Router from 'koa-router';

import { UsersController } from '../controllers/users.controller';

export class UsersRouter {
  public static init(router: Router, path: string = '/') {
    const usersController: UsersController = new UsersController();
    
    router.get(path, usersController.getTest);
    router.get(`${path}/all`, usersController.getUsers);
    router.get(`${path}/:userId`, usersController.getUserById);
  }
}

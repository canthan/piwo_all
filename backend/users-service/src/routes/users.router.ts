import * as Router from 'koa-router';

import { UsersController } from '../controllers/users.controller';

export class UsersRouter {
    public usersController: UsersController  = new UsersController();

    public init(router: Router, path: string = '/users') {
        router.get(path, this.usersController.getTest);
        router.get(`${path}/all`, this.usersController.getUsers);
        router.get(`${path}/:userId`, this.usersController.getUserById);
    }
}

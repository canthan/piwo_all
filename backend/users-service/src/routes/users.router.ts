import * as Router from 'koa-router';

import { UsersController } from '../controllers/users.controller';
import { Endpoints } from '../constants/endpoints';

export class UsersRouter {
  public static init(router: Router, path: string = '/') {
    const usersController: UsersController = new UsersController();
    
    router.get(path, usersController.getTest);
    router.get(`${path}/${Endpoints.all}`, usersController.getUsers);
    router.get(`${path}/:userId`, usersController.getUserById);
    router.put(`${path}/${Endpoints.editProfile}`, usersController.editProfile);
    router.post(`${path}/${Endpoints.login}`, usersController.login);
    router.post(`${path}/${Endpoints.logout}`, usersController.logout);
    router.post(`${path}/${Endpoints.register}`, usersController.register);
  }
}

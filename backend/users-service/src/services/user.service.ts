import { getLogger } from 'log4js';

import users, { UserModel } from './../models/user.model';
import Exceptions from '../common/exceptions/exceptions';
import { mapUserOutDTO } from './mapper.service';
import { ErrorText } from '../constants/messeges';

const logger = getLogger();

export class UsersService {

  public static async getUserById(userId: string) {
    logger.info(`Getting user ${userId}`);
    const user = await users.findOne({ userId }).exec();

    if (!user) {
      throw new Exceptions.NotFoundException(`There is no user with id: ${userId}`);
    }

    return user;
  }

  public static async getUserByEmail(email: string) {
    logger.info(`Getting user ${email}`);
    const user = await users.findOne({ email }).exec();

    // if (!user) {
    //   throw new Exceptions.NotFoundException(`There is no user with email: ${email}`);
    // }

    return user;
  }

  public static async getUsers() {
    logger.info(`Getting all users`);
    const usersFound = await users.find().exec();

    if (!usersFound) {
      throw new Exceptions.NotFoundException(ErrorText.NO_USERS);
    }

    return usersFound;
  }

  public static async registerUser(email: string, password: string) {
    logger.info(`Registering ${email}`);
    const newUserModel = await users.create({ email, password })

    return newUserModel.save()
      .then((response: UserModel) => {
        const savedUser: UserModel = response.toObject();

        return mapUserOutDTO(savedUser);
      });
  }
}

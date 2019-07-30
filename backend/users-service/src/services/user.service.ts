import { getLogger } from 'log4js';

import Exceptions from '../common/exceptions/exceptions';

import users, { UserModel } from './../models/user.model';
import { mapUserOutDTO } from './mapper.service';
import { ErrorText } from '../constants/messeges';
import { User } from './../types/types';

const logger = getLogger();

export class UsersService {

  public static async getUserById(userId: string): Promise<UserModel> {
    logger.info(`Getting user ${userId}`);
    const user = await users.findOne({ userId }).exec();

    if (!user) {
      throw new Exceptions.NotFoundException(`There is no user with id: ${userId}`);
    }

    return user;
  }

  public static async getUserByEmail(email: string): Promise<UserModel | null>  {
    logger.info(`Getting user ${email}`);
    const user = await users.findOne({ email }).exec();

    // if (!user) {
    //   throw new Exceptions.NotFoundException(`There is no user with email: ${email}`);
    // }

    return user;
  }

  public static async getUsers(): Promise<UserModel[]>  {
    logger.info(`Getting all users`);
    const usersFound = await users.find().exec();

    if (!usersFound) {
      throw new Exceptions.NotFoundException(ErrorText.NO_USERS);
    }

    return usersFound;
  }

  public static async registerUser(email: string, password: string): Promise<UserModel | User>  {
    logger.info(`Registering ${email}`);
    const newUserModel = await users.create({ email, password })

    return newUserModel.save().then((response: UserModel) => {
        const savedUser: UserModel = response.toObject();

        return mapUserOutDTO(savedUser);
      });
  }

  public static async editUser(userData: User): Promise<User>  {
    const { userId, email, firstname, surname } = userData;
    logger.info(`Editing user ${email}`);
    
    const edited = await users.updateOne({ userId }, { email, firstname, surname }).exec();

    if (!edited.ok) {
      throw new Exceptions.NotFoundException(`'Something went wrong during updating user. Please try again`);
    }

    const editedUser = await users.findOne({ userId }).exec();

    if (!editedUser) {
      throw new Exceptions.NotFoundException(`There is no user with id: ${userId}`);
    }

    return mapUserOutDTO(editedUser);
  }
}

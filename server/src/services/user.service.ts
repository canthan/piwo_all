import { getLogger } from 'log4js';

import users from './../models/user.model';
import Exceptions from '../exceptions/exceptions';

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

    public static async getUsers() {
        logger.info(`Getting all users`);
        const usersFound = await users.find().exec();

        if (!usersFound) {
            throw new Exceptions.NotFoundException(`There are no users`);
        }

        return usersFound;
    }
}

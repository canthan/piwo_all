import { getLogger } from 'log4js';

import Exceptions from '../common/exceptions/exceptions';

const logger = getLogger();

export class BatchesService {

    // public static async getUserById(userId: string) {
    //     logger.info(`Getting user ${userId}`);
    //     const user = await users.findOne({ userId }).exec();

    //     if (!user) {
    //         throw new Exceptions.NotFoundException(`There is no user with id: ${userId}`);
    //     }

    //     return user;
    // }

    // public static async getUsers() {
    //     logger.info(`Getting all users`);
    //     const usersFound = await users.find().exec();

    //     if (!usersFound) {
    //         throw new Exceptions.NotFoundException(`There are no users`);
    //     }

    //     return usersFound;
    // }
}

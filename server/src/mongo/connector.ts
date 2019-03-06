import { getLogger } from 'log4js';
import * as mongoose from 'mongoose';
import { promisify } from 'util';

import config, { AppConfig } from '../config.loader';

const defaultLogger = getLogger();
const setTimeoutPromise = promisify(setTimeout);

const SECOND_IN_MS: number = 1000;

process.on('SIGINT', async () => {
    defaultLogger.info('[ MongoDB ] Closing all connections due to microservice termination ...');

    await mongoose.disconnect();
});

export default async function mongoConnector(): Promise<mongoose.Connection> {
    const reconnectAttempts: number = config.get(AppConfig.MONGODB_RECONNECT_ATTEMPTS);
    const reconnectInterval: number = config.get(AppConfig.MONGODB_RECONNECT_INTERVAL) * SECOND_IN_MS;

    for (let i = 0; i < reconnectAttempts; i += 1) {
        try {
            if (i > 0) {
                // delay
                await setTimeoutPromise(reconnectInterval);
            }

            defaultLogger.info(`[ MongoDB ] Connection attempt: ${i + 1}/${reconnectAttempts} ...`);
            defaultLogger.info(config.get(AppConfig.MONGODB_USERS_URI));


            await mongoose.connect(config.get(AppConfig.MONGODB_USERS_URI), { useNewUrlParser: true });

            break;
        } catch (e) {
            defaultLogger.error(e);
        }
    }

    if (mongoose.connection.readyState !== 1) {
        throw new mongoose.mongo.MongoError('MongoDB connection could NOT be established!');
    }

    defaultLogger.info('[ MongoDB ] Connection has been established!');

    return mongoose.connection;
}

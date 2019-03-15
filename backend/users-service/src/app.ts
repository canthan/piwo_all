import * as Koa from 'koa';
import * as cors from 'koa-cors';
import * as Router from 'koa-router';
import * as bodyParser from 'koa-body';

import config, { AppConfig } from './common/utils/config.loader';
import configureLoggers from './common/utils/logger-config';

import { IndexRouter } from './routes/index.router';
// import { BatchesRouter } from './routes/batches.router';
// import { StashesRouter } from './routes/stashes.router';
// import { CombinedDataRouter } from './routes/combined-data.router';
import { UsersRouter } from './routes/users.router';
import {
    errorEmitter,
    errorHandlerMiddleware,
} from './common/middlewares/error-handler.middleware';
import mongoConnector from './common/utils/mongo.connector';


export async function bootstrap(): Promise<Koa> {
    config.load();
    configureLoggers();

    await mongoConnector(AppConfig.MONGODB_USERS_URI);

    const app: Koa = new Koa();

    app.use(errorHandlerMiddleware);
    app.on('error', errorEmitter);

    app.use(bodyParser());
    app.use(cors());

    const router = new Router();
    // BatchesRouter.init(router, '/batches');
    // StashesRouter.init(router, '/stashes');
    new UsersRouter().init(router, '/users');
    // CombinedDataRouter.init(router, '/combinedData');
    IndexRouter.init(router);

    app.use(router.routes());


    return app;
}

import * as Koa from 'koa';
import * as cors from 'koa-cors';
import * as Router from 'koa-router';
import * as bodyParser from 'koa-body';
import * as nconf from 'nconf';
import * as path from 'path';

import configureLoggers from './utils/logger-config';
import { IndexRouter } from './routes/index.router';
import { BatchesRouter } from './routes/batches.router';
import { StashesRouter } from './routes/stashes.router';
import { CombinedDataRouter } from './routes/combined-data.router';
import { UsersRouter } from './routes/users.router';
import {
	errorEmitter,
	errorHandlerMiddleware,
} from './middlewares/error-handler.middleware';

export async function bootstrap(): Promise<Koa> {
	nconf.env().argv();
	const environment = nconf.get('NODE_ENV') || 'development';
	nconf.file(
		path.join(__dirname, `config/config.${environment.toLowerCase()}.json`)
	);

	configureLoggers();

	// await mongoConnector();

	const app: Koa = new Koa();

	app.use(errorHandlerMiddleware);
	app.on('error', errorEmitter);

	app.use(bodyParser());
	app.use(cors());

	const router = new Router();
	BatchesRouter.init(router, '/batches');
	StashesRouter.init(router, '/stashes');
	UsersRouter.init(router, '/users');
	CombinedDataRouter.init(router, '/combinedData');
	IndexRouter.init(router);

	app.use(router.routes());

	return app;
}

import * as Koa from 'koa';
import * as cors from 'koa-cors';
import * as Router from 'koa-router';
import * as bodyParser from 'koa-body';

import config, { AppConfig } from './common/utils/config.loader';
import configureLoggers from './common/utils/logger-config';

import { IndexRouter } from './routes/index.router';
import { UsersRouter } from './routes/users.router';
import {
  errorEmitter,
  errorHandlerMiddleware,
} from './common/middlewares/error-handler.middleware';
import mongoConnector from './common/utils/mongo.connector';
import { CombinedDataRouter } from './routes/combined-data.router';

export async function bootstrap(): Promise<Koa> {

  // app.use(jwt({
  //   secret: jwksRsa.koaJwtSecret({
  //     cache: true,
  //     rateLimit: true,
  //     jwksRequestsPerMinute: 5,
  //     jwksUri: `https://${config.get(AppConfig.AUTH0_DOMAIN)}/.well-known/jwks.json`,
  //   }),
  //   audience: config.get(AppConfig.AUTH0_AUDIENCE),
  //   issuer: `https://${config.get(AppConfig.AUTH0_DOMAIN)}/`,
  //   algorithms: ["RS256"],
  // }))
  config.load();
  configureLoggers();

  await mongoConnector(AppConfig.MONGODB_USERS_URI);

  const app: Koa = new Koa();

  app.use(errorHandlerMiddleware);
  app.on('error', errorEmitter);

  app.use(bodyParser());
  app.use(cors({ methods: ['GET', 'PATCH', 'PUT', 'POST'] }));

  const router = new Router();

  UsersRouter.init(router, '/users');
  CombinedDataRouter.init(router, '/combined');
  IndexRouter.init(router);

  app.use(router.routes());

  return app;
}

import { Context } from 'koa';
import { getLogger } from 'log4js';

import { UsersService } from './../services/user.service';
import { AnyFunction, User, UserData, Stash } from '../types/types';
import { HTTP_STATUS } from '../common/middlewares/error-handler.middleware';
import { OutputService } from '../services/output.service';
import { BatchesService } from '../services/batches.service';
import { StashesService } from '../services/stashes.service';

const logger = getLogger();

export class CombinedController {
  private batchesService: BatchesService = new BatchesService();
  private stashesService: StashesService = new StashesService();

  public getUserById = async (
    ctx: Context,
    next: AnyFunction
  ): Promise<void> => {
    try {
      const id = ctx.params.userId;
      const user = await UsersService.getUserById(id);
      logger.info(`Got ${user.username} user`);

      ctx.body = {
        status: HTTP_STATUS.OK,
        data: user,
      };

    } catch (error) {
      ctx.throw(ctx.status, error);
    }
  }

  public getUserDataById = async (
    ctx: Context,
    next: AnyFunction
  ): Promise<void> => {
    try {
      const id = ctx.params.userId;
      logger.info(`Getting data from user ${id}`);
      const user = await UsersService.getUserById(id);
      const batches = await this.batchesService.getBatchesByUserId(id);
      const stashes = await this.stashesService.getStashesByUserId(id);

      const { email, firstname, password, registrationDate, surname, userId, username } = user
      const outputData: UserData = {
        email, 
        firstname, 
        password, 
        registrationDate, 
        surname, 
        userId, 
        username,
        batches,
        stashes,
      };

      logger.info(`Got ${outputData.firstname} ${outputData.surname} data`);

      ctx.body = {
        status: HTTP_STATUS.OK,
        data: outputData,
      };
    } catch (error) {
      ctx.throw(ctx.status, error);
    }
  };

  public getTest = async (ctx: Context, next: AnyFunction): Promise<void> => {
    try {
      logger.info(`Test combined`);
      logger.info(ctx);

      ctx.body = {
        status: HTTP_STATUS.OK,
        data: 'hello, combined!',
      };
    } catch (error) {
      ctx.throw(ctx.status, error);
    }
  };
}
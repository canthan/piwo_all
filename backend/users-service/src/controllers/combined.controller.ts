import { Context } from 'koa';
import { getLogger } from 'log4js';

import { HTTP_STATUS } from '../common/middlewares/error-handler.middleware';
import { UsersService } from './../services/user.service';
import { BatchesService } from '../services/batches.service';
import { StashesService } from '../services/stashes.service';
import { mapStashConfigOutDTO } from '../services/mapper.service';

import { AnyFunction, UserData } from '../types/types';

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

      const { email, firstname, registrationDate, surname, userId, username, stashConfig } = user
      const outputData: UserData = {
        email, 
        firstname, 
        registrationDate, 
        surname, 
        userId, 
        username,
        batches,
        stashes,
        stashConfig: stashConfig.map(config => mapStashConfigOutDTO(config)),
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
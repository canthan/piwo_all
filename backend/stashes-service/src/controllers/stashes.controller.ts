import { Context } from 'koa';
import { getLogger } from 'log4js';

import { AnyFunction, Stash, initialStash, StashOutDTO } from '../types/types';
import { HTTP_STATUS } from '../common/middlewares/error-handler.middleware';
import { StashesService } from '../services/stashes.service';
import { asyncForEach } from '../common/utils/async.foreach';
import { StashModel } from '../models/stashes.model';
import { mapStashOutDTO } from '../services/mapper.service';

const logger = getLogger();

export class StashesController {

  public getTest = async (ctx: Context, next: AnyFunction): Promise<void> => {
    try {
      logger.info(`Test stashes`);
      logger.info(ctx);

      ctx.body = {
        status: HTTP_STATUS.OK,
        data: 'hello, stashes!',
      };
    } catch (error) {
      ctx.throw(ctx.status, error);
    }
  };

  public getAllStashes = async (ctx: Context, next: AnyFunction): Promise<void> => {
    try {

      logger.info(`Getting all stashes`);
      const stashes = await StashesService.getAllStashes();

      logger.info(`Got ${stashes.length} stashes`);
      
        ctx.body = {
        status: HTTP_STATUS.OK,
        data: stashes,
      };
    } catch (error) {
      ctx.throw(ctx.status, error);
    }
  };

  public getStashesByUserId = async (ctx: Context, next: AnyFunction): Promise<void> => {
    try {
      const userId = ctx.params.userId;
      logger.info(`Getting stashes from user ${userId}`);
      const stashes = await StashesService.getStashesByUserId(userId);

      logger.info(`Got ${stashes.length} stashes`);

      ctx.body = {
        status: HTTP_STATUS.OK,
        data: stashes,
      };
    } catch (error) {
      ctx.throw(ctx.status, error);
    }
  };

  public getStashesByBatchId = async (ctx: Context, next: AnyFunction): Promise<void> => {
    try {
      const batchId = ctx.params.batchId;
      logger.info(`Getting stashes from batch ${batchId}`);
      const stashes = await StashesService.getStashesByBatchId(batchId);

      logger.info(`Got ${stashes.length} stashes`);

      ctx.body = {
        status: HTTP_STATUS.OK,
        data: stashes,
      };
    } catch (error) {
      ctx.throw(ctx.status, error);
    }
  };

  public getStashById = async (ctx: Context, next: AnyFunction): Promise<void> => {
    try {
      const stashId = ctx.params.stashId;
      logger.info(`Getting stash ${stashId}`);
      const stash = await StashesService.getStashById(stashId);

      ctx.body = {
        status: HTTP_STATUS.OK,
        data: stash,
      };
    } catch (error) {
      ctx.throw(ctx.status, error);
    }
  };

  public addStash = async (ctx: Context, next: AnyFunction): Promise<void> => {
    try {
      const { batchId, userId } = ctx.params;
      const { name } = ctx.request.body;
      const newStash: StashOutDTO = {
        ...initialStash,
        name,
        batchId,
        userId,
      }

      logger.info(`Adding stash to batch ${batchId} for user ${userId}`);

      const stash: Stash = await StashesService.addStash(newStash);

      logger.info(`Stash ${stash.stashId} saved`);

      ctx.body = !!stash
        ? { status: HTTP_STATUS.CREATED, data: stash }
        : { status: HTTP_STATUS.BAD_REQUEST, message: 'Something went wrong' };

    } catch (error) {
      ctx.throw(ctx.status, error);
    }
  };

  public editStash = async (ctx: Context, next: AnyFunction): Promise<void> => {
    try {
      const { batchId } = ctx.params;
      const { stashes } = ctx.request.body;

      const updatedStashes: Stash[] = []

      await asyncForEach(stashes, async (stash: Stash) => {
        logger.info(`Updating stash ${stash.stashId} for batch ${batchId}`);

        const updatedStash: StashModel = await StashesService.editStash(stash);
  
        if (!!updatedStash) {
          updatedStashes.push(mapStashOutDTO(updatedStash));
          logger.info(`Stash ${updatedStash.stashId} updated`);
        }
        
      });
      ctx.body = !!updatedStashes
        ? { status: HTTP_STATUS.OK, data: updatedStashes }
        : { status: HTTP_STATUS.BAD_REQUEST, message: 'That stash does not exist' };

    } catch (error) {
      ctx.throw(ctx.status, error);
    }
  };

  public removeStash = async (ctx: Context, next: AnyFunction): Promise<void> => {
    // to be implemented
    try {
      const { stashId, userId } = ctx.params;

      logger.info(`Removing batch ${stashId} for user ${userId}`);

      const removedStashId: number = await StashesService.deleteStash(stashId);

      ctx.body = !!removedStashId
      ? { status: HTTP_STATUS.OK, data: {stashId: removedStashId} }
      : { status: HTTP_STATUS.BAD_REQUEST, message: 'That stash does not exist' };

    } catch (error) {
      ctx.throw(ctx.status, error);
    }
  };
}

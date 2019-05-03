import { Context } from 'koa';
import { getLogger } from 'log4js';

import { AnyFunction, Batch, DeletedRecords, Stash } from '../types/types';
import { HTTP_STATUS } from '../common/middlewares/error-handler.middleware';
import { BatchesService } from '../services/batches.service';
import { StashesService } from '../services/stashes.service';
import { asyncForEach } from '../common/utils/async.foreach';

const logger = getLogger();

export class BatchesController {

  public getTest = async (ctx: Context, next: AnyFunction): Promise<void> => {
    try {
      logger.info(`Test batches`);
      logger.info(ctx);

      ctx.body = {
        status: HTTP_STATUS.OK,
        data: 'hello, batches!',
      };
    } catch (error) {
      ctx.throw(ctx.status, error);
    }
  };

  public getAllBatches = async (ctx: Context, next: AnyFunction): Promise<void> => {
    try {

      logger.info(`Getting all batches`);
      const batches = await BatchesService.getAllBatches();

      logger.info(`Got ${batches.length} batches`);

      ctx.body = {
        status: HTTP_STATUS.OK,
        data: batches,
      };
    } catch (error) {
      ctx.throw(ctx.status, error);
    }
  };

  public getBatchByUserId = async (ctx: Context, next: AnyFunction): Promise<void> => {
    try {
      const userId = ctx.params.userId;
      logger.info(`Getting batches from user ${userId}`);
      const batches = await BatchesService.getBatchByUserId(userId);

      logger.info(`Got ${batches.length} batches`);

      ctx.body = {
        status: HTTP_STATUS.OK,
        data: batches,
      };
    } catch (error) {
      ctx.throw(ctx.status, error);
    }
  };

  public addBatch = async (ctx: Context, next: AnyFunction): Promise<void> => {
    try {
      const { userId } = ctx.params;
      const newBatch = { ...ctx.request.body, userId };

      logger.info(`Adding batch ${newBatch.batchId} for user ${userId}`);
      const batch: Batch = await BatchesService.addBatch(newBatch);

      logger.info(`Batch ${batch.batchId} saved`);

      ctx.body = !!batch
        ? { status: HTTP_STATUS.CREATED, data: batch }
        : { status: HTTP_STATUS.BAD_REQUEST, message: 'Something went wrong' };

    } catch (error) {
      ctx.throw(ctx.status, error);
    }
  };

  public editBatch = async (ctx: Context, next: AnyFunction): Promise<void> => {
    try {
      const { batchId, userId } = ctx.params;
      const editedBatch = ctx.request.body.batch;

      logger.info(`Updating batch ${batchId} for user ${userId}`);
      const batch: Batch = await BatchesService.editBatch({
        ...editedBatch,
        userId,
        batchId,
      });

      if (!!batch) {
        logger.info(`Batch ${batch.batchId} updated`);
      }
      ctx.body = !!batch
        ? { status: HTTP_STATUS.OK, data: batch }
        : { status: HTTP_STATUS.BAD_REQUEST, message: 'That batch does not exist' };

    } catch (error) {
      ctx.throw(ctx.status, error);
    }
  };

  public removeBatch = async (ctx: Context, next: AnyFunction): Promise<void> => {
    try {
      const { batchId, userId } = ctx.params;
      logger.info(`Removing batch ${batchId} for user ${userId}`);

      const deletedRecords: DeletedRecords = {
        stashIds: [],
        batchIds: [],
      };
      const stashesInBatch = await StashesService.getStashesByBatchId(batchId);

      if (stashesInBatch.length) {
        await asyncForEach(stashesInBatch, async (stash: Stash) => {
          const removedStash = await StashesService.removeStash(stash.stashId);
          if (!!removedStash) {
            deletedRecords.stashIds.push(stash.stashId)
          }
        });
      }

      const removedBatch = await BatchesService.removeBatch(batchId);
      if (!!removedBatch) {
        deletedRecords.batchIds.push(removedBatch)
      }

      ctx.body = !!removedBatch
        ? { status: HTTP_STATUS.OK, data: deletedRecords }
        : { status: HTTP_STATUS.BAD_REQUEST, message: 'That batch does not exist' };
    } catch (error) {
      ctx.throw(ctx.status, error);
    }
  };
}
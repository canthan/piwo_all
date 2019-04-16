import { Context } from 'koa';
import { getLogger } from 'log4js';

import { AnyFunction, Batch } from '../types/types';
import { HTTP_STATUS } from '../common/middlewares/error-handler.middleware';
import { BatchesService } from '../services/batches.service';

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
    // to be tested
    try {
      const userId = ctx.params.userId;
      const newBatch = {
        ...new Batch(),
        ...ctx.request.body,
        batchUserId: userId,
      };

      logger.info(`Adding batch ${newBatch.batchId} for user ${userId}`);
      const batch: Batch = await BatchesService.addBatch(newBatch);
      // batch = JSON.parse(JSON.stringify(batch));
      // delete batch.batchUserId;
      logger.info(`Batch ${batch.batchId} saved`);

      ctx.body = !!batch
        ? { status: HTTP_STATUS.CREATED, data: batch }
        : { status: HTTP_STATUS.BAD_REQUEST, message: 'Something went wrong' };

      // if (!!batch) {
      //   ctx.body = {
      //     status: HTTP_STATUS.CREATED,
      //     data: batch,
      //   };
      // } else {
      //   ctx.body = {
      //     status: HTTP_STATUS.BAD_REQUEST,
      //     message: 'Something went wrong',
      //   };
      // }
    } catch (error) {
      ctx.throw(ctx.status, error);
    }
  };

  public editBatch = async (ctx: Context, next: AnyFunction): Promise<void> => {
    // to be tested
    try {
      const editedBatch: Batch = ctx.request.body.batch;
      // const { batchId, userId } = ctx.params;

      // logger.info(`Updating batch ${batchId} for user ${userId}`);
      logger.info(`Updating batch ${editedBatch.batchId} for user ${editedBatch.userId}`);
      const batch: Batch = await BatchesService.editBatch(
        // userId,
        // batchId,
        editedBatch
      );

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
    // to be implemented
    try {
      // const batchId = Number(ctx.params.batchId);
      // const userId = Number(ctx.params.userId);
      // logger.info(`Removing batch ${batchId} for user ${userId}`);

      // const deletedRecords: DeletedRecords = {
      //   stashes: [],
      //   batches: [],
      // };
      // await this.deleteStashes(
      //   ctx.params.userId,
      //   ctx.params.batchId,
      //   deletedRecords
      // );
      // await this.deleteBatch(batchId, deletedRecords);
      // if (deletedRecords.batches.length) {
      //   logger.info(`Batch ${batchId} removed`);
      //   ctx.body = {
      //     status: HTTP_STATUS.CREATED,
      //     data: deletedRecords,
      //   };
      // } else {
      //   ctx.body = {
      //     status: HTTP_STATUS.BAD_REQUEST,
      //     message: 'Something went wrong',
      //   };
      // }
    } catch (error) {
      ctx.throw(ctx.status, error);
    }

    // public deleteStashes = async (
    // 	userId: number,
    // 	batchId: number,
    // 	deletedRecords: DeletedRecords
    // ) => {
    // 	const deleted = await this.stashQueries.deleteStashesFromBatch(
    // 		userId,
    // 		batchId
    // 	);
    // 	deletedRecords.stashes = deleted;
    // };

    // public deleteBatch = async (
    // 	batchId: number,
    // 	deletedRecords: DeletedRecords
    // ) => {
    // 	const deleted = await this.batchQueries.deleteBatch(batchId);
    // 	deletedRecords.batches = deleted;
    // };
  };
}
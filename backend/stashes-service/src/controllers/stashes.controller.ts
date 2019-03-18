import { Context } from 'koa';
import { getLogger } from 'log4js';

import { AnyFunction, Stash } from '../types/types';
import { HTTP_STATUS } from '../common/middlewares/error-handler.middleware';
import { StashesService } from '../services/stashes.service';

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
    // to be tested
    try {
      const { stashName, batchId, userId } = ctx.params;
      const newStash = new Stash(stashName, batchId, userId);

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
    // to be tested
    try {
      const editedStash: Stash = ctx.request.body.stash;
      // const { batchId, userId } = ctx.params;

      // logger.info(`Updating batch ${batchId} for user ${userId}`);
      logger.info(`Updating stash ${editedStash.stashId} for batch ${editedStash.batchId}`);
      const stash: Stash = await StashesService.editStash(editedStash);

      if (!!stash) {
        logger.info(`Stash ${stash.stashId} updated`);
      }
      ctx.body = !!stash
        ? { status: HTTP_STATUS.OK, data: stash }
        : { status: HTTP_STATUS.BAD_REQUEST, message: 'That stash does not exist' };

    } catch (error) {
      ctx.throw(ctx.status, error);
    }
  };

  public removeStash = async (ctx: Context, next: AnyFunction): Promise<void> => {
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
      // await this.deleteStash(batchId, deletedRecords);
      // if (deletedRecords.batches.length) {
      //   logger.info(`Stash ${batchId} removed`);
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
  };
}



// 	public getStashByUserId = async (
// 		ctx: Context,
// 		next: AnyFunction
// 	): Promise<void> => {
// 		try {
// 			const id = Number(ctx.params.userID);
// 			logger.info(`Getting stashes ${id}`);
// 			const stashes = await this.stashQueries.getStashByUserId(id);
// 			logger.info(`Got ${stashes.length} stashes`);

// 			ctx.body = {
// 				status: HTTP_STATUS.OK,
// 				data: stashes,
// 			};
// 		} catch (error) {
// 			ctx.throw(ctx.status, error);
// 		}
// 	};

// 	public getStashesByStashId = async (
// 		ctx: Context,
// 		next: AnyFunction
// 	): Promise<void> => {
// 		try {
// 			const userId = Number(ctx.params.userId);
// 			const batchId = Number(ctx.params.batchId);
// 			logger.info(`Getting stashes from user ${userId} from batch ${batchId}`);
// 			let stashes: Stash[] = await this.stashQueries.getStashesOfStash(
// 				userId,
// 				batchId
// 			);
// 			logger.info(`Got ${stashes.length} stashes`);
// 			const stashesOutput: Stash[] = [];
// 			stashes = JSON.parse(JSON.stringify(stashes));
// 			stashes.forEach(stash => {
// 				stashesOutput.push(this.outputService.formatSingleStash(stash));
// 			});

// 			ctx.body = {
// 				status: HTTP_STATUS.OK,
// 				data: stashes,
// 			};
// 		} catch (error) {
// 			ctx.throw(ctx.status, error);
// 		}
// 	};

// 	public editStash = async (ctx: Context, next: AnyFunction): Promise<void> => {
// 		try {
// 			const editedStashes: Stash[] = ctx.request.body.stashes;
// 			const stashId = Number(ctx.params.stashId);
// 			const batchId = Number(ctx.params.batchId);

// 			logger.info(`Updating stash ${stashId} from batch ${batchId}`);
// 			const stashes = await this.updateStashes(editedStashes);

// 			const stashesOutput: Stash[] = [];
// 			stashes.forEach(stash => {
// 				stashesOutput.push(this.outputService.formatSingleStash(stash));
// 				logger.info(`Stash ${stash.stashId} updated`);
// 			});

// 			if (this.areThereAnyStashes(stashes)) {
// 				logger.info(`${stashesOutput.length} stashes updated`);
// 				ctx.body = {
// 					status: HTTP_STATUS.OK,
// 					data: stashesOutput,
// 				};
// 			} else {
// 				ctx.body = {
// 					status: HTTP_STATUS.BAD_REQUEST,
// 					message: 'That batch does not exist',
// 				};
// 			}
// 		} catch (error) {
// 			ctx.throw(ctx.status, error);
// 		}
// 	};

// 	public addStash = async (ctx: Context, next: AnyFunction): Promise<void> => {
// 		try {
// 			const newStash: Stash = ctx.request.body.stashes[0];
// 			const userId = Number(ctx.params.userId);
// 			const batchId = Number(ctx.params.batchId);
// 			logger.info(`Adding stash to batch  ${batchId} for user ${userId}`);

// 			let stash: Stash = (await this.stashQueries.insertStash(newStash))[0];
// 			stash = JSON.parse(JSON.stringify(stash));
// 			delete stash.stashUserId;
// 			stash = this.outputService.formatSingleStash(stash);
// 			logger.info(`Stash ${stash.stashId} saved`);

// 			if (!!stash) {
// 				ctx.body = {
// 					status: HTTP_STATUS.CREATED,
// 					data: stash,
// 				};
// 			} else {
// 				ctx.body = {
// 					status: HTTP_STATUS.BAD_REQUEST,
// 					message: 'Something went wrong',
// 				};
// 			}
// 		} catch (error) {
// 			ctx.throw(ctx.status, error);
// 		}
// 	};

// 	private areThereAnyStashes = (stashes: Stash[]) => !!stashes.length;

// 	private updateStashes = async (stashes: Stash[]) => {
// 		const updatedStashes: Stash[] = [];
// 		await asyncForEach(stashes, async (stash: Stash) => {
// 			const updatedStash = await this.stashQueries.updateStash(stash);
// 			updatedStashes.push(JSON.parse(JSON.stringify(updatedStash[0])));
// 		});

// 		return updatedStashes;
// 	};
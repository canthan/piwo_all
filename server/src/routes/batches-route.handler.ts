import { BatchQueries } from '../db/queries/batches';
import { StashQueries } from '../db/queries/stashes';

import { Context } from 'koa';
import { getLogger } from 'log4js';

import { AnyFunction, Batch, DeletedRecords } from '../types/types';
import { HTTP_STATUS } from '../middlewares/error-handler.middleware';

const logger = getLogger();

export class BatchesRouteHandlers {
	private batchQueries: BatchQueries;
	private stashQueries: StashQueries;
	constructor(
		batchQueries: BatchQueries = new BatchQueries(),
		stashQueries: StashQueries = new StashQueries()
	) {
		this.batchQueries = batchQueries;
		this.stashQueries = stashQueries;
	}
	public errorHandler = async (
		ctx: Context,
		next: AnyFunction
	): Promise<void> => {
		ctx.throw(ctx.status, ctx.message, 'Error');
	};

	public deleteStashes = async (
		userId: number,
		batchId: number,
		deletedRecords: DeletedRecords
	) => {
		const deleted = await this.stashQueries.deleteStashesFromBatch(
			userId,
			batchId
		);
		deletedRecords.stashes = deleted;
	};

	public deleteBatch = async (
		batchId: number,
		deletedRecords: DeletedRecords
	) => {
		const deleted = await this.batchQueries.deleteBatch(batchId);
		deletedRecords.batches = deleted;
	};

	public getBatchByUserId = async (
		ctx: Context,
		next: AnyFunction
	): Promise<void> => {
		try {
			const id = Number(ctx.params.userId);
			logger.info(`Getting batches from user ${id}`);
			const batches = await this.batchQueries.getBatchesOfUser(
				ctx.params.userId
			);
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
			const userId = Number(ctx.params.userId);
			const newBatch = {
				...new Batch(),
				...ctx.request.body,
				batchUserId: userId,
			};

			logger.info(`Adding batch ${newBatch.batchId} for user ${userId}`);
			let batch: Batch = (await this.batchQueries.addBatch(newBatch))[0];
			batch = JSON.parse(JSON.stringify(batch));
			delete batch.batchUserId;
			logger.info(`Batch ${batch.batchId} saved`);

			if (!!batch) {
				ctx.body = {
					status: HTTP_STATUS.CREATED,
					data: batch,
				};
			} else {
				ctx.body = {
					status: HTTP_STATUS.BAD_REQUEST,
					message: 'Something went wrong',
				};
			}
		} catch (error) {
			ctx.throw(ctx.status, error);
		}
	};

	public removeBatch = async (
		ctx: Context,
		next: AnyFunction
	): Promise<void> => {
		try {
			const batchId = Number(ctx.params.batchId);
			const userId = Number(ctx.params.userId);
			logger.info(`Removing batch ${batchId} for user ${userId}`);

			const deletedRecords: DeletedRecords = {
				stashes: [],
				batches: [],
			};
			await this.deleteStashes(
				ctx.params.userId,
				ctx.params.batchId,
				deletedRecords
			);
			await this.deleteBatch(batchId, deletedRecords);
			if (deletedRecords.batches.length) {
				logger.info(`Batch ${batchId} removed`);
				ctx.body = {
					status: HTTP_STATUS.CREATED,
					data: deletedRecords,
				};
			} else {
				ctx.body = {
					status: HTTP_STATUS.BAD_REQUEST,
					message: 'Something went wrong',
				};
			}
		} catch (error) {
			ctx.throw(ctx.status, error);
		}
	};

	public editBatch = async (ctx: Context, next: AnyFunction): Promise<void> => {
		try {
			const editedBatch: Batch = ctx.request.body.batch;
			const batchId = Number(ctx.params.batchId);
			const userId = Number(ctx.params.userId);

			logger.info(`Updating batch ${batchId} for user ${userId}`);
			const batch: Batch = (await this.batchQueries.updateBatch(
				userId,
				batchId,
				editedBatch
			))[0];

			if (!!batch) {
				logger.info(`Batch ${batch.batchId} updated`);
				ctx.body = {
					status: HTTP_STATUS.OK,
					data: batch,
				};
			} else {
				ctx.body = {
					status: HTTP_STATUS.BAD_REQUEST,
					message: 'That batch does not exist',
				};
			}
		} catch (error) {
			ctx.throw(ctx.status, error);
		}
	};
}

import { StashQueries } from '../db/queries/stashes';
import { OutputService } from '../services/output.service';

import { Context } from 'koa';
import { getLogger } from 'log4js';

import { AnyFunction, Stash } from '../types/types';
import { HTTP_STATUS } from '../middlewares/error-handler.middleware';
import { asyncForEach } from '../utils/async.foreach';

const logger = getLogger();

export class StashesRouteHandlers {
	private outputService: OutputService;
	private stashQueries: StashQueries;
	constructor(
		outputService: OutputService = new OutputService(),
		stashQueries: StashQueries = new StashQueries()
	) {
		this.outputService = outputService;
		this.stashQueries = stashQueries;
	}

	public errorHandler = async (
		ctx: Context,
		next: AnyFunction
	): Promise<void> => {
		ctx.throw(ctx.status, ctx.message, 'Error');
	};

	public getStashes = async (
		ctx: Context,
		next: AnyFunction
	): Promise<void> => {
		logger.info('test');
		try {
			logger.info(`Getting all stashes from database`);
			const stashes = await this.stashQueries.getAllStashes();
			logger.info(`Got ${stashes.length} stashes`);

			ctx.body = {
				status: HTTP_STATUS.OK,
				data: stashes,
			};
		} catch (error) {
			ctx.throw(ctx.status, error);
		}
	};

	public getStashById = async (
		ctx: Context,
		next: AnyFunction
	): Promise<void> => {
		try {
			const id = Number(ctx.params.stashId);
			logger.info(`Getting stashes ${id}`);
			const stash = await this.stashQueries.getStashById(id);
			logger.info(`Got ${stash.length} stashes`);

			ctx.body = {
				status: HTTP_STATUS.OK,
				data: stash,
			};
		} catch (error) {
			ctx.throw(ctx.status, error);
		}
	};

	public getStashByUserId = async (
		ctx: Context,
		next: AnyFunction
	): Promise<void> => {
		try {
			const id = Number(ctx.params.userID);
			logger.info(`Getting stashes ${id}`);
			const stashes = await this.stashQueries.getStashByUserId(id);
			logger.info(`Got ${stashes.length} stashes`);

			ctx.body = {
				status: HTTP_STATUS.OK,
				data: stashes,
			};
		} catch (error) {
			ctx.throw(ctx.status, error);
		}
	};

	public getStashesByBatchId = async (
		ctx: Context,
		next: AnyFunction
	): Promise<void> => {
		try {
			const userId = Number(ctx.params.userId);
			const batchId = Number(ctx.params.batchId);
			logger.info(`Getting stashes from user ${userId} from batch ${batchId}`);
			let stashes: Stash[] = await this.stashQueries.getStashesOfBatch(
				userId,
				batchId
			);
			logger.info(`Got ${stashes.length} stashes`);
			const stashesOutput: Stash[] = [];
			stashes = JSON.parse(JSON.stringify(stashes));
			stashes.forEach(stash => {
				stashesOutput.push(this.outputService.formatSingleStash(stash));
			});

			ctx.body = {
				status: HTTP_STATUS.OK,
				data: stashes,
			};
		} catch (error) {
			ctx.throw(ctx.status, error);
		}
	};

	public editStash = async (ctx: Context, next: AnyFunction): Promise<void> => {
		try {
			const editedStashes: Stash[] = ctx.request.body.stashes;
			const stashId = Number(ctx.params.stashId);
			const batchId = Number(ctx.params.batchId);

			logger.info(`Updating stash ${stashId} from batch ${batchId}`);
			const stashes = await this.updateStashes(editedStashes);

			const stashesOutput: Stash[] = [];
			stashes.forEach(stash => {
				stashesOutput.push(this.outputService.formatSingleStash(stash));
				logger.info(`Stash ${stash.stashId} updated`);
			});

			if (this.areThereAnyStashes(stashes)) {
				logger.info(`${stashesOutput.length} stashes updated`);
				ctx.body = {
					status: HTTP_STATUS.OK,
					data: stashesOutput,
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

	public addStash = async (ctx: Context, next: AnyFunction): Promise<void> => {
		try {
			const newStash: Stash = ctx.request.body.stashes[0];
			const userId = Number(ctx.params.userId);
			const batchId = Number(ctx.params.batchId);
			logger.info(`Adding stash to batch  ${batchId} for user ${userId}`);

			let stash: Stash = (await this.stashQueries.insertStash(newStash))[0];
			stash = JSON.parse(JSON.stringify(stash));
			delete stash.stashUserId;
			stash = this.outputService.formatSingleStash(stash);
			logger.info(`Stash ${stash.stashId} saved`);

			if (!!stash) {
				ctx.body = {
					status: HTTP_STATUS.CREATED,
					data: stash,
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

	private areThereAnyStashes = (stashes: Stash[]) => !!stashes.length;

	private updateStashes = async (stashes: Stash[]) => {
		const updatedStashes: Stash[] = [];
		await asyncForEach(stashes, async (stash: Stash) => {
			const updatedStash = await this.stashQueries.updateStash(stash);
			updatedStashes.push(JSON.parse(JSON.stringify(updatedStash[0])));
		});

		return updatedStashes;
	};
}

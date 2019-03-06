import { OutputService } from '../services/output.service';
// import { CombinedDataQueries } from '../db/queries/user_data';

import { Context } from 'koa';
// import { getLogger } from 'log4js';

import { AnyFunction } from '../types/types';
// import { HTTP_STATUS } from '../middlewares/error-handler.middleware';

// const logger = getLogger();

export class CombinedDataRouteHandlers {
	// private outputService: OutputService;
	// private combinedDataQueries: CombinedDataQueries;
	constructor(
		outputService: OutputService = new OutputService()
		// combinedDataQueries: CombinedDataQueries = new CombinedDataQueries()
	) {
		// this.outputService = outputService;
		// this.combinedDataQueries = combinedDataQueries;
	}

	public errorHandler = async (
		ctx: Context,
		next: AnyFunction
	): Promise<void> => {
		ctx.throw(ctx.status, ctx.message, 'Error');
	};

// 	public getUserDataById = async (
// 		ctx: Context,
// 		next: AnyFunction
// 	): Promise<void> => {
// 		try {
// 			const id = Number(ctx.params.userId);
// 			logger.info(`Getting data from user ${id}`);
//             const user: User[] = await this.combinedDataQueries.getUserData(id);
// 			let batches = await this.combinedDataQueries.getUserBatches(id);
// 			let stashes = await this.combinedDataQueries.getUserStashes(id);

// 			const outputData: UserData = JSON.parse(JSON.stringify(user[0]));

// 			batches = JSON.parse(JSON.stringify(batches));

// 			const formattedStashes: Stash[] = [];
// 			stashes = [...JSON.parse(JSON.stringify(stashes))];
// 			stashes.forEach((stash: Stash) => {
// 				formattedStashes.push(this.outputService.formatSingleStash(stash));
// 			});

// 			outputData.batches = batches;
// 			outputData.stashes = formattedStashes;

// 			logger.info(`Got ${outputData.firstname} ${outputData.surname} data`);

// 			ctx.body = {
// 				status: HTTP_STATUS.OK,
// 				data: outputData,
// 			};
// 		} catch (error) {
// 			ctx.throw(ctx.status, error);
// 		}
// 	};
}

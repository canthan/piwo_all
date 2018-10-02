import knex from '../connection';

export class CombinedDataQueries {
	public getUserData(userId: number) {
		return knex('users')
			.select('*')
			.where({ userId });
	}

	public getUserBatches(userId: number) {
		return knex('batches')
			.select(
				'batchId',
				'batchNumber',
				'batchName',
				'bottledOn',
				'quantityLitres',
				'quantityBottles',
				'quantityCrates'
			)
			.where({ batchUserId: userId });
	}

	public getUserStashes(userId: number) {
		return knex('stashes')
			.select('batchId', 'stashName', 'stashId', 'b050', 'b040', 'b033')
			.where({ stashUserId: userId });
	}

	public getUserBatchesStashes(userId: number, batchId: number) {
		return knex('stashes')
			.select('stashName', 'b050', 'b040', 'b033')
			.where({ batchId, stashUserId: userId });
	}
}

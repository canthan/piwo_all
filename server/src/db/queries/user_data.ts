import knex from '../connection';

export class CombinedDataQueries {
	public async getUserData(userId: number) {
		return knex('users')
			.select('*')
			.where({ userId });
	}

	public async getUserBatches(userId: number) {
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

	public async getUserStashes(userId: number) {
		return knex('stashes')
			.select('batchId', 'stashName', 'stashId', 'b050', 'b040', 'b033')
			.where({ stashUserId: userId });
	}

	public async getUserBatchesStashes(userId: number, batchId: number) {
		return knex('stashes')
			.select('stashName', 'b050', 'b040', 'b033')
			.where({ batchId, stashUserId: userId });
	}
}

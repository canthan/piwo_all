import knex from '../connection';
import { Batch } from '../../types/types';

export class BatchQueries {
	public static async getAllBatches() {
		return knex('batches').select('*');
	}

	public async getBatchesOfUser(userId: number) {
		return knex('batches')
			.select('*')
			.where({ batchUserId: userId });
	}

	public async addBatch(batch: Batch) {
		return knex('batches')
			.insert(batch)
			.returning('*');
	}

	public async deleteBatch(batchId: number) {
		return knex('batches')
			.del()
			.where({ batchId })
			.returning('*');
	}

	public async updateBatch(userId: number, batchId: number, batch: Batch) {
		return knex('batches')
			.update(batch)
			.where({
				batchId,
				batchUserId: userId,
			})
			.returning('*');
	}
}

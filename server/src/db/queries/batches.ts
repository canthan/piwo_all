import knex from '../connection';
import { Batch } from '../../types/types';

export class BatchQueries {
	public static getAllBatches() {
		return knex('batches').select('*');
	}

	public getBatchesOfUser(userId: number) {
		return knex('batches')
			.select('*')
			.where({ batchUserId: userId });
	}

	public addBatch(batch: Batch) {
		return knex('batches')
			.insert(batch)
			.returning('*');
	}

	public deleteBatch(batchId: number) {
		return knex('batches')
			.del()
			.where({ batchId })
			.returning('*');
	}

	public updateBatch(userId: number, batchId: number, batch: Batch) {
		return knex('batches')
			.update(batch)
			.where({
				batchId,
				batchUserId: userId,
			})
			.returning('*');
	}
}

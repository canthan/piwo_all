// import knex from '../connection';
// import { Stash } from '../../types/types';

// export class StashQueries {
// 	public static async getAllStashes() {
// 		return knex('stashes').select('*');
// 	}

// 	public async getStashById(stashId: number) {
// 		return knex('stashes')
// 			.select('*')
// 			.where({ stashId });
// 	}

// 	public async getStashByUserId(userId: number) {
// 		return knex('stashes')
// 			.select('*')
// 			.where({ userId });
// 	}

// 	public async getStashesOfBatch(userId: number, batchId: number) {
// 		return knex('stashes')
// 			.select('*')
// 			.where({
// 				batchId,
// 				stashUserId: userId,
// 			});
// 	}

// 	public async updateStashes(stashes: Stash[]) {
// 		let updatedStash;
// 		stashes.forEach(stash => {
// 			updatedStash = this.updateStash(stash);
// 		});

// 		return updatedStash;
// 	}

// 	public async updateStash(stash: Stash) {
// 		return knex('stashes')
// 			.update(stash)
// 			.where({ stashId: stash.stashId })
// 			.returning('*');
// 	}

// 	public async insertStash(stash: Stash) {
// 		return knex('stashes')
// 			.insert(stash)
// 			.returning('*');
// 	}

// 	public async deleteStashesFromBatch(userId: number, batchId: number) {
// 		return knex('stashes')
// 			.del()
// 			.where({
// 				batchId,
// 				stashUserId: userId,
// 			})
// 			.returning('*');
// 	}
// }

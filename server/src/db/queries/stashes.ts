import knex from '../connection';
import { Stash } from '../../types/types';

export class StashQueries {
	public static getAllStashes() {
		return knex('stashes').select('*');
	}

	public getStashById(stashId: number) {
		return knex('stashes')
			.select('*')
			.where({ stashId });
	}

	public getStashByUserId(userId: number) {
		return knex('stashes')
			.select('*')
			.where({ userId });
	}

	public getStashesOfBatch(userId: number, batchId: number) {
		return knex('stashes')
			.select('*')
			.where({
				batchId,
				stashUserId: userId,
			});
	}

	public updateStashes(stashes: Stash[]) {
		let updatedStash;
		stashes.forEach(stash => {
			updatedStash = this.updateStash(stash);
		});

		return updatedStash;
	}

	public updateStash(stash: Stash) {
		return knex('stashes')
			.update(stash)
			.where({ stashId: stash.stashId })
			.returning('*');
	}

	public insertStash(stash: Stash) {
		return knex('stashes')
			.insert(stash)
			.returning('*');
	}

	public deleteStashesFromBatch(userId: number, batchId: number) {
		return knex('stashes')
			.del()
			.where({
				batchId,
				stashUserId: userId,
			})
			.returning('*');
	}
}

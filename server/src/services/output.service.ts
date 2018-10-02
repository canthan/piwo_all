import { Stash, Batch } from '../types/types';

export class OutputService {
	public formatSingleStash(stash: Stash) {
		const singleStash = new Stash(stash.stashName, stash.batchId);
		singleStash.stashId = stash.stashId;
		this.fillBottleTypes(stash, singleStash);

		return singleStash;
	}

	public fetchStashesToBatches(batches: Batch[], stashes: Stash[]) {
		batches.forEach(batch => {
			batch.stashes = [];
			stashes.forEach(stash => {
				if (batch.batchId === stash.batchId && !!batch.stashes) {
					batch.stashes.push(stash);
				}
			});
		});

		return batches;
	}

	private fillBottleTypes(stash: Stash, singleStash: Stash) {
		for (const prop in stash) {
			if (this.checkIfKeyIsBottleType(prop, /b\d{3}/)) {
				singleStash.items[prop] = stash[prop];
			}
		}
	}

	private checkIfKeyIsBottleType(key: string, regex: RegExp) {
		return regex.exec(key) ? true : false;
	}
}

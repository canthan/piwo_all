import {
	Stash,
	StashSummary,
	GrouppedStash,
} from '../../../types/storage.types';
import { CommonStorageService } from '../common.service';

const HALF_LITER = 0.5;

export class SummaryService {
	public static createSummary(stashes: Stash[]): StashSummary[] {
		const grouppedStashes = [...this.groupStashes(stashes)];
		const stashSummary: StashSummary[] = this.composeSummary(grouppedStashes);

		return stashSummary;
	}

	private static composeSummary(
		grouppedStashes: GrouppedStash[],
		stashSummary: StashSummary[] = []
	) {
		grouppedStashes.forEach(grouppedStash => {
			const summary: StashSummary = this.createSummaryForStash(grouppedStash);
			summary.bottles.small = this.getSmallBottles(grouppedStash);
			summary.litres = this.getLiters(grouppedStash);

			stashSummary.push(summary);
		});

		return stashSummary;
	}

	private static createSummaryForStash(
		grouppedStash: GrouppedStash
	): StashSummary {
		return new StashSummary(grouppedStash.stashName, grouppedStash.items.b050);
	}

	private static getLiters(grouppedStash: GrouppedStash): number {
		let litres = 0;
		for (const [key, value] of Object.entries(grouppedStash.items)) {
			litres += CommonStorageService.decodeBottleVolume(key) * value;
		}

		return litres;
	}

	private static getSmallBottles(grouppedStash: GrouppedStash): number {
		let bottlesSmall = 0;
		for (const [key, value] of Object.entries(grouppedStash.items)) {
			if (CommonStorageService.decodeBottleVolume(key) < HALF_LITER) {
				bottlesSmall += value;
			}
		}

		return bottlesSmall;
	}

	private static groupStashes(stashes: Stash[]): GrouppedStash[] {
		const grouppedStashes: GrouppedStash[] = [];
		stashes.forEach(stash => {
			grouppedStashes.find(groupped => stash.stashName === groupped.stashName)
				? this.addBottles(grouppedStashes, stash)
				: this.createNewGroup(grouppedStashes, stash);
		});

		return grouppedStashes;
	}

	private static addBottles(grouppedStashes: GrouppedStash[], stash: Stash) {
		const grouppedStash = grouppedStashes.find(
			groupped => groupped.stashName === stash.stashName
		);
		if (!grouppedStash) {
			return;
		}
		Object.keys(stash.items).forEach(item => {
			const quantity = Object.keys(grouppedStash.items).find(
				grouppedItem => grouppedItem === item
			);
			if (!quantity) return;
			grouppedStash.items[quantity] += stash.items[quantity];
		});
	}

	private static createNewGroup(
		grouppedStashes: GrouppedStash[],
		stash: Stash
	) {
		const { stashName, items } = stash;
		grouppedStashes.push({ stashName, items: { ...items }, cratesTotal: 0 });
	}
}

export default SummaryService;

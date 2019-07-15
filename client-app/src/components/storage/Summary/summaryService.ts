import {
  Stash,
  StashSummary,
  GrouppedStash,
} from '../../../types/storage.types';
import { CommonStorageService } from '../common.service';
import { initialStashSummary, HALF_LITER } from '../../../types/storage.constants';


export class SummaryService {
  public static createSummary(stashes: Stash[]): StashSummary[] {
    const grouppedStashes = [...this.groupStashes(stashes)];
    const stashSummary: StashSummary[] = this.composeSummary(grouppedStashes);

    return stashSummary;
  }

  private static composeSummary(grouppedStashes: GrouppedStash[], stashSummary: StashSummary[] = []) {
    grouppedStashes.forEach(grouppedStash => {
      const summary: StashSummary = this.createSummaryForStash(grouppedStash);
      summary.bottles.small = this.getSmallBottles(grouppedStash);
      summary.litres = this.getLiters(grouppedStash);

      stashSummary.push(summary);
    });

    return stashSummary;
  }

  private static createSummaryForStash(grouppedStash: GrouppedStash): StashSummary {
    return {
      ...initialStashSummary,
      name: grouppedStash.name,
      bottles: {
        ...initialStashSummary.bottles,
        halfLiter: grouppedStash.items.b050,
      },
    }
  }

  private static getLiters(grouppedStash: GrouppedStash): number {
    return Object.entries(grouppedStash.items).reduce((acc, item) => {
      return acc + CommonStorageService.decodeBottleVolume(item[0]) * item[1];
    }, 0);
  }

  private static getSmallBottles(grouppedStash: GrouppedStash): number {
    return Object.entries(grouppedStash.items).filter(
      item => CommonStorageService.decodeBottleVolume(item[0]) < HALF_LITER
    ).reduce((acc, item) => {
      return acc + item[1];
    }, 0);
  }

  private static groupStashes(stashes: Stash[]): GrouppedStash[] {
    const grouppedStashes: GrouppedStash[] = [];
    stashes.forEach(stash => {
      stash.name = stash.name.toUpperCase();
      grouppedStashes.find(groupped => stash.name === groupped.name)
        ? this.addBottles(grouppedStashes, stash)
        : this.createNewGroup(grouppedStashes, stash);
    });

    return grouppedStashes;
  }

  private static addBottles(grouppedStashes: GrouppedStash[], stash: Stash) {
    const grouppedStash = grouppedStashes.find(groupped => groupped.name === stash.name);

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

  private static createNewGroup(grouppedStashes: GrouppedStash[], stash: Stash) {
    const { name, items } = stash;
    grouppedStashes.push({ name, items: { ...items }, cratesTotal: 0 });
  }
}

export default SummaryService;

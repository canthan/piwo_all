import { getLitres, getHalfLiterBottleAmount, getSmallBottleAmount } from '../common.service';

import { Stash, StashSummary } from '../../../types/storage.types';
import { initialStashSummary } from '../../../types/storage.constants';
import { StashConfig } from '../../../types/app.types';
import { BOTTLES_IN_CRATE } from './../../../types/storage.constants';

export class SummaryService {
  public static createSummary(stashes: Stash[], stashConfig: StashConfig[]): StashSummary[] {
    this.nameToLowercase(stashes);

    const summary: StashSummary[] = stashConfig.map(config => {

      const { litres = 0, bottles = initialStashSummary.bottles } = this.decomposeStashes(stashes, config.name);
      const fullCrates = bottles.halfLiter / BOTTLES_IN_CRATE;

      return {
        ...initialStashSummary,
        name: config.name.toUpperCase(),
        litres,
        bottles,
        crates: {
          overall: config.cratesTotal,
          full: fullCrates,
          empty: config.cratesTotal - fullCrates,
        },
      }
    });

    return summary;
  }

  private static nameToLowercase(stashes: Stash[]) {
    stashes.forEach(stash => stash.name = stash.name.toLocaleLowerCase());
  }

  private static decomposeStashes(stashes: Stash[], stashName: string): Partial<StashSummary> {
    const stashByName = stashes.filter(stash => stash.name === stashName);

    return {
      litres: getLitres(stashByName),
      bottles: {
        halfLiter: getHalfLiterBottleAmount(stashByName),
        small: getSmallBottleAmount(stashByName),
      }
    }
  }
}

export default SummaryService;

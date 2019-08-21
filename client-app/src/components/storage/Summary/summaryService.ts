import { getLitres, getHalfLiterBottleAmount, getSmallBottleAmount } from '../common.service';

import { Stash, StashSummary } from '../../../types/storage.types';
import { initialStashSummary } from '../../../types/storage.constants';
import { StashConfig } from '../../../types/app.types';
import { BOTTLES_IN_CRATE } from './../../../types/storage.constants';

export const createBasicSummary = (stashConfig: StashConfig[]): StashSummary[] => stashConfig.map(stash => ({
  ...initialStashSummary,
  name: stash.name.toUpperCase(),
  crates: {
    ...initialStashSummary.crates,
    overall: stash.cratesTotal,
  }
}))

export const fillSummaryFromStashes = (stashes: Stash[], initialSummary: StashSummary[]): StashSummary[] => {
  nameToUppercase(stashes);

  return initialSummary.map(summary => {

    const { litres = 0, bottles = initialStashSummary.bottles } = decomposeStashes(stashes, summary.name);
    const fullCrates = bottles.halfLiter / BOTTLES_IN_CRATE;

    return {
      ...summary,
      litres,
      bottles,
      crates: {
        ...summary.crates,
        full: fullCrates,
        empty: summary.crates.overall - fullCrates,
      },
    }
  });
}

const nameToLowercase = (stashes: Stash[]) => {
  stashes.forEach(stash => stash.name = stash.name.toLocaleLowerCase());
}

const nameToUppercase = (stashes: Stash[]) => {
  stashes.forEach(stash => stash.name = stash.name.toLocaleUpperCase());
}

const decomposeStashes = (stashes: Stash[], stashName: string): Partial<StashSummary> => {
  const stashByName = stashes.filter(stash => stash.name === stashName);

  return {
    litres: getLitres(stashByName),
    bottles: {
      halfLiter: getHalfLiterBottleAmount(stashByName),
      small: getSmallBottleAmount(stashByName),
    }
  }
}

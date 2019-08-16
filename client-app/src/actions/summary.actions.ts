import { AnyAction } from 'redux';

import { SummaryService } from './../components/storage/Summary/summaryService';

import {
  GET_SUMMARY_FROM_STASHES,
  CHANGE_SUMMARY_BOTTLES_AMOUNT,
  CHANGE_SUMMARY_CRATES,
} from './../constants/summary.action.types';
import { StashConfig } from './../types/app.types';
import { Stash, StashSummary } from '../types/storage.types';
import { ReduxAction } from '../types/common.types';

export const getSummaryFromStashes = (stashes: Stash[], stashConfig: StashConfig[]): ReduxAction<StashSummary[]> => {
  const summary: StashSummary[] = SummaryService.createSummary(stashes, stashConfig);

  return {
    payload: summary,
    type: GET_SUMMARY_FROM_STASHES,
  };
};

export const changeSummaryCrates = (summary: StashSummary[], stashConfig: StashConfig[]): ReduxAction<StashSummary[]> => {
  const updatedSummary: StashSummary[] = summary.map(stash => {
    const config = stashConfig.find(config => config.name.toLocaleLowerCase() === stash.name.toLocaleLowerCase());

    if (!config) return stash;

    return {
      ...stash,
      crates: {
        ...stash.crates,
        overall: config.cratesTotal,
        empty: config.cratesTotal - stash.crates.full,
      }
    }
  });

  return {
    payload: updatedSummary,
    type: CHANGE_SUMMARY_CRATES,
  }
}

export const changeSummaryBottlesAmount = (name: string, amount: number, volume: string): AnyAction => ({
  payload: { name, amount, volume },
  type: CHANGE_SUMMARY_BOTTLES_AMOUNT,
});

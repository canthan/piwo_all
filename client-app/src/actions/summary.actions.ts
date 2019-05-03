import { AnyAction } from 'redux';

import {
  GET_SUMMARY_FROM_STASHES,
  CHANGE_SUMMARY_BOTTLES_AMOUNT,
} from './../constants/summary.action.types';
import { Stash, StashSummary } from '../types/storage.types';
import { ReduxAction } from '../types/common.types';
import { SummaryService } from './../components/storage/Summary/summaryService';

export const getSummaryFromStashes = (stashes: Stash[]): ReduxAction<StashSummary[]> => {
  const summary: StashSummary[] = SummaryService.createSummary(stashes);

  return {
    payload: summary,
    type: GET_SUMMARY_FROM_STASHES,
  };
};

export const changeSummaryBottlesAmount = (
  name: string,
  amount: number,
  bottleType: string
): AnyAction => ({
  payload: { name, amount, bottleType },
  type: CHANGE_SUMMARY_BOTTLES_AMOUNT,
});

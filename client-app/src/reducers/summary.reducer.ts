import { createConditionalSliceReducer } from './utils';

import {
  GET_SUMMARY_FROM_STASHES,
  CHANGE_SUMMARY_CRATES,
  REMOVE_SUMMARY_BY_NAME,
} from './../constants/summary.action.types';
import { SummaryState } from './../types/storage.types';
import { StashSummary } from '../types/storage.types';

const HALF_LITER = 0.5;
export const initialSummaryState = {
  summary: {
    summary: [],
  },
};

const summaryReducerMapping = () => ({
  [GET_SUMMARY_FROM_STASHES]: (state: SummaryState, summary: StashSummary[]) => ({
    ...state,
    ...{ summary },
  }),
  [CHANGE_SUMMARY_CRATES]: (state: SummaryState, summary: StashSummary[]) => ({
    ...state,
    ...{ summary },
  }),
  [REMOVE_SUMMARY_BY_NAME]: (state: SummaryState, removedStashNames: string[]) => ({
    ...state,
    ...{
      summary: state.summary.filter(stash => !removedStashNames.includes(stash.name.toLocaleUpperCase()))
    },
  })
  // [ADD_STASHES]: (state: SummaryState, summary: StashSummary[]) => ({
  //   summary: [
  //     ...state.summary,
  //     ...summary,
  //   ]
  // })
});

export const summaryReducer = createConditionalSliceReducer(
  'summary',
  summaryReducerMapping(),
  initialSummaryState
);

import { createConditionalSliceReducer } from './utils';

import {
  GET_SUMMARY_FROM_STASHES,
  CHANGE_SUMMARY_CRATES,
  REMOVE_SUMMARY_BY_NAME,
  EDIT_SUMMARY_NAMES,
} from './../constants/summary.action.types';
import { SummaryState } from './../types/storage.types';
import { StashSummary } from '../types/storage.types';
import { EditedStashName } from '../types/app.types';

export const initialSummaryState = {
  summary: {
    summary: [],
  },
};

const changeSummaryNames = (summary: StashSummary[], editedStashNames: EditedStashName[]): StashSummary[] => {
  return summary.map(stash => {
    const edited = editedStashNames.find(editedStash => editedStash.oldName === stash.name.toLocaleUpperCase());

    return edited
      ? { ...stash, name: edited.newName }
      : stash
  })
}

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
  }),
  [EDIT_SUMMARY_NAMES]: (state: SummaryState, editedStashNames: EditedStashName[]) => ({
    ...state,
    ...{ summary: changeSummaryNames(state.summary, editedStashNames) },
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

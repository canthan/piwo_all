import { createBasicSummary, fillSummaryFromStashes } from './../components/storage/Summary/summaryService';

import {
  GET_SUMMARY_FROM_STASHES,
  CHANGE_SUMMARY_CRATES,
  REMOVE_SUMMARY_BY_NAME,
  EDIT_SUMMARY_NAMES,
} from './../constants/summary.action.types';
import { StashConfig, EditedStashName } from './../types/app.types';
import { Stash, StashSummary } from '../types/storage.types';
import { ReduxAction } from '../types/common.types';

export const getSummaryFromStashes = (stashes: Stash[], stashConfig: StashConfig[]): ReduxAction<StashSummary[]> => {
  const basicSummary = createBasicSummary(stashConfig);
  const summary: StashSummary[] = fillSummaryFromStashes(stashes, basicSummary);

  return {
    payload: summary,
    type: GET_SUMMARY_FROM_STASHES,
  };
};

export const removeSummaryByName = (names: string[]): ReduxAction<string[]> => ({
  type: REMOVE_SUMMARY_BY_NAME,
  payload: names.map(name => name.toLocaleUpperCase()),
})

export const editSummaryNames = (editedNames: EditedStashName[]): ReduxAction<EditedStashName[]> => ({
  type: EDIT_SUMMARY_NAMES,
  payload: editedNames.map(names => ({
    newName: names.newName.toLocaleUpperCase(),
    oldName: names.oldName.toLocaleUpperCase(),
  })),
})

// export const addStashesSummary = (summary: StashSummary[], stashConfig: StashConfig[]): ReduxAction<StashSummary[]> => {
//   const summaryStashNames = summary.map(s => s.name);
//   const stashConfigNames = stashConfig.map(s => s.name.toLocaleUpperCase());

//   const addedStashes = stashConfigNames.filter(name => !summaryStashNames.includes(name));

//   if (addedStashes.length) {
//     summary = [
//       ...addedStashes.map(stash => ({
//         ...initialStashSummary,
//         name: stash,
//       }))
//     ]
//   }

//   return {
//     payload: summary,
//     type: ADD_STASHES,
//   };
// }

export const changeSummaryCrates = (summary: StashSummary[], stashConfig: StashConfig[]): ReduxAction<StashSummary[]> => {
  const summaryStashNames = summary.map(s => s.name);
  const stashConfigNames = stashConfig.map(s => s.name.toLocaleUpperCase());
  const addedStashesNames = stashConfigNames.filter(name => !summaryStashNames.includes(name));

  const updatedSummary: StashSummary[] = summary.map(stash => {
    const config = stashConfig.find(config => config.name.toLocaleUpperCase() === stash.name.toLocaleUpperCase());

    return !config
      ? stash
      : {
        ...stash,
        crates: {
          ...stash.crates,
          overall: config.cratesTotal,
          empty: config.cratesTotal - stash.crates.full,
        }
      }
  });

  const addedStashes = createBasicSummary(stashConfig.filter(config => addedStashesNames.includes(config.name.toLocaleUpperCase())));

  return {
    payload: [...updatedSummary, ...addedStashes],
    type: CHANGE_SUMMARY_CRATES,
  }
}

import { StashesState } from './../../../client/src/types/storage.types';
import { Stash } from '../types/storage.types';
import {
  ADD_STASH_REQUEST,
  ADD_STASH_SUCCESS,
  ADD_STASH_FAILURE,
  UPDATE_STASHES_REQUEST,
  UPDATE_STASHES_SUCCESS,
  UPDATE_STASHES_FAILURE,
  DELETE_STASH_REQUEST,
  DELETE_STASH_SUCCESS,
  DELETE_STASH_FAILURE,
  GET_STASHES_FROM_USER_DATA,
} from './../constants/stashes.action.types';
import { DELETE_BATCH_SUCCESS } from './../constants/batches.actions.types';

import { createConditionalSliceReducer } from './utils';

export const initialStashesState = {
  stashes: {
    stashes: [],
  },
};

const updateStashes = (stashes: Stash[], updatedStashes: Stash[]): Stash[] => {
  updatedStashes.forEach(updatedStash => {
    stashes.map(
      stash => (stash.stashId === updatedStash.stashId ? updatedStash : stash)
    );
  });

  return stashes;
};

const stashesReducerMapping = () => ({
  [DELETE_STASH_REQUEST]: (state: StashesState) => ({ ...state }),
  [ADD_STASH_REQUEST]: (state: StashesState) => ({ ...state }),
  [UPDATE_STASHES_REQUEST]: (state: StashesState) => ({ ...state }),

  [DELETE_STASH_SUCCESS]: (state: StashesState, stashId: number) => ({
    ...state,
    ...{ stashes: state.stashes.filter(stash => stash.stashId !== stashId) },
  }),
  // [ADD_STASH_SUCCESS]: (state, { newStash }) => ({
  [ADD_STASH_SUCCESS]: (state: StashesState, newStash: Stash) => ({
    ...state,
    ...{
      stashes: [...state.stashes, newStash],
    },
  }),
  [UPDATE_STASHES_SUCCESS]: (state: StashesState, updatedStashes: Stash[]) => ({
    // [UPDATE_STASHES_SUCCESS]: (state, { updatedStashes }) => ({
    ...state,
    ...{
      stashes: [...updateStashes([...state.stashes], updatedStashes)],
      // stashes: [...updateStashes([...state.stashes], updatedStashes)],
    },
  }),
  [DELETE_BATCH_SUCCESS]: (state: StashesState, batchId: number) => ({
    // [DELETE_BATCH_SUCCESS]: (state, { batchId }) => ({
    ...state,
    ...{
      stashes: [...state.stashes.filter(stash => stash.batchId !== batchId)],
    },
  }),
  [GET_STASHES_FROM_USER_DATA]: (state: StashesState, stashes: Stash[]) => ({
    // [GET_STASHES_FROM_USER_DATA]: (state, { stashes }) => ({
    ...state,
    ...{ stashes: [...stashes] },
  }),

  [ADD_STASH_FAILURE]: (state: StashesState, payload: unknown) => ({
    // [ADD_STASH_FAILURE]: (state, payload) => ({
    ...state,
    ...{ error: payload },
  }),
  [UPDATE_STASHES_FAILURE]: (state: StashesState, payload: unknown) => ({
    // [UPDATE_STASHES_FAILURE]: (state, payload) => ({
    ...state,
    ...{ error: payload },
  }),
  [DELETE_STASH_FAILURE]: (state: StashesState, payload: unknown) => ({
    // [DELETE_STASH_FAILURE]: (state, payload) => ({
    ...state,
    ...{ error: payload },
  }),
});

export const stashesReducer = createConditionalSliceReducer(
  'stashes',
  stashesReducerMapping(),
  initialStashesState
);

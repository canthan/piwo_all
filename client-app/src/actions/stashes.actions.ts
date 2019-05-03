import Axios, { AxiosResponse, AxiosError } from 'axios';

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
import { CONFIG } from './../config/config';
import { Stash } from '../types/storage.types';
import { ReduxAction, AsyncAction, Response } from '../types/common.types';

export const addStashRequest = (): ReduxAction<undefined> => ({
  type: ADD_STASH_REQUEST,
});

export const addStashSuccess = (newStash: Stash): ReduxAction<Stash> => ({
  payload: newStash,
  type: ADD_STASH_SUCCESS,
});

export const addStashFailure = (error: AxiosError): ReduxAction<AxiosError> => ({
  payload: error,
  type: ADD_STASH_FAILURE,
});

export const updateStashesRequest = (): ReduxAction<undefined> => ({
  type: UPDATE_STASHES_REQUEST,
});

export const updateStashesSuccess = (updatedStashes: Stash[]): ReduxAction<Stash[]> => ({
  payload: updatedStashes,
  type: UPDATE_STASHES_SUCCESS,
});

export const updateStashesFailure = (error: AxiosError): ReduxAction<AxiosError> => ({
  payload: error,
  type: UPDATE_STASHES_FAILURE,
});

export const deleteStashRequest = (): ReduxAction<undefined> => ({
  type: DELETE_STASH_REQUEST,
});

export const deleteStashSuccess = (stashId: string): ReduxAction<string> => ({
  payload: stashId,
  type: DELETE_STASH_SUCCESS,
});

export const deleteStashFailure = (error: AxiosError): ReduxAction<AxiosError> => ({
  payload: error,
  type: DELETE_STASH_FAILURE,
});

export const getStashesFromUserData = (stashes: Stash[]): ReduxAction<Stash[]> => ({
  payload: stashes,
  type: GET_STASHES_FROM_USER_DATA,
});

export const deleteStashAsync = (userId: string, stashId: string): AsyncAction => async (
  dispatch
) => {
  dispatch(deleteStashRequest());
  try {
    const response = await Axios.delete(
      `${CONFIG.STASHES_API}/${userId}/${stashId}`
    );
    const deletedStash = response.data.data.batches.find(
      (stash: Stash) => (stash.stashId = stashId)
    );

    return dispatch(deleteStashSuccess(deletedStash.stashId));
  } catch (error) {
    return dispatch(deleteStashFailure(error));
  }
};

export const addStashAsync = (userId: string, batchId: string, name: string): AsyncAction => async (
  dispatch
) => {
  dispatch(addStashRequest());
  try {
    const response: AxiosResponse<Response<Stash>> = await Axios.post(
      `${CONFIG.STASHES_API}/${userId}/${batchId}`,
      { name }
    );
    const newStashResponse: Stash = { ...response.data.data };

    return dispatch(addStashSuccess(newStashResponse));
  } catch (error) {
    return dispatch(addStashFailure(error));
  }
};

export const updateStashesAsync = (userId: string, batchId: string, stashes: Stash[]): AsyncAction => async (
  dispatch
) => {
  dispatch(updateStashesRequest());
  try {
    const response: AxiosResponse<Response<Stash[]>> = await Axios.put(
      `${CONFIG.STASHES_API}/${userId}/${batchId}`,
      { stashes }
    );
    const updatedStashes: Stash[] = [...response.data.data];

    return dispatch(updateStashesSuccess(updatedStashes));
  } catch (error) {
    return dispatch(updateStashesFailure(error));
  }
};

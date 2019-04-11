import Axios, { AxiosResponse, AxiosError } from 'axios';

import { CommonStorageService } from './../components/storage/common.service';
import { AsyncAction, Response, ReduxAction, AnyDispatch } from './../types/app.types';
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

export const deleteStashSuccess = (stashId: number): ReduxAction<number> => ({
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

export const deleteStashAsync = (userId: number, stashId: number): AsyncAction => async (
  dispatch: AnyDispatch
): Promise<ReduxAction<number | AxiosError>> => {
  dispatch(deleteStashRequest());
  try {
    const response = await Axios.delete(
      `http://localhost:1337/stashes/${userId}/${stashId}`
    );
    const deletedStash = response.data.data.batches.find(
      (stash: Stash) => (stash.stashId = stashId)
    );

    return dispatch(deleteStashSuccess(deletedStash.stashId));
  } catch (error) {
    return dispatch(deleteStashFailure(error));
  }
};

export const addStashAsync = (userId: number, batchId: number, newStash: Stash): AsyncAction => async (
  dispatch: AnyDispatch
): Promise<ReduxAction<Stash | AxiosError>> => {
  dispatch(addStashRequest());
  try {
    const response: AxiosResponse<Response<Stash>> = await Axios.post(
      `http://localhost:1337/stashes/${userId}/${batchId}`,
      CommonStorageService.flattenItemsForRequest([newStash])
    );
    const newStashResponse: Stash = { ...response.data.data };

    return dispatch(addStashSuccess(newStashResponse));
  } catch (error) {
    return dispatch(addStashFailure(error));
  }
};

export const updateStashesAsync = (userId: number, batchId: number, stashes: Stash[]): AsyncAction => async (
  dispatch: AnyDispatch
): Promise<ReduxAction<Stash[] | AxiosError>> => {
  dispatch(updateStashesRequest());
  try {
    const response: AxiosResponse<Response<Stash[]>> = await Axios.put(
      `http://localhost:1337/stashes/${userId}/${batchId}`,
      CommonStorageService.flattenItemsForRequest(stashes)
    );
    const updatedStashes: Stash[] = [...response.data.data];

    return dispatch(updateStashesSuccess(updatedStashes));
  } catch (error) {
    return dispatch(updateStashesFailure(error));
  }
};

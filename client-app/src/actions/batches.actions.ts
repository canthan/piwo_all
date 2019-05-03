import Axios, { AxiosResponse, AxiosError } from 'axios';

import {
  GET_USER_STORAGE_REQUEST,
  GET_USER_STORAGE_SUCCESS,
  GET_USER_STORAGE_FAILURE,
  ADD_BATCH_REQUEST,
  ADD_BATCH_SUCCESS,
  ADD_BATCH_FAILURE,
  EDIT_BATCH_DATA_REQUEST,
  EDIT_BATCH_DATA_SUCCESS,
  EDIT_BATCH_DATA_FAILURE,
  DELETE_BATCH_REQUEST,
  DELETE_BATCH_SUCCESS,
  DELETE_BATCH_FAILURE,
  GET_BATCHES_FROM_USER_DATA,
} from './../constants/batches.actions.types';
import { CONFIG } from '../config/config';
import { Batch, EmptyBatch, DeletedRecords } from '../types/storage.types';
import { ReduxAction, AsyncAction, Response } from '../types/common.types';
import { CommonStorageService } from './../components/storage/common.service';

export const getBatchesDataRequest = (): ReduxAction<undefined> => ({
  type: GET_USER_STORAGE_REQUEST,
});

export const getBatchesDataSuccess = (data: Batch[]): ReduxAction<Batch[]> => {
  const batches = CommonStorageService.formatDateForDisplay(data);
  CommonStorageService.calculateQuantities(batches);

  return {
    payload: batches,
    type: GET_USER_STORAGE_SUCCESS,
  };
};
export const getBatchesDataFailure = (error: AxiosError): ReduxAction<AxiosError> => ({
  payload: error,
  type: GET_USER_STORAGE_FAILURE,
});

export const addBatchRequest = (): ReduxAction<undefined> => ({
  type: ADD_BATCH_REQUEST,
});

export const addBatchSuccess = (batch: Batch): ReduxAction<Batch> => {
  const newBatch = CommonStorageService.formatDateForDisplay([batch])[0];

  return {
    payload: newBatch,
    type: ADD_BATCH_SUCCESS,
  };
};

export const addBatchFailure = (error: AxiosError): ReduxAction<AxiosError> => ({
  payload: error,
  type: ADD_BATCH_FAILURE,
});

export const editBatchDataRequest = (): ReduxAction<undefined> => ({
  type: EDIT_BATCH_DATA_REQUEST,
});

export const editBatchDataSuccess = (editedBatch: Batch): ReduxAction<Batch> => {
  const formattedBatch = CommonStorageService.formatDateForDisplay([
    editedBatch,
  ])[0];

  return {
    payload: formattedBatch,
    type: EDIT_BATCH_DATA_SUCCESS,
  };
};

export const editBatchDataFailure = (error: AxiosError): ReduxAction<AxiosError> => ({
  payload: error,
  type: EDIT_BATCH_DATA_FAILURE,
});

export const deleteBatchRequest = (): ReduxAction<undefined> => ({
  type: DELETE_BATCH_REQUEST,
});

export const deleteBatchSuccess = (batchId: string): ReduxAction<string> => ({
  payload: batchId,
  type: DELETE_BATCH_SUCCESS,
});

export const deleteBatchFailure = (error: AxiosError): ReduxAction<AxiosError> => ({
  payload: error,
  type: DELETE_BATCH_FAILURE,
});

export const getBatchesFromUserData = (batches: Batch[]): ReduxAction<Batch[]> => {
  const formattedBatches = CommonStorageService.formatDateForDisplay(batches);
  formattedBatches.forEach(batch => delete batch.stashes);

  return {
    payload: batches,
    type: GET_BATCHES_FROM_USER_DATA,
  };
};

export const getBatchesDataAsync = (userId: string): AsyncAction => async (
  dispatch
) => {
  dispatch(getBatchesDataRequest());
  try {
    const response = await Axios.get(`${CONFIG.BATCHES_API}/${userId}`);

    return dispatch(getBatchesDataSuccess(response.data));
  } catch (error) {
    return dispatch(getBatchesDataFailure(error));
  }
};

export const deleteBatchAsync = (userId: string, batchId: string): AsyncAction => async (
  dispatch
) => {
  dispatch(deleteBatchRequest());
  try {
    const response: AxiosResponse<{ data: DeletedRecords }> = await Axios.delete(
      `${CONFIG.BATCHES_API}/${userId}/${batchId}`
    );
    const deletedBatch = response.data.data.batchIds.find(
      (removedbatchId: string) => removedbatchId === batchId
    );

    if (deletedBatch) {
      return dispatch(deleteBatchSuccess(deletedBatch));
    }
  } catch (error) {
    return dispatch(deleteBatchFailure(error));
  }
};

export const addBatchAsync = (userId: string, newBatch: EmptyBatch): AsyncAction => async (
  dispatch
) => {
  dispatch(addBatchRequest());
  try {
    const response: AxiosResponse<Response<Batch>> = await Axios.post(
      `${CONFIG.BATCHES_API}/${userId}`,
      newBatch
    );
    const newBatchResponse = response.data.data;

    return dispatch(addBatchSuccess(newBatchResponse));
  } catch (error) {
    return dispatch(addBatchFailure(error));
  }
};

export const editBatchDataAsync = (userId: string, batchId: string, batchData: EmptyBatch): AsyncAction => async (
  dispatch
) => {
  dispatch(editBatchDataRequest());
  try {
    const response: AxiosResponse<Response<Batch>> = await Axios.put(
      `${CONFIG.BATCHES_API}/${userId}/${batchId}`,
      { batch: batchData }
    );
    const updatedBatch: Batch = response.data.data;

    return dispatch(editBatchDataSuccess(updatedBatch));
  } catch (error) {
    return dispatch(editBatchDataFailure(error));
  }
};

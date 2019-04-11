import Axios, { AxiosResponse, AxiosError } from 'axios';

import { CommonStorageService } from './../components/storage/common.service';
import { AsyncAction, Response, ReduxAction, AnyDispatch } from './../types/app.types';
import { Batch, EmptyBatch, BatchInDto } from '../types/storage.types';

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

export const deleteBatchSuccess = (batchId: number): ReduxAction<number> => ({
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

export const getBatchesDataAsync = (userId: number): AsyncAction => async (
  dispatch: AnyDispatch
  ): Promise<ReduxAction<Batch[] | AxiosError>> => {
  dispatch(getBatchesDataRequest());
  try {
    const response = await Axios.get(`http://localhost:1337/batches/${userId}`);

    return dispatch(getBatchesDataSuccess(response.data));
  } catch (error) {
    return dispatch(getBatchesDataFailure(error));
  }
};

export const deleteBatchAsync = (userId: number, batchId: number): AsyncAction => async (
  dispatch: AnyDispatch
  ): Promise<ReduxAction<number | AxiosError>> => {
  dispatch(deleteBatchRequest());
  try {
    const response = await Axios.delete(
      `http://localhost:1337/batches/${userId}/${batchId}`
    );
    const deletedBatch = response.data.data.batches.find(
      (batch: BatchInDto) => (batch.batchId = batchId)
    );

    return dispatch(deleteBatchSuccess(deletedBatch.batchId));
  } catch (error) {
    return dispatch(deleteBatchFailure(error));
  }
};

export const addBatchAsync = (userId: number, newBatch: EmptyBatch): AsyncAction => async (
  dispatch: AnyDispatch
  ): Promise<ReduxAction<Batch | AxiosError>> => {
  dispatch(addBatchRequest());
  try {
    const response: AxiosResponse<Response<Batch>> = await Axios.post(
      `http://localhost:1337/batches/${userId}`,
      newBatch
    );
    const newBatchResponse = response.data.data;

    return dispatch(addBatchSuccess(newBatchResponse));
  } catch (error) {
    return dispatch(addBatchFailure(error));
  }
};

export const editBatchDataAsync = (userId: number, batchId: number, batchData: EmptyBatch): AsyncAction => async (
  dispatch: AnyDispatch
  ): Promise<ReduxAction<Batch | AxiosError>> => {
  dispatch(editBatchDataRequest());
  try {
    const response: AxiosResponse<Response<Batch>> = await Axios.put(
      `http://localhost:1337/batches/${userId}/${batchId}`,
      { batch: batchData }
    );
    const updatedBatch: Batch = response.data.data;

    return dispatch(editBatchDataSuccess(updatedBatch));
  } catch (error) {
    return dispatch(editBatchDataFailure(error));
  }
};

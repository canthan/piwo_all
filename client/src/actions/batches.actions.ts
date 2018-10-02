import { AnyAction } from 'redux';
import { Dispatch } from 'react-redux';
import Axios, { AxiosResponse, AxiosError } from 'axios';

import { CommonStorageService } from './../components/storage/common.service';

import { AsyncAction, Response } from './../types/app.types';
import { Batch, EmptyBatch } from '../types/storage.types';

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

export const getBatchesDataRequest = (): AnyAction => ({
	type: GET_USER_STORAGE_REQUEST,
});

export const getBatchesDataSuccess = (data: Batch[]): AnyAction => {
	const batches = CommonStorageService.formatDateForDisplay(data);
	CommonStorageService.calculateQuantities(batches);

	return {
		payload: batches,
		type: GET_USER_STORAGE_SUCCESS,
	};
};
export const getBatchesDataFailure = (error): AnyAction => ({
	payload: error,
	type: GET_USER_STORAGE_FAILURE,
});

export const addBatchRequest = (): AnyAction => ({
	type: ADD_BATCH_REQUEST,
});

export const addBatchSuccess = (batch: Batch): AnyAction => {
	const newBatch = CommonStorageService.formatDateForDisplay([batch])[0];

	return {
		payload: { newBatch },
		type: ADD_BATCH_SUCCESS,
	};
};

export const addBatchFailure = (error: AxiosError): AnyAction => ({
	payload: error,
	type: ADD_BATCH_FAILURE,
});

export const editBatchDataRequest = (): AnyAction => ({
	type: EDIT_BATCH_DATA_REQUEST,
});

export const editBatchDataSuccess = (editedBatch: Batch): AnyAction => {
	const formattedBatch = CommonStorageService.formatDateForDisplay([
		editedBatch,
	])[0];

	return {
		payload: { formattedBatch },
		type: EDIT_BATCH_DATA_SUCCESS,
	};
};

export const editBatchDataFailure = (error: AxiosError): AnyAction => ({
	payload: error,
	type: EDIT_BATCH_DATA_FAILURE,
});

export const deleteBatchRequest = (): AnyAction => ({
	type: DELETE_BATCH_REQUEST,
});

export const deleteBatchSuccess = (batchId: number): AnyAction => ({
	payload: { batchId },
	type: DELETE_BATCH_SUCCESS,
});

export const deleteBatchFailure = (error: AxiosError): AnyAction => ({
	payload: error,
	type: DELETE_BATCH_FAILURE,
});

export const getBatchesFromUserData = (batches: Batch[]) => {
	const formattedBatches = CommonStorageService.formatDateForDisplay(batches);
	formattedBatches.forEach(batch => delete batch.stashes);

	return {
		payload: { batches },
		type: GET_BATCHES_FROM_USER_DATA,
	};
};

export const getBatchesDataAsync = (userId: number) => async (
	dispatch: Dispatch<AnyAction>
) => {
	dispatch(getBatchesDataRequest());
	try {
		const response = await Axios.get(`http://localhost:1337/batches/${userId}`);

		return dispatch(getBatchesDataSuccess(response.data));
	} catch (error) {
		return dispatch(getBatchesDataFailure(error));
	}
};

export const deleteBatchAsync = (
	userId: number,
	batchId: number
): AsyncAction => async (dispatch: Dispatch<AnyAction>) => {
	dispatch(deleteBatchRequest());
	try {
		const response = await Axios.delete(
			`http://localhost:1337/batches/${userId}/${batchId}`
		);
		const deletedBatch = response.data.data.batches.find(
			batch => (batch.batchId = batchId)
		);

		return dispatch(deleteBatchSuccess(deletedBatch.batchId));
	} catch (error) {
		return dispatch(deleteBatchFailure(error));
	}
};

export const addBatchAsync = (userId: number, newBatch: EmptyBatch) => async (
	dispatch: Dispatch<AnyAction>
) => {
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

export const editBatchDataAsync = (
	userId: number,
	batchId: number,
	batchData: EmptyBatch
) => async (dispatch: Dispatch<AnyAction>) => {
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

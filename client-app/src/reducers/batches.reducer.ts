import { AnyFunction } from './../../../backend/batches-service/src/types/types';
import { BatchInDto } from './../types/storage.types';
import { BatchesState, Batch } from './../../../client/src/types/storage.types';
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
} from './../constants/batches.actions.types';
import { GET_BATCHES_FROM_USER_DATA } from './../constants/app.action.types';
import { CommonStorageService } from '../components/storage/common.service';
import { createConditionalSliceReducer } from './utils';
import { ReducerFunctionMap } from '../types/app.types';

export const initialBatchesState = {
    batches: 
    {
		batches: [],
	},
};

const batchesReducerMapping = (): ReducerFunctionMap => ({
	[ADD_BATCH_REQUEST]: (state: BatchesState) => ({ ...state }),
	[DELETE_BATCH_REQUEST]: (state: BatchesState) => ({ ...state }),
	[EDIT_BATCH_DATA_REQUEST]: (state: BatchesState) => ({ ...state }),
	[GET_USER_STORAGE_REQUEST]: (state: BatchesState) => ({ ...state }),
	[ADD_BATCH_SUCCESS]: (state: BatchesState, newBatch: BatchInDto) => ({
	// [ADD_BATCH_SUCCESS]: (state, { newBatch }) => ({
		...state,
		...{ batches: [...state.batches, newBatch] },
	}),
	[EDIT_BATCH_DATA_SUCCESS]: (state: BatchesState, editedBatch: BatchInDto ) => {
	// [EDIT_BATCH_DATA_SUCCESS]: (state: BatchesState, { editedBatch }) => {
		editedBatch.stashes = CommonStorageService.getStashesFromBatch(
			[...state.batches],
			editedBatch.batchId
		);

		return {
			...state,
			...{
				batches: [
					...state.batches.filter(
						batch => batch.batchId !== editedBatch.batchId
					),
					editedBatch,
				],
			},
		};
	},
	[GET_USER_STORAGE_SUCCESS]: (state: BatchesState,  batches: BatchInDto[]) => ({
	// [GET_USER_STORAGE_SUCCESS]: (state: BatchesState, { batches }) => ({
		...state,
		...{ batches: [...batches] },
	}),
	// [GET_BATCHES_FROM_USER_DATA]: (state: BatchesState, { batches }) => ({
	[GET_BATCHES_FROM_USER_DATA]: (state: BatchesState, batches: BatchInDto[]) => ({
		...state,
		...{ batches: [...batches] },
	}),
	// [DELETE_BATCH_SUCCESS]: (state: BatchesState, { batchId }) => ({
	[DELETE_BATCH_SUCCESS]: (state: BatchesState, batchId: number ) => ({
		...state,
		...{ batches: state.batches.filter(batch => batch.batchId !== batchId) },
	}),
	[ADD_BATCH_FAILURE]: (state: BatchesState, payload: unknown) => ({
		...state,
		...{ error: payload },
	}),
	[DELETE_BATCH_FAILURE]: (state: BatchesState, payload: unknown) => ({
		...state,
		...{ error: payload },
	}),
	[EDIT_BATCH_DATA_FAILURE]: (state: BatchesState, payload: unknown) => ({
		...state,
		...{ error: payload },
	}),
	[GET_USER_STORAGE_FAILURE]: (state: BatchesState, payload: unknown) => ({
		...state,
		...{ error: payload },
	}),
});

export const batchesReducer = createConditionalSliceReducer(
	'batches',
	batchesReducerMapping(),
	initialBatchesState
);

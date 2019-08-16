import { Reducer, Action } from 'redux';
import { AxiosError } from 'axios';

import { reduceReducers } from './utils';
import { appReducer } from './app.reducer';
import { stashesReducer } from './stashes.reducer';
import { batchesReducer } from './batches.reducer';
import { summaryReducer } from './summary.reducer';
import { AnyFunction } from '../types/common.types';
import { AppState } from '../types/app.types';

const rootReducer: Reducer<AnyFunction | undefined, Action<unknown>> = reduceReducers(
	batchesReducer,
	appReducer,
	stashesReducer,
	summaryReducer
);

export const requestReducer = (state: AppState) => ({ ...state });
export const errorReducer = (state: AppState, payload: AxiosError) => ({
  ...state,
  ...{ error: payload.response && payload.response.data.message },
});

export default rootReducer;
 
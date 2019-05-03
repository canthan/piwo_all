import { appReducer } from './app.reducer';
import { stashesReducer } from './stashes.reducer';
import { batchesReducer } from './batches.reducer';
import { summaryReducer } from './summary.reducer';
import { reduceReducers } from './utils';
import { Reducer, Action } from 'redux';
import { AnyFunction } from '../types/common.types';

const rootReducer: Reducer<AnyFunction | undefined, Action<unknown>> = reduceReducers(
	batchesReducer,
	appReducer,
	stashesReducer,
	summaryReducer
);

export default rootReducer;
 
import { appReducer } from './app.reducer';
import { stashesReducer } from './stashes.reducer';
import { batchesReducer } from './batches.reducer';
import { summaryReducer } from './summary.reducer';
import { reduceReducers } from './utils';

const rootReducer = reduceReducers(
	batchesReducer,
	appReducer,
	stashesReducer,
	summaryReducer
);

export default rootReducer;

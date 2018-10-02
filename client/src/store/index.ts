import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';

import rootReducer from '../reducers/index';
import { initialStashesState } from '../reducers/stashes.reducer';
import { initialBatchesState } from '../reducers/batches.reducer';
import { initialAppState } from '../reducers/app.reducer';
import { initialSummaryState } from '../reducers/summary.reducer';


const initialState = {
  ...initialAppState,
  ...initialBatchesState,
  ...initialStashesState,
  ...initialSummaryState,
}

export const store = createStore(rootReducer, initialState, composeWithDevTools(applyMiddleware(thunk)));
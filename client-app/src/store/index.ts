import { applyMiddleware, createStore, Store, Action } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';

import rootReducer from '../reducers/index';
import { initialStashesState } from '../reducers/stashes.reducer';
import { initialBatchesState } from '../reducers/batches.reducer';
import { initialAppState } from '../reducers/app.reducer';
import { initialSummaryState } from '../reducers/summary.reducer';
import { AnyFunction } from '../types/app.types';


const initialState = {
  ...initialAppState,
  ...initialBatchesState,
  ...initialStashesState,
  ...initialSummaryState,
}

export const store: Store<AnyFunction, Action<unknown>> = createStore(rootReducer, initialState, composeWithDevTools(applyMiddleware(thunk))); 

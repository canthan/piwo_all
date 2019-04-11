import { BatchesState, StashesState, SummaryState } from '../types/storage.types';
import { AppState } from './../types/app.types';

import { initialStashesState } from './stashes.reducer';
import { initialBatchesState } from './batches.reducer';
import { initialAppState } from './app.reducer';
import { initialSummaryState } from './summary.reducer';


export interface OverallAppState {
  app: AppState;
  batches: BatchesState;
  stashes: StashesState;
  summary: SummaryState;
}

const overallAppState: OverallAppState = {
  ...initialAppState,
  ...initialBatchesState,
  ...initialStashesState,
  ...initialSummaryState,
};

export default overallAppState;

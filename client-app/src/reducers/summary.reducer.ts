import {
  GET_SUMMARY_FROM_STASHES,
	CHANGE_SUMMARY_BOTTLES_AMOUNT,
} from './../constants/summary.action.types';

import { SummaryState } from './../types/storage.types';
import { StashSummary } from '../types/storage.types';
import { CommonStorageService } from '../components/storage/common.service';
import { createConditionalSliceReducer } from './utils';

const HALF_LITER = 0.5;
export const initialSummaryState = {
	summary: {
		summary: [],
	},
};

const changeBottlesAmount = (
	currentSummary: StashSummary[],
	name: string,
	amount: number,
	bottleType: string
) => {
	const changedSummary: StashSummary[] = [...currentSummary];
	const changedStash: StashSummary | undefined = changedSummary.find(
		summary => summary.name === name
	);
	if (!!changedStash) {
		CommonStorageService.decodeBottleVolume(bottleType) === HALF_LITER
			? (changedStash.bottles.halfLiter += amount)
			: (changedStash.bottles.small += amount);
	}

	return changedSummary;
};

interface Temporary {
  name: string,
  amount: number,
  bottleType: string,
}
const summaryReducerMapping = () => ({
	[GET_SUMMARY_FROM_STASHES]: (state: SummaryState, summary: SummaryState) => ({
		...state,
		...{ summary },
	}),
	[CHANGE_SUMMARY_BOTTLES_AMOUNT]: (state: SummaryState, payload: Temporary) => ({
		...state,
		...{
			summary: changeBottlesAmount(
				state.summary,
				payload.name,
				payload.amount,
				payload.bottleType
			),
		},
	}),
});

export const summaryReducer = createConditionalSliceReducer(
	'summary',
	summaryReducerMapping(),
	initialSummaryState
);

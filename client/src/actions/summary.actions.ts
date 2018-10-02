import { SummaryService } from './../components/storage/Summary/summaryService';
import { AnyAction } from 'redux';

import {
	GET_SUMMARY_FROM_STASHES,
	CHANGE_SUMMARY_BOTTLES_AMOUNT,
} from './../constants/summary.action.types';
import { Stash, StashSummary } from '../types/storage.types';

export const getSummaryFromStashes = (stashes: Stash[]): AnyAction => {
	const summary: StashSummary[] = SummaryService.createSummary(stashes);

	return {
		payload: { summary },
		type: GET_SUMMARY_FROM_STASHES,
	};
};

export const changeSummaryBottlesAmount = (
	stashName: string,
	amount: number,
	bottleType: string
): AnyAction => ({
	payload: { stashName, amount, bottleType },
	type: CHANGE_SUMMARY_BOTTLES_AMOUNT,
});

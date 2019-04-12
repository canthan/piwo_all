import Axios, { AxiosResponse, AxiosError } from 'axios';
import { AnyAction } from 'redux';

import { getSummaryFromStashes } from './summary.actions';
import { User, UserData, Response, AsyncAction, ReduxAction } from './../types/app.types';
import {
  GET_USER_DATA_REQUEST,
	GET_USER_DATA_SUCCESS,
	GET_USER_DATA_FAILURE,
} from './../constants/app.action.types';
import { getStashesFromUserData } from './stashes.actions';
import { getBatchesFromUserData } from './batches.actions';
import { CONFIG } from './../config/config';

export const getUserDataRequest = (): AnyAction => ({
	type: GET_USER_DATA_REQUEST,
});

export const getUserDataSuccess = (userData: User): AnyAction => ({
	payload: {
		userData,
		loaded: true,
		loggedIn: true,
	},
	type: GET_USER_DATA_SUCCESS,
});

export const getUserDataFailure = (error: Error): AnyAction => ({
	payload: error,
	type: GET_USER_DATA_FAILURE,
});

export const getUserDataAsync = (userId: number): AsyncAction => async (
	dispatch
  ): Promise<ReduxAction<AnyAction | AxiosError>> => {
	dispatch(getUserDataRequest());
	try {
		const response: AxiosResponse<Response<UserData>> = await Axios.get(
			`${CONFIG.COMBINED_DATA_API}/${userId}`
		);
		const userData = response.data.data;
		dispatch(getUserDataSuccess(userData));
		dispatch(getBatchesFromUserData(userData.batches));
    dispatch(getStashesFromUserData(userData.stashes));
    
		return dispatch(getSummaryFromStashes(userData.stashes));
	} catch (error) {
		return dispatch(getUserDataFailure(error));
	}
};

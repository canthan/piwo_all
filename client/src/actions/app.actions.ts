import { getSummaryFromStashes } from './summary.actions';
import Axios, { AxiosResponse } from 'axios';

import { AnyAction, Dispatch } from 'redux';

import { User, UserData, Response } from './../types/app.types';

import {
	GET_USER_DATA_REQUEST,
	GET_USER_DATA_SUCCESS,
	GET_USER_DATA_FAILURE,
} from './../constants/app.action.types';
import { getStashesFromUserData } from './stashes.actions';
import { getBatchesFromUserData } from './batches.actions';

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

export const getUserDataFailure = (error): AnyAction => ({
	payload: error,
	type: GET_USER_DATA_FAILURE,
});

export const getUserDataAsync = (userId: number) => async (
	dispatch: Dispatch<AnyAction>
) => {
	dispatch(getUserDataRequest());
	try {
		const response: AxiosResponse<Response<UserData>> = await Axios.get(
			`http://localhost:1337/combinedData/${userId}`
		);
		const userData = response.data.data;
		dispatch(getUserDataSuccess(userData));
		dispatch(getBatchesFromUserData(userData.batches));
		dispatch(getStashesFromUserData(userData.stashes));
		dispatch(getSummaryFromStashes(userData.stashes));
	} catch (error) {
		dispatch(getUserDataFailure(error));
	}
};

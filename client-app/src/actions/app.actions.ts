import Axios, { AxiosResponse, AxiosError } from 'axios';
import { AnyAction } from 'redux';

import {
  GET_USER_DATA_REQUEST,
  GET_USER_DATA_SUCCESS,
  GET_USER_DATA_FAILURE,
} from './../constants/app.action.types';
import { getSummaryFromStashes } from './summary.actions';
import { getStashesFromUserData } from './stashes.actions';
import { getBatchesFromUserData } from './batches.actions';
import { CONFIG } from './../config/config';
import { UserData, AppState } from './../types/app.types';
import { ReduxAction, Response, AsyncAction } from '../types/common.types';

export const getUserDataRequest = (): AnyAction => ({
  type: GET_USER_DATA_REQUEST,
});

export const getUserDataSuccess = (userData: UserData): ReduxAction<AppState> => ({
  payload: {
    user: userData,
    loaded: true,
    loggedIn: true,
  },
  type: GET_USER_DATA_SUCCESS,
});

export const getUserDataFailure = (error: AxiosError): ReduxAction<AxiosError> => ({
  payload: error,
  type: GET_USER_DATA_FAILURE,
});

export const getUserDataAsync = (userId: string): AsyncAction => async (
  dispatch
) => {
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

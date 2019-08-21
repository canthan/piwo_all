import Axios, { AxiosResponse, AxiosError } from 'axios';
import { AnyAction } from 'redux';

import http from '../utils/http.service';
import { sortByNumber } from '../utils/utils.service';

import { CONFIG } from './../config/config';
import {
  GET_USER_DATA_REQUEST,
  GET_USER_DATA_SUCCESS,
  GET_USER_DATA_FAILURE,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT_REQUEST,
  LOGOUT_SUCCESS,
  LOGOUT_FAILURE,
  EDIT_USER_DATA_REQUEST,
  EDIT_USER_DATA_SUCCESS,
  EDIT_USER_DATA_FAILURE,
  EDIT_STASH_CONFIG_REQUEST,
  EDIT_STASH_CONFIG_SUCCESS,
  EDIT_STASH_CONFIG_FAILURE,
} from './../constants/app.action.types';
import { getSummaryFromStashes } from './summary.actions';
import { getStashesFromUserData } from './stashes.actions';
import { getBatchesFromUserData } from './batches.actions';
import { UserData, AppState, User, UserProfileFields, StashConfig } from './../types/app.types';
import { ReduxAction, Response, AsyncAction } from '../types/common.types';
import { Endpoints } from '../constants/endpoint.constants';

export const getUserDataRequest = (): AnyAction => ({
  type: GET_USER_DATA_REQUEST,
});

export const getUserDataSuccess = (userData: UserData): ReduxAction<AppState> => ({
  payload: {
    user: userData,
    loaded: true,
    loggedIn: true,
    error: null,
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
    const response: AxiosResponse<Response<UserData>> = await http.get(
      `${CONFIG.COMBINED_DATA_API}/${userId}`,
    );
    const userData = response.data.data;
    dispatch(getUserDataSuccess(userData));
    dispatch(getBatchesFromUserData(sortByNumber(userData.batches, "batchNo")));
    dispatch(getStashesFromUserData(userData.stashes));

    return dispatch(getSummaryFromStashes(userData.stashes, userData.stashConfig));
  } catch (error) {
    return dispatch(getUserDataFailure(error));
  }
};

export const loginRequest = () => ({
  type: LOGIN_REQUEST,
});

export const loginSuccess = (userData: UserData): ReduxAction<AppState> => ({
  payload: {
    user: userData,
    loaded: true,
    loggedIn: true,
    error: null,
  },
  type: LOGIN_SUCCESS,
});

export const loginFailure = (error: AxiosError): ReduxAction<AxiosError> => ({
  payload: error,
  type: LOGIN_FAILURE,
});

export const loginAsync = (email: string, password: string, register = false): AsyncAction => async (
  dispatch
) => {
  dispatch(loginRequest());
  try {
    const response: AxiosResponse<Response<UserData>> = await Axios.post(
      `${CONFIG.USERS_API}/${register ? Endpoints.register : Endpoints.login}`,
      { email, password },
    );
    const userData = response.data.data;

    return dispatch(loginSuccess(userData));
  } catch (error) {
    return dispatch(loginFailure(error));
  }
};

export const changeStashConfigRequest = () => ({
  type: EDIT_STASH_CONFIG_REQUEST,
});

export const changeStashConfigSuccess = (stashConfig: StashConfig[]): ReduxAction<{ stashConfig: StashConfig[] }> => ({
  payload: { stashConfig },
  type: EDIT_STASH_CONFIG_SUCCESS,
});

export const changeStashConfigFailure = (error: AxiosError): ReduxAction<AxiosError> => ({
  payload: error,
  type: EDIT_STASH_CONFIG_FAILURE,
});

export const changeStashConfigAsync = (userId: string, stashConfig: StashConfig[]): AsyncAction => async (
  dispatch
) => {
  dispatch(changeStashConfigRequest());
  try {
    const response: AxiosResponse<Response<StashConfig[]>> = await Axios.patch(
      `${CONFIG.USERS_API}/${userId}`,
      { stashConfig },
    );
    const returnedStashConfig = response.data.data;

    return dispatch(changeStashConfigSuccess(returnedStashConfig));
  } catch (error) {
    return dispatch(changeStashConfigFailure(error));
  }
};

export const logoutRequest = () => ({
  type: LOGOUT_REQUEST,
});

export const logoutSuccess = (): ReduxAction<AppState> => ({
  type: LOGOUT_SUCCESS,
});

export const logoutFailure = (error: AxiosError): ReduxAction<AxiosError> => ({
  payload: error,
  type: LOGOUT_FAILURE,
});

export const logoutAsync = (email: string): AsyncAction => async (
  dispatch
) => {
  dispatch(logoutRequest());
  try {
    const response: AxiosResponse<Response<UserData>> = await Axios.post(
      `${CONFIG.USERS_API}/${Endpoints.logout}`,
      { email }
    );

    return dispatch(logoutSuccess());
  } catch (error) {
    return dispatch(logoutFailure(error));
  }
};


export const editProfileRequest = () => ({
  type: EDIT_USER_DATA_REQUEST,
});

export const editProfileSuccess = (userData: User): ReduxAction<AppState> => ({
  payload: {
    user: userData,
    loaded: true,
    loggedIn: true,
    error: null,
  },
  type: EDIT_USER_DATA_SUCCESS,
});

export const editProfileFailure = (error: AxiosError): ReduxAction<AxiosError> => ({
  payload: error,
  type: EDIT_USER_DATA_FAILURE,
});

export const editProfileAsync = (user: UserProfileFields): AsyncAction => async (
  dispatch
) => {
  dispatch(editProfileRequest());
  try {
    const response: AxiosResponse<Response<UserData>> = await Axios.put(
      `${CONFIG.USERS_API}/${Endpoints.editProfile}`,
      { user }
    );
    const userData = response.data.data;

    return dispatch(editProfileSuccess(userData));
  } catch (error) {
    return dispatch(editProfileFailure(error));
  }
};
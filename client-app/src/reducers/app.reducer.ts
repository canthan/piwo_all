import {
  GET_USER_DATA_REQUEST,
  GET_USER_DATA_SUCCESS,
  GET_USER_DATA_FAILURE,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT_REQUEST,
  LOGOUT_FAILURE,
  LOGOUT_SUCCESS,
  EDIT_USER_DATA_REQUEST,
  EDIT_USER_DATA_FAILURE,
  EDIT_USER_DATA_SUCCESS,
} from '../constants/app.action.types';
import { createConditionalSliceReducer } from './utils';
import { AppState, User } from '../types/app.types';
import overallAppState from './initialState';
import { AxiosError } from 'axios';

export const initialAppState: { app: AppState } = {
  app: {
    loaded: true,
    // loggedIn: false,
    loggedIn: true,
    user: {
      // userId: '',
      userId: '1',
      // email: '',
      email: 'andrzej.globisz@gmail.com',
      registrationDate: '',
      stashConfig: [],
    },
    error: null,
  },
};

const appReducerMapping = () => ({
  [GET_USER_DATA_REQUEST]: (state: AppState) => ({ ...state }),
  [EDIT_USER_DATA_REQUEST]: (state: AppState) => ({ ...state }),
  [LOGIN_REQUEST]: (state: AppState) => ({ ...state }),
  [LOGOUT_REQUEST]: (state: AppState) => ({ ...state }),
  [GET_USER_DATA_SUCCESS]: (state: AppState, { user: { userId, username, firstname, surname, email, stashConfig }, loaded, loggedIn }: AppState) => ({
    ...state,
    ...{
      loaded: loaded,
      loggedIn: loggedIn,
      user: {
        userId: userId,
        username: username,
        firstname: firstname,
        surname: surname,
        email: email,
        stashConfig: stashConfig,
      },
    },
  }),
  [LOGIN_SUCCESS]: (state: AppState, payload: { user: User; loaded: boolean; loggedIn: boolean }) => ({
    ...state,
    ...{
      loaded: payload.loaded,
      loggedIn: payload.loggedIn,
      user: {
        userId: payload.user.userId,
        firstname: payload.user.firstname,
        surname: payload.user.surname,
        email: payload.user.email,
      },
    },
  }),
  [EDIT_USER_DATA_SUCCESS]: (state: AppState, payload: { user: User }) => ({
    ...state,
    ...{
      user: {
        ...state.user,
        firstname: payload.user.firstname,
        surname: payload.user.surname,
        email: payload.user.email,
      },
    },
  }),
  [LOGOUT_SUCCESS]: () => ({
    ...overallAppState,
    ...{
      loggedIn: false,
      user: {
        userId: '',
        email: '',
      },
    },
  }),
  [GET_USER_DATA_FAILURE]: (state: AppState, payload: AxiosError) => ({
    ...state,
    ...{ error: payload.response && payload.response.data.message },
  }),
  [EDIT_USER_DATA_FAILURE]: (state: AppState, payload: AxiosError) => ({
    ...state,
    ...{ error: payload.response && payload.response.data.message },
  }),
  [LOGIN_FAILURE]: (state: AppState, payload: AxiosError) => ({
    ...state,
    ...{ error: payload.response && payload.response.data.message },
  }),
  [LOGOUT_FAILURE]: (state: AppState, payload: AxiosError) => ({
    ...state,
    ...{ error: payload.response && payload.response.data.message },
  }),
});

export const appReducer = createConditionalSliceReducer(
  'app',
  appReducerMapping(),
  initialAppState
);

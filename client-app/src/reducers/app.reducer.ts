import { StashConfig } from './../../../backend/users-service/src/types/types';
import { requestReducer, errorReducer } from './index';
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
  EDIT_STASH_CONFIG_REQUEST,
  EDIT_STASH_CONFIG_SUCCESS,
  EDIT_STASH_CONFIG_FAILURE,
} from '../constants/app.action.types';
import { createConditionalSliceReducer } from './utils';
import { AppState, User } from '../types/app.types';
import overallAppState from './initialState';

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
  [GET_USER_DATA_REQUEST]: requestReducer,
  [EDIT_USER_DATA_REQUEST]: requestReducer,
  [LOGIN_REQUEST]: requestReducer,
  [LOGOUT_REQUEST]: requestReducer,
  [EDIT_STASH_CONFIG_REQUEST]: requestReducer,
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
        stashConfig: payload.user.stashConfig,
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
  [EDIT_STASH_CONFIG_SUCCESS]: (state: AppState, payload: { stashConfig: StashConfig[] }) => ({
    ...state,
    ...{
      user: {
        ...state.user,
        stashConfig: payload.stashConfig,
      }
    }
  }),
  [GET_USER_DATA_FAILURE]: errorReducer,
  [EDIT_USER_DATA_FAILURE]: errorReducer,
  [LOGIN_FAILURE]: errorReducer,
  [LOGOUT_FAILURE]: errorReducer,
  [EDIT_STASH_CONFIG_FAILURE]: errorReducer,
});

export const appReducer = createConditionalSliceReducer(
  'app',
  appReducerMapping(),
  initialAppState
);

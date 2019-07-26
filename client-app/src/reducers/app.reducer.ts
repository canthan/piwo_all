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
		},
	},
};

const appReducerMapping = () => ({
	[GET_USER_DATA_REQUEST]: (state: AppState) => ({ ...state }),
	[LOGIN_REQUEST]: (state: AppState) => ({ ...state }),
	[LOGOUT_REQUEST]: (state: AppState) => ({ ...state }),
	[GET_USER_DATA_SUCCESS]: (state: AppState, payload: { user: User; loaded: boolean; loggedIn: boolean }) => ({
		...state,
		...{
			loaded: payload.loaded,
			loggedIn: payload.loggedIn,
			user: {
				userId: payload.user.userId,
				username: payload.user.username,
				firstname: payload.user.firstname,
				surname: payload.user.surname,
				email: payload.user.email,
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
				username: payload.user.username,
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
	[GET_USER_DATA_FAILURE]: (state: AppState, payload: unknown) => ({
		...state,
		...{ error: payload },
	}),
	[LOGIN_FAILURE]: (state: AppState, payload: unknown) => ({
		...state,
		...{ error: payload },
	}),
	[LOGOUT_FAILURE]: (state: AppState, payload: unknown) => ({
		...state,
		...{ error: payload },
	}),
});

export const appReducer = createConditionalSliceReducer(
	'app',
	appReducerMapping(),
	initialAppState
);

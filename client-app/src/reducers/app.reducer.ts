import {
	GET_USER_DATA_REQUEST,
	GET_USER_DATA_SUCCESS,
	GET_USER_DATA_FAILURE,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
} from '../constants/app.action.types';
import { createConditionalSliceReducer } from './utils';
import { AppState, User } from '../types/app.types';

export const initialAppState: { app: AppState } = {
	app: {
		loaded: true,
		loggedIn: false,
		user: {
			userId: '',
      email: '',
      registrationDate: '',
		},
	},
};

const appReducerMapping = () => ({
	[GET_USER_DATA_REQUEST]: (state: AppState) => ({ ...state }),
	[LOGIN_REQUEST]: (state: AppState) => ({ ...state }),
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
	[GET_USER_DATA_FAILURE]: (state: AppState, payload: unknown) => ({
		...state,
		...{ error: payload },
	}),
	[LOGIN_FAILURE]: (state: AppState, payload: unknown) => ({
		...state,
		...{ error: payload },
	}),
});

export const appReducer = createConditionalSliceReducer(
	'app',
	appReducerMapping(),
	initialAppState
);

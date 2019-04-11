import {
	GET_USER_DATA_REQUEST,
	GET_USER_DATA_SUCCESS,
	GET_USER_DATA_FAILURE,
} from '../constants/app.action.types';
import { createConditionalSliceReducer } from './utils';
import { AppState } from '../types/app.types';

export const initialAppState: { app: AppState } = {
	app: {
		loaded: true,
		loggedIn: false,
		user: {
			userId: 0,
			username: '',
			firstname: '',
			surname: '',
			email: '',
		},
	},
};

// tslint:disable no-any

const appReducerMapping = () => ({
	[GET_USER_DATA_REQUEST]: (state: AppState) => ({ ...state }),
	[GET_USER_DATA_SUCCESS]: (state: AppState, { user, loaded, loggedIn } = state) => ({
		...state,
		...{
			loaded,
			loggedIn,
			user: {
				userId: user.userId,
				username: user.username,
				firstname: user.firstname,
				surname: user.surname,
				email: user.email,
			},
		},
	}),
	[GET_USER_DATA_FAILURE]: (state: AppState, payload: any) => ({
		...state,
		...{ error: payload },
	}),
});

export const appReducer = createConditionalSliceReducer(
	'app',
	appReducerMapping(),
	initialAppState
);

import {
	GET_USER_DATA_REQUEST,
	GET_USER_DATA_SUCCESS,
	GET_USER_DATA_FAILURE,
} from './../constants/app.action.types';
import { createConditionalSliceReducer } from './utils';

export const initialAppState = {
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

const appReducerMapping = () => ({
	[GET_USER_DATA_REQUEST]: state => ({ ...state }),
	[GET_USER_DATA_SUCCESS]: (state, { userData, loaded, loggedIn }) => ({
		...state,
		...{
			loaded,
			loggedIn,
			user: {
				userId: userData.userId,
				username: userData.username,
				firstname: userData.firstname,
				surname: userData.surname,
				email: userData.email,
			},
		},
	}),
	[GET_USER_DATA_FAILURE]: (state, payload) => ({
		...state,
		...{ error: payload },
	}),
});

export const appReducer = createConditionalSliceReducer(
	'app',
	appReducerMapping(),
	initialAppState
);

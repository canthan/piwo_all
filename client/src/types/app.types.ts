import { ThunkAction } from 'redux-thunk';
import { Batch, Stash } from './storage.types';
import { Action } from 'redux';

// tslint:disable no-any
export type AnyFunction = (...args: any[]) => any;
export type AsyncFunction = (...args: any[]) => Promise<any>;

export interface AppState {
	user: {
		userId: number;
		username: string;
		firstname: string;
		surname: string;
		email: string;
	};
	loaded: boolean;
	loggedIn: boolean;
}

export interface User {
	email: string;
	firstname: string;
	password: string;
	registrationDate: string;
	surname: string;
	userId: number;
	username: string;
}

export interface UserData extends User {
	batches: Batch[];
	stashes: Stash[];
}

export interface Response<T> {
	status: number;
	data: T;
}

// export type AsyncAction = ThunkAction<Promise<void>, AppState, null, Action>;
export type AsyncAction = ThunkAction<Promise<void>, AppState, null>;

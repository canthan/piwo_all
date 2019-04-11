import { AxiosError } from 'axios';
import { StashesState, SummaryState } from './../../../client/src/types/storage.types';
import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { Batch, Stash, BatchesState } from './storage.types';
import { AnyAction } from 'redux';
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

export type State = Partial<{ app: AppState } & { batches: BatchesState } & { stashes: StashesState } & { summary: SummaryState }>;

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
export type AsyncResult = Promise<AnyAction | AxiosError>;
export type AsyncAction = ThunkAction<AsyncResult, {}, {}, AnyAction>;
export type AnyDispatch = ThunkDispatch<{}, {}, AnyAction>;

export interface ReduxAction<T> {
  type: string,
  payload?: T,
}

export interface ReducerFunctionMap {
  [type: string]: AnyFunction; 
}

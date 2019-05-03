import { AnyAction } from 'redux';
import { ThunkAction, ThunkDispatch } from 'redux-thunk';

// tslint:disable no-any

export type AnyFunction = (...args: any[]) => any;
export type AsyncFunction = (...args: any[]) => Promise<any>;
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;

export interface ReducerFunctionMap {
  [type: string]: AnyFunction; 
}

export interface ReduxAction<T> {
  type: string,
  payload?: T,
}
export interface ReduxError {
  type: string,
  error: Error,
}

export interface Response<T> {
	status: number;
	data: T;
}
export type AsyncResult = Promise<AnyAction | undefined>;
export type AsyncAction = ThunkAction<AsyncResult, {}, {}, AnyAction>;
export type AnyDispatch = ThunkDispatch<{}, {}, AnyAction>;
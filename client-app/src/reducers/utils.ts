import { Reducer, Action } from 'redux';

import { State } from './../types/app.types';
import { AnyFunction, ReducerFunctionMap } from '../types/common.types';

// tslint:disable-next-line:array-type
export const reduceReducers = (...reducers: Reducer<AnyFunction | undefined, Action<unknown>>[]): Reducer<AnyFunction | undefined, Action<unknown>> =>
  (previous: AnyFunction | undefined, current: Action<unknown>) =>
    reducers.reduce((p, r) => r(p, current), previous);


export const createReducer = (initialState: State, fnMap: ReducerFunctionMap) => (
  state = initialState,
  { type, payload }: { type: string; payload: unknown }
) => {
  const handler = fnMap[type];

  return handler ? handler(state, payload) : state;
};

export const createConditionalSliceReducer = (
  sliceName: string,
  fnMap: ReducerFunctionMap,
  initialState: State
): AnyFunction => {
  const sliceReducer = createReducer(initialState, fnMap);

  return (state = initialState, action) => {
    if (fnMap[action.type]) {
      return {
        ...state,
        [sliceName]: sliceReducer(state[sliceName], action),
      };
    }

    return state;
  };
};

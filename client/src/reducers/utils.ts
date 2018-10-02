export const reduceReducers = (...reducers) => (previous, current) =>
	reducers.reduce((p, r) => r(p, current), previous);

export const createReducer = (initialState, fnMap) => (
	state = initialState,
	{ type, payload }
) => {
	const handler = fnMap[type];

	return handler ? handler(state, payload) : state;
};

export const createConditionalSliceReducer = (
	sliceName,
	fnMap,
	initialState
) => {
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

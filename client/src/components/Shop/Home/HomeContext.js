export const homeState = {
	loading: false,
};

export const homeReducer = (state = homeState, action) => {
	switch (action.type) {
		case 'loading':
			return { ...state, loading: action.payload };

		default:
			return state;
	}
};

export const userState = {
	users: [],
	loading: false,
};

export const userReducer = (state = userState, action) => {
	switch (action.type) {
		case 'users':
			return { ...state, users: action.payload };
		case 'loading':
			return { ...state, loading: action.payload };
		default:
			return state;
	}
};

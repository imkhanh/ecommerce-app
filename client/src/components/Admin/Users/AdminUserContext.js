export const adminUserState = {
	users: [],
	loading: false,
};

export const adminUserReducer = (state = adminUserState, action) => {
	switch (action.type) {
		case 'users':
			return { ...state, users: action.payload };
		case 'loading':
			return { ...state, loading: action.payload };

		default:
			break;
	}
};

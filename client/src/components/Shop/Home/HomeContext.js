export const homeState = {
	latestProducts: [],
	slides: [],
	loading: false,
};

export const homeReducer = (state = homeState, action) => {
	switch (action.type) {
		case 'slides':
			return { ...state, slides: action.payload };
		case 'latestProducts':
			return { ...state, latestProducts: action.payload };
		case 'loading':
			return { ...state, loading: action.payload };
		default:
			return state;
	}
};

export const adminDashboardState = {
	slides: [],
	totalData: [],
	totalOrders: [],
	loading: false,
};

export const adminDashboardReducer = (state = adminDashboardState, action) => {
	switch (action.type) {
		case 'loading':
			return { ...state, loading: action.payload };
		case 'totalData':
			return { ...state, totalData: action.payload };
		case 'totalOrders':
			return { ...state, totalOrders: action.payload };
		case 'slides':
			return { ...state, slides: action.payload };
		default:
			return state;
	}
};

export const dashboardState = {
	products: null,
	singleUser: null,
	userOrders: null,
	loading: false,
};

export const dashboardReducer = (state = dashboardState, action) => {
	switch (action.type) {
		case 'singleUser':
			return { ...state, singleUser: action.payload };
		case 'products':
			return { ...state, products: action.payload };
		case 'orderByUser':
			return { ...state, orderByUser: action.payload };
		case 'loading':
			return { ...state, loading: action.payload };
		default:
			return state;
	}
};

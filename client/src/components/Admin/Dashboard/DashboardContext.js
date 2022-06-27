export const dashboardState = {
	totalData: [],
	totalOrders: [],
	slideImages: [],
	uploadModal: false,
	imageUpload: false,
	loading: false,
};

export const dashboardReducer = (state = dashboardState, action) => {
	switch (action.type) {
		case 'totalData':
			return { ...state, totalData: action.payload };
		case 'totalOrders':
			return { ...state, totalOrders: action.payload };
		case 'slideImages':
			return { ...state, slideImages: action.payload };
		case 'uploadModal':
			return { ...state, uploadModal: action.payload };
		case 'imageUpload':
			return { ...state, imageUpload: action.payload };
		case 'loading':
			return { ...state, loading: action.payload };
		default:
			return state;
	}
};

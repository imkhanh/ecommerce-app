export const layoutState = {
	moblieMenu: false,
	authModal: false,
	cartModal: false,
	singleProduct: null,
	cartProduct: null,
	orderSuccess: false,
	inCart: null,
	loading: false,
};

export const layoutReducer = (state = layoutState, action) => {
	switch (action.type) {
		case 'moblieMenu':
			return { ...state, moblieMenu: action.payload };
		case 'authModal':
			return { ...state, authModal: action.payload };
		case 'cartModal':
			return { ...state, cartModal: action.payload };
		case 'singleProduct':
			return { ...state, singleProduct: action.payload };
		case 'cartProduct':
			return { ...state, cartProduct: action.payload };
		case 'inCart':
			return { ...state, inCart: action.payload };
		case 'orderSuccess':
			return { ...state, orderSuccess: action.payload };
		case 'loading':
			return { ...state, loading: action.payload };
		default:
			return state;
	}
};

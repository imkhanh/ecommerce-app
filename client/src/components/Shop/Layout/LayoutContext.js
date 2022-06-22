export const layoutState = {
	menuToggle: false,
	cartModal: false,
	loginRegisterModal: false,
	cartProduct: null,
	singleProduct: null,
	inCart: null,
	loading: false,
};

export const layoutReducer = (state = layoutState, action) => {
	switch (action.type) {
		case 'cartModal':
			return { ...state, cartModal: action.payload };
		case 'loginRegisterModal':
			return { ...state, loginRegisterModal: action.payload };
		case 'cartProduct':
			return { ...state, cartProduct: action.payload };
		case 'singleProduct':
			return { ...state, singleProduct: action.payload };
		case 'inCart':
			return { ...state, inCart: action.payload };
		case 'loading':
			return { ...state, loading: action.payload };
		default:
			return state;
	}
};

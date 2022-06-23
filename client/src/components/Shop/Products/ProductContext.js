export const productState = {
	products: [],
	searchDropdown: false,
	categoryDropdown: false,
	priceDropdown: false,
	loading: false,
};

export const productReducer = (state = productState, action) => {
	switch (action.type) {
		case 'products':
			return { ...state, products: action.payload };
		case 'searchDropdown':
			return { ...state, searchDropdown: action.payload, categoryDropdown: false, priceDropdown: false };
		case 'categoryDropdown':
			return { ...state, categoryDropdown: action.payload, searchDropdown: false, priceDropdown: false };
		case 'priceDropdown':
			return { ...state, priceDropdown: action.payload, searchDropdown: false, categoryDropdown: false };
		case 'loading':
			return { ...state, loading: action.payload };
		default:
			break;
	}
};

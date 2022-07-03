export const adminProductState = {
	products: null,
	addProductModal: false,
	editProductModal: {
		modal: false,
		id: '',
		title: '',
		category: '',
		description: '',
		discount: '',
		price: '',
		quantity: '',
		images: '',
		status: '',
	},
	loading: false,
};

export const adminProductReducer = (state = adminProductState, action) => {
	switch (action.type) {
		case 'products':
			return { ...state, products: action.payload };
		case 'addProductModal':
			return { ...state, addProductModal: action.payload };
		case 'editProductModalOpen':
			return {
				...state,
				editProductModal: {
					modal: true,
					id: action.payload.id,
				},
			};
		case 'loading':
			return { ...state, loading: action.payload };
		default:
			return state;
	}
};

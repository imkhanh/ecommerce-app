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
					title: action.payload.title,
					category: action.payload.category,
					description: action.payload.description,
					discount: action.payload.discount,
					price: action.payload.price,
					quantity: action.payload.quantity,
					images: action.payload.images,
					status: action.payload.status,
				},
			};
		case 'editProductModalClose':
			return {
				...state,
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
			};
		case 'loading':
			return { ...state, loading: action.payload };
		default:
			return state;
	}
};

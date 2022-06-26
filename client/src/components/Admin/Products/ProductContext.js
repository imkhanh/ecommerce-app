export const productState = {
	products: [],
	addProductModal: false,
	editProductModal: {
		modal: false,
		id: '',
		name: '',
		description: '',
		category: '',
		status: '',
		price: '',
		quantity: '',
		offer: '',
		images: '',
	},
	loading: false,
};

export const productReducer = (state = productState, action) => {
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
					name: action.payload.name,
					description: action.payload.description,
					category: action.payload.category,
					status: action.payload.status,
					price: action.payload.price,
					quantity: action.payload.quantity,
					offer: action.payload.offer,
					images: action.payload.images,
				},
			};
		case 'editProductModalClose':
			return {
				...state,
				editProductModal: {
					modal: false,
					id: '',
					name: '',
					description: '',
					category: '',
					status: '',
					price: '',
					quantity: '',
					images: '',
					offer: '',
				},
			};
		case 'loading':
			return { ...state, loading: action.payload };
		default:
			return state;
	}
};

export const categoryState = {
	categories: [],
	addCategoryModal: false,
	editCategoryModal: {
		modal: false,
		id: '',
		name: '',
		description: '',
		status: '',
	},

	loading: false,
};

export const categoryReducer = (state = categoryState, action) => {
	switch (action.type) {
		case 'categories':
			return { ...state, categories: action.payload };
		case 'addCategoryModal':
			return { ...state, addCategoryModal: action.payload };
		case 'addCategoryModalOpen':
			return {
				...state,
				addCategoryModal: {
					modal: true,
					id: action.payload.id,
					name: action.payload.name,
					description: action.payload.description,
					status: action.payload.status,
				},
			};
		case 'addCategoryModalClose':
			return {
				...state,
				addCategoryModal: {
					modal: false,
					id: '',
					name: '',
					description: '',
					status: '',
				},
			};
		case 'loading':
			return { ...state, loading: action.payload };
		default:
			return state;
	}
};

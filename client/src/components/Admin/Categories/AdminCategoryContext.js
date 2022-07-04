export const adminCategoryState = {
	categories: [],
	addCategoryModal: false,
	editCategoryModal: {
		modal: false,
		id: '',
		title: '',
		description: '',
		status: '',
		image: '',
	},
	loading: false,
};

export const adminCategoryReducer = (state = adminCategoryState, action) => {
	switch (action.type) {
		case 'categories':
			return { ...state, categories: action.payload };
		case 'addCategoryModal':
			return { ...state, addCategoryModal: action.payload };
		case 'editCategoryModalOpen':
			return {
				...state,
				editCategoryModal: {
					modal: true,
					id: action.payload.id,
					title: action.payload.title,
					description: action.payload.description,
					status: action.payload.status,
					image: action.payload.image,
				},
			};
		case 'editCategoryModalClose':
			return {
				...state,
				editCategoryModal: {
					modal: false,
					id: '',
					title: '',
					description: '',
					status: '',
					image: '',
				},
			};
		case 'loading':
			return { ...state, loading: action.payload };
		default:
			return state;
	}
};

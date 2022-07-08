export const adminOrderState = {
	orders: [],
	updateOrderModal: {
		modal: false,
		id: null,
		status: '',
	},
	loading: false,
};

export const adminOrderReducer = (state = adminOrderState, action) => {
	switch (action.type) {
		case 'orders':
			return { ...state, orders: action.payload };
		case 'updateOrderModalOpen':
			return {
				...state,
				updateOrderModal: {
					modal: true,
					id: action.payload,
					status: action.payload,
				},
			};
		case 'updateOrderModalClose':
			return {
				...state,
				updateOrderModal: {
					modal: false,
					id: null,
					status: '',
				},
			};
		case 'loading':
			return { ...state, loading: action.payload };
		default:
			return state;
	}
};

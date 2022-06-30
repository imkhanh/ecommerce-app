import axios from 'axios';

export const getAllProduct = async (dispatch) => {
	dispatch({ type: 'loading', payload: true });
	try {
		const res = await axios.get('/api/product/get-all');

		if (res && res.data.products) {
			dispatch({ type: 'products', payload: res.data.products });
			dispatch({ type: 'loading', payload: false });
		}
	} catch (error) {
		console.log(error);
	}
};

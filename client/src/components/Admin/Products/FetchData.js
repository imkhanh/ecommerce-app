import axios from 'axios';

export const getAllProduct = async () => {
	try {
		const res = await axios.get('/api/product/get-all');
		return res.data;
	} catch (error) {
		console.log(error);
	}
};

export const deleteProduct = async (id) => {
	try {
		const res = await axios.delete(`/api/product/delete-product/${id}`);
		return res.data;
	} catch (error) {
		console.log(error);
	}
};

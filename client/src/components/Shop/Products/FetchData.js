import axios from 'axios';

export const getAllProduct = async (page, category, sort, search) => {
	try {
		const res = await axios.get(`/api/product/get-all?limit=${page * 6}&${category}&${sort}&title[regex]=${search}`);
		return res.data;
	} catch (error) {
		console.log(error);
	}
};

export const getAllCategories = async () => {
	try {
		const res = await axios.get('/api/category/get-all');
		return res.data;
	} catch (error) {
		console.log(error);
	}
};

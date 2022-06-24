import axios from 'axios';

export const getAllProduct = async () => {
	try {
		const res = await axios.get('/api/product/get-all');
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

export const getProductByPrice = async (price) => {
	try {
		const res = await axios.post('/api/product/product-by-price', { price });
		return res.data;
	} catch (error) {
		console.log(error);
	}
};

export const searchByName = async (value) => {
	try {
		const res = await axios.get(`/api/product/search?name=${value}`);
		return res.data;
	} catch (error) {
		console.log(error);
	}
};

export const getProductByCategory = async (cateId) => {
	try {
		const res = await axios.post('/api/product/product-by-category', { cateId });
		return res.data;
	} catch (error) {
		console.log(error);
	}
};

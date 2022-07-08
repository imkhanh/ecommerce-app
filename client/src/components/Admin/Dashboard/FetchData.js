import axios from 'axios';

export const getAllData = async () => {
	try {
		const res = await axios.get('/api/customize/get-all-data');
		return res.data;
	} catch (error) {
		console.log(error);
	}
};

export const getAllOrders = async () => {
	try {
		const res = await axios.get('/api/order/get-all-orders');
		return res.data;
	} catch (error) {
		console.log(error);
	}
};

export const getAllSlides = async () => {
	try {
		const res = await axios.get('/api/customize/get-all-slides');
		return res.data;
	} catch (error) {
		console.log(error);
	}
};

export const postAddSlide = async (formData) => {
	try {
		const res = await axios.post('/api/customize/add-slide', formData);
		return res.data;
	} catch (error) {
		console.log(error);
	}
};

export const deleteSlide = async (id) => {
	try {
		const res = await axios.delete(`/api/customize/delete-slide/${id}`);
		return res.data;
	} catch (error) {
		console.log(error);
	}
};

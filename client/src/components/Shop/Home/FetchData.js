import axios from 'axios';

export const getAllSlides = async () => {
	try {
		const res = await axios.get('/api/customize/get-all-image');
		return res.data;
	} catch (error) {
		console.log(error);
	}
};

export const getLatestProduct = async () => {
	try {
		const res = await axios.get('/api/product/get-latest');
		return res.data;
	} catch (error) {
		console.log(error);
	}
};

import axios from 'axios';

export const getAllSlides = async () => {
	try {
		const res = await axios.get('/api/customize/get-all-slides');
		return res.data;
	} catch (error) {
		console.log(error);
	}
};

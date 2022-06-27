import axios from 'axios';

export const getAllData = async () => {
	try {
		const res = await axios.get('/api/customize/get-all-data');
		return res.data;
	} catch (error) {
		console.log(error);
	}
};

export const getAllSlides = async () => {
	try {
		const res = await axios.get('/api/customize/get-all-image');
		return res.data;
	} catch (error) {
		console.log(error);
	}
};

export const postUploadImage = async (formData) => {
	try {
		const res = await axios.post('/api/customize/upload-image', formData);
		return res.data;
	} catch (error) {
		console.log(error);
	}
};

export const deleteImage = async (id) => {
	try {
		const res = await axios.delete(`/api/customize/delete-image/${id}`);
		return res.data;
	} catch (error) {
		console.log(error);
	}
};

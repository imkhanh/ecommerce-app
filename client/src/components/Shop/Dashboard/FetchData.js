import axios from 'axios';

export const getSingleUser = async (id) => {
	try {
		const res = await axios.get(`/api/user/get-single/${id}`);
		return res.data;
	} catch (error) {
		console.log(error);
	}
};

export const getWishList = async () => {
	const wishProduct = localStorage.getItem('wish') ? JSON.parse(localStorage.getItem('wish')) : [];

	try {
		const res = await axios.post('/api/product/add-wish', { wishProduct });
		return res.data;
	} catch (error) {
		console.log(error);
	}
};

export const patchUpdateUser = async (formData) => {
	try {
		const res = await axios.patch(`/api/user/update-user/${formData.id}`, formData);
		return res.data;
	} catch (error) {
		console.log(error);
	}
};

export const patchChangePassword = async (formData) => {
	try {
		const res = await axios.patch(`/api/user/change-password/${formData.id}`, formData);
		return res.data;
	} catch (error) {
		console.log(error);
	}
};
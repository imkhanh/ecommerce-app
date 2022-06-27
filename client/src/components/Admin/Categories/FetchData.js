import axios from 'axios';

export const getAllCategories = async () => {
	try {
		const res = await axios.get('/api/category/get-all');
		return res.data;
	} catch (error) {
		console.log(error);
	}
};

export const postAddCategory = async (formData) => {
	try {
		const res = await axios.post('/api/category/add-category', formData);
		return res.data;
	} catch (error) {
		console.log(error);
	}
};

export const patchEditCategory = async (formData) => {
	try {
		const res = await axios.patch(`/api/category/edit-category/${formData.id}`, formData);
		return res.data;
	} catch (error) {
		console.log(error);
	}
};

export const deleteCategory = async (id) => {
	try {
		const res = await axios.delete(`/api/category/delete-category/${id}`);
		return res.data;
	} catch (error) {
		console.log(error);
	}
};

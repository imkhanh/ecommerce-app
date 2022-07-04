import axios from 'axios';

export const getAllCategories = async () => {
	try {
		const res = await axios.get('/api/category/get-all');
		return res.data;
	} catch (error) {
		console.log(error);
	}
};

export const postAddCategory = async ({ title, image, description, status }) => {
	let formData = new FormData();

	formData.append('title', title);
	formData.append('image', image);
	formData.append('description', description);
	formData.append('status', status);
	try {
		const res = await axios.post(`/api/category/add-category`, formData);
		return res.data;
	} catch (error) {
		console.log(error);
	}
};

export const patchEditCategory = async (category) => {
	const formData = new FormData();

	if (category.editImage) {
		formData.append('editImage', category.editImage);
	}
	formData.append('id', category.id);
	formData.append('title', category.title);
	formData.append('description', category.description);
	formData.append('status', category.status);
	formData.append('image', category.image);

	try {
		const res = await axios.patch(`/api/category/edit-category/${category.id}`, formData);
		return res.data;
	} catch (error) {
		console.log(error);
	}
};

export const deleteEditCategory = async (id) => {
	try {
		const res = await axios.delete(`/api/category/delete-category/${id}`);
		return res.data;
	} catch (error) {
		console.log(error);
	}
};

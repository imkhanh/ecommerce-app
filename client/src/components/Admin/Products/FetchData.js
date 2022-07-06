import axios from 'axios';

export const getAllProducts = async () => {
	try {
		const res = await axios.get('/api/product/get-all-by-admin');
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

export const postAddProduct = async ({ title, description, category, images, quantity, discount, price, status }) => {
	const formData = new FormData();
	for (const img of images) {
		formData.append('images', img);
	}

	formData.append('title', title);
	formData.append('description', description);
	formData.append('category', category);
	formData.append('quantity', quantity);
	formData.append('discount', discount);
	formData.append('price', price);
	formData.append('status', status);

	try {
		const res = await axios.post('/api/product/add-product', formData);
		return res.data;
	} catch (error) {
		console.log(error);
	}
};

export const patchEditProduct = async (product) => {
	const formData = new FormData();
	if (product.editImages) {
		for (const img of product.editImages) {
			formData.append('editImages', img);
		}
	}

	formData.append('id', product.id);
	formData.append('title', product.title);
	formData.append('description', product.description);
	formData.append('category', product.category._id);
	formData.append('quantity', product.quantity);
	formData.append('discount', product.discount);
	formData.append('price', product.price);
	formData.append('status', product.status);
	formData.append('images', product.images);

	try {
		const res = await axios.patch(`/api/product/edit-product/${product.id}`, formData);
		console.log(res.data);
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

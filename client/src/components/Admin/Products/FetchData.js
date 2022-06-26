import axios from 'axios';

export const getAllProducts = async () => {
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

export const postAddProduct = async ({ name, description, price, status, category, quantity, offer, images }) => {
	let formData = new FormData();

	if (images) {
		for (const img of images) {
			formData.append('images', img);
		}
	}

	formData.append('name', name);
	formData.append('description', description);
	formData.append('category', category);
	formData.append('price', price);
	formData.append('status', status);
	formData.append('offer', offer);
	formData.append('quantity', quantity);

	try {
		const res = await axios.post('/api/product/add-product', formData);
		return res.data;
	} catch (error) {
		console.log(error);
	}
};

export const patchEditProduct = async (product) => {
	let formData = new FormData();

	if (product.editImages) {
		for (const img of product.editImages) {
			formData.append('editImages', img);
		}
	}

	formData.append('name', product.name);
	formData.append('description', product.description);
	formData.append('category', product.category._id);
	formData.append('price', product.price);
	formData.append('status', product.status);
	formData.append('offer', product.offer);
	formData.append('quantity', product.quantity);
	formData.append('images', product.images);

	try {
		const res = await axios.patch(`/api/product/edit-product/${product.id}`, formData);
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

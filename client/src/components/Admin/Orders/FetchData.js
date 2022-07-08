import axios from 'axios';

export const getAllOrders = async () => {
	try {
		const res = await axios.get('/api/order/get-all-orders');
		return res.data;
	} catch (error) {
		console.log(error);
	}
};

export const deleteOrder = async (id) => {
	try {
		const res = await axios.delete(`/api/order/delete-order/${id}`);
		return res.data;
	} catch (error) {
		console.log(error);
	}
};

export const patchUpdateOrder = async (id, formData) => {
	try {
		const res = await axios.patch(`/api/order/update-order/${id}`, formData);
		return res.data;
	} catch (error) {
		console.log(error);
	}
};

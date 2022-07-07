import axios from 'axios';

export const getBraintreeToken = async () => {
	const uId = JSON.parse(localStorage.getItem('jwt')).user._id;

	try {
		const res = await axios.post('/api/braintree/get-token', { uId });
		return res.data;
	} catch (error) {
		console.log(error);
	}
};

export const getPaymentProcesss = async (paymentData) => {
	try {
		const res = await axios.post('/api/braintree/payment', paymentData);
		return res.data;
	} catch (error) {}
};

export const postCreateOrder = async (orderData) => {
	try {
		const res = await axios.post('/api/order/create-order', orderData);
		return res.data;
	} catch (error) {}
};

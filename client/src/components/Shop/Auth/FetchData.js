import axios from 'axios';

export const loginReq = async ({ email, password }) => {
	try {
		const res = await axios.post(`/api/login`, { email, password });
		return res.data;
	} catch (error) {
		console.log(error);
	}
};

export const registerReq = async ({ fullname, username, email, password }) => {
	try {
		const res = await axios.post(`/api/register`, { fullname, username, email, password });
		return res.data;
	} catch (error) {
		console.log(error);
	}
};

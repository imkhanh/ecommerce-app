import axios from 'axios';

export const getAllUsers = async () => {
	try {
		const res = await axios.get('/api/user/get-all');
		return res.data;
	} catch (error) {
		console.log(error);
	}
};
export const deleteUser = async (id) => {
	try {
		const res = await axios.delete(`/api/user/delete-user/${id}`);
		return res.data;
	} catch (error) {
		console.log(error);
	}
};

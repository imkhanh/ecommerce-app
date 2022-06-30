import axios from 'axios';

export const loginReq = async (form, setForm) => {
	try {
		const res = await axios.post('/api/login', form);
		if (res && res.data.token) {
			setForm({ ...form, email: '', password: '', error: '', success: res.data.success });
			setTimeout(() => {
				localStorage.setItem('jwt', JSON.stringify(res.data));
				window.location.href = '/';
			}, 1000);
		} else {
			setForm({ ...form, email: '', password: '', error: res.data.error, success: '' });
			setTimeout(() => {
				setForm({ ...form, email: '', password: '', error: '', success: '' });
			}, 2000);
		}
	} catch (error) {
		console.log(error);
	}
};

export const registerReq = async (form, setForm) => {
	try {
		const res = await axios.post('/api/register', form);
		if (res && res.data.user) {
			setForm({ ...form, name: '', email: '', password: '', error: '', success: res.data.success });
		} else {
			setForm({ ...form, name: '', email: '', password: '', error: res.data.error, success: '' });
		}
	} catch (error) {
		console.log(error);
	}
};

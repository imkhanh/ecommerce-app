import React, { useState } from 'react';
import DashboardLayout from './DashboardLayout';
import { patchChangePassword } from './FetchData';

const UserChangePasswordComponent = () => {
	const [state, setState] = useState({ oldPass: '', newPass: '', confirmPass: '', success: '', error: '' });

	const alert = (color, text) => <div className={`my-4 px-4 py-[10px] border-l-2 border-${color}-500 bg-${color}-50 text-${color}-500 text-sm text-${color}-500`}>{text}</div>;

	if (state.error || state.success) {
		setTimeout(() => {
			setState({ ...state, oldPass: '', newPass: '', confirmPass: '', error: false, success: false });
		}, 2000);
	}

	const handleChange = (e) => {
		const { name, value } = e.target;
		setState({ ...state, [name]: value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		let formData = {
			id: JSON.parse(localStorage.getItem('jwt')).user._id,
			oldPass: state.oldPass,
			newPass: state.newPass,
		};
		if (!(state.newPass && state.confirmPass && state.oldPass)) {
			setState({ ...state, newPass: '', oldPass: '', confirmPass: '', error: 'Please fill all the fields' });
		} else if (state.newPass !== state.confirmPass) {
			setState({ ...state, newPass: '', oldPass: '', confirmPass: '', error: 'Password is not match' });
		} else {
			try {
				const res = await patchChangePassword(formData);
				if (res && res.success) {
					setState({ ...state, newPass: '', oldPass: '', confirmPass: '', success: res.success, error: false });
				} else {
					setState({ ...state, newPass: '', oldPass: '', confirmPass: '', success: false, error: res.error });
				}
			} catch (error) {
				console.log(error);
			}
		}
	};

	return (
		<div className="px-8 pb-8 shadow-lg rounded-bl-md rounded-br-md">
			<div className="py-4 border-b border-gray-200">
				<h4 className="text-base font-medium">Change Password</h4>
				<p className="text-sm font-light text-black/50"> For a secure account, please do not share your password with others</p>
			</div>

			{state.error && alert('red', state.error)}
			{state.success && alert('green', state.success)}

			<form onSubmit={handleSubmit} className="mt-4 py-4 col-span-4 space-y-4">
				<div>
					<label className="block mb-1 text-sm">Old password</label>
					<input type="password" name="oldPass" value={state.oldPass} onChange={handleChange} className="px-4 text-sm w-full h-11 border border-gray-200 rounded-sm outline-none focus:border-black transition-colors" />
				</div>
				<div>
					<label className="block mb-1 text-sm">New password</label>
					<input type="password" name="newPass" value={state.newPass} onChange={handleChange} className="px-4 text-sm w-full h-11 border border-gray-200 rounded-sm outline-none focus:border-black transition-colors" />
				</div>
				<div>
					<label className="block mb-1 text-sm">Confirm password</label>
					<input type="password" name="confirmPass" value={state.confirmPass} onChange={handleChange} className="px-4 text-sm w-full h-11 border border-gray-200 rounded-sm outline-none focus:border-black transition-colors" />
				</div>

				<button type="submit" className="py-2 px-6 text-sm bg-black text-white rounded-sm">
					Save
				</button>
			</form>
		</div>
	);
};

const UserChangePassword = () => {
	return <DashboardLayout children={<UserChangePasswordComponent />} />;
};

export default UserChangePassword;

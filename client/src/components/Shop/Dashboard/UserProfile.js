import React, { useContext, useEffect, useState } from 'react';
import DashboardLayout, { DashboardLayoutContext } from './DashboardLayout';
import { patchUpdateUser } from './FetchData';

const UserProfileComponent = () => {
	const { data } = useContext(DashboardLayoutContext);
	const [state, setState] = useState({ id: '', fullname: '', username: '', email: '', phone: '', success: '', error: '' });
	const infor = data.singleUser !== null ? data.singleUser : '';

	useEffect(() => {
		setState({
			...state,
			id: infor._id,
			fullname: infor.fullname,
			username: infor.username,
			email: infor.email,
			phone: infor.phone,
		});

		// eslint-disable-next-line
	}, [infor]);

	const alert = (color, text) => <div className={`my-4 px-4 py-[10px] border-l-2 border-${color}-500 bg-${color}-50 text-${color}-500 text-sm text-${color}-500`}>{text}</div>;

	if (state.error || state.success) {
		setTimeout(() => {
			setState({ ...state, error: false, success: false });
		}, 2000);
	}

	const handleChange = (e) => {
		const { name, value } = e.target;
		setState({ ...state, [name]: value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		let formData = {
			id: state.id,
			fullname: state.fullname,
			username: state.username,
			email: state.email,
			phone: state.phone,
		};

		if (!(state.fullname && state.username && state.email && state.phone)) {
			return;
		}

		try {
			const res = await patchUpdateUser(formData);
			if (res && res.success) {
				setState({ ...state, success: res.success, error: false });
			} else {
				setState({ ...state, success: false, error: res.error });
			}
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<div className="px-8 pb-8 shadow-lg rounded-bl-md rounded-br-md">
			<div className="py-4 border-b border-gray-200">
				<h4 className="text-base font-medium">My Profile</h4>
				<p className="text-sm font-light text-black/50">Manage profile information for account security</p>
			</div>

			{state.error && alert('red', state.error)}
			{state.success && alert('green', state.success)}

			<div className="mt-4 py-4">
				<form onSubmit={handleSubmit} className="space-y-4">
					<div>
						<label className="block mb-1 text-sm">Full name</label>
						<input type="text" name="fullname" value={state.fullname || ''} onChange={handleChange} className="px-4 text-sm w-full h-11 border border-gray-200 rounded-sm outline-none focus:border-black transition-colors" />
					</div>
					<div>
						<label className="block mb-1 text-sm">User name</label>
						<input type="text" name="username" value={state.username || ''} onChange={handleChange} className="px-4 text-sm w-full h-11 border border-gray-200 rounded-sm outline-none focus:border-black transition-colors" />
					</div>
					<div>
						<label className="block mb-1 text-sm">Email address</label>
						<input type="text" name="email" value={state.email || ''} onChange={handleChange} className="px-4 text-sm w-full h-11 border border-gray-200 rounded-sm outline-none focus:border-black transition-colors" />
					</div>
					<div>
						<label className="block mb-1 text-sm">Phone</label>
						<input type="text" name="phone" value={state.phone || ''} onChange={handleChange} className="px-4 text-sm w-full h-11 border border-gray-200 rounded-sm outline-none focus:border-black transition-colors" />
					</div>
					<button type="submit" className="py-2 px-6 text-sm bg-black text-white rounded-sm">
						Save
					</button>
				</form>
			</div>
		</div>
	);
};

const UserProfile = () => {
	return <DashboardLayout children={<UserProfileComponent />} />;
};

export default UserProfile;

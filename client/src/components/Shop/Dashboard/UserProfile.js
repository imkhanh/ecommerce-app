import React, { useContext, useEffect, useState } from 'react';
import DashboardLayout, { DashboardContext } from './DashboardLayout';
import { patchEditUser } from './FetchData';

const UserProfileComponent = () => {
	const { state } = useContext(DashboardContext);
	const [form, setForm] = useState({ id: '', name: '', email: '', phone: '', address: '', gender: '', error: '', success: '' });
	const infor = state.singleUser ? state.singleUser : '';

	useEffect(() => {
		setForm({ ...form, id: infor._id, name: infor.name, email: infor.email, phone: infor.phone, address: infor.address, gender: infor.gender });

		// eslint-disable-next-line
	}, [infor]);

	if (form.error || form.success) {
		setTimeout(() => {
			setForm({ ...form, oid: '', name: '', email: '', phone: '', address: '', gender: '', error: false, success: false });
		}, 2000);
	}

	const alert = (type, msg) => {
		return <div className={`mt-4 px-4 py-[10px] text-sm font-medium border-l-2 border-${type}-700 bg-${type}-100 text-${type}-700`}>{msg}</div>;
	};

	const handleChange = (e) => {
		const { name, value } = e.target;
		setForm({ ...form, [name]: value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		let formData = {
			id: form.id,
			name: form.name,
			email: form.email,
			phone: form.phone,
			address: form.address,
			gender: form.gender,
		};
		try {
			const res = await patchEditUser(formData);
			if (res && res.success) {
				setForm({ ...form, id: '', name: '', email: '', phone: '', address: '', gender: '', error: false, success: res.success });
			} else {
				setForm({ ...form, id: '', name: '', email: '', phone: '', address: '', gender: '', error: res.error, success: false });
			}
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<div className="px-12 md:px-8 pb-8">
			<div className="py-4 border-b border-gray-200">
				<h4 className="text-black font-medium">Information</h4>
				<p className="text-sm text-black/40 font-light">lorem</p>
			</div>

			{form.error && alert('red', form.error)}
			{form.success && alert('green', form.success)}

			<form onSubmit={handleSubmit} className="mt-4 space-y-4">
				<div>
					<label className="block mb-1 text-sm">Name</label>
					<input type="text" name="name" value={form.name || ''} onChange={handleChange} className="text-sm px-4 w-full h-10 border border-gray-200 rounded-sm outline-none focus:border-black" />
				</div>
				<div>
					<label className="block mb-1 text-sm">Email</label>
					<input type="text" name="email" value={form.email || ''} onChange={handleChange} className="text-sm px-4 w-full h-10 border border-gray-200 rounded-sm outline-none focus:border-black" />
				</div>
				<div>
					<label className="block mb-1 text-sm">Phone</label>
					<input type="text" name="phone" value={form.phone || ''} onChange={handleChange} className="text-sm px-4 w-full h-10 border border-gray-200 rounded-sm outline-none focus:border-black" />
				</div>
				<div>
					<label className="block mb-1 text-sm">Address</label>
					<input type="text" name="address" value={form.address || ''} onChange={handleChange} className="text-sm px-4 w-full h-10 border border-gray-200 rounded-sm outline-none focus:border-black" />
				</div>
				<div>
					<label className="block mb-1 text-sm">Gender</label>
					<input type="text" name="gender" value={form.gender || ''} onChange={handleChange} className="text-sm px-4 w-full h-10 border border-gray-200 rounded-sm outline-none focus:border-black" />
				</div>
				<button type="submit" className="px-8 py-2 text-sm text-white bg-black rounded-sm">
					Save
				</button>
			</form>
		</div>
	);
};

const UserProfile = () => {
	return <DashboardLayout children={<UserProfileComponent />} />;
};

export default UserProfile;

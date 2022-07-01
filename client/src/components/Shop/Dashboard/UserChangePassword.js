import React, { useState } from 'react';
import { BsEyeFill, BsEyeSlashFill } from 'react-icons/bs';
import DashboardLayout from './DashboardLayout';
import { patchChangePassword } from './FetchData';

const UserChangePasswordComponent = () => {
	const [form, setForm] = useState({ oldPassword: '', newPassword: '', confirmPassword: '', types: { newPass: false, confirmPass: false }, success: '', error: '' });

	if (form.error || form.success) {
		setTimeout(() => {
			setForm({ ...form, oldPassword: '', newPassword: '', confirmPassword: '', success: false, error: false });
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
			uId: JSON.parse(localStorage.getItem('jwt')).user._id,
			oldPassword: form.oldPassword,
			newPassword: form.newPassword,
		};

		if (form.newPassword !== form.confirmPassword) {
			setForm({ ...form, oldPassword: '', newPassword: '', confirmPassword: '', success: false, error: 'Password is not correct' });
		} else {
			try {
				const res = await patchChangePassword(formData);
				if (res && res.success) {
					setForm({ ...form, oldPassword: '', newPassword: '', confirmPassword: '', success: res.success, error: '' });
				} else {
					setForm({ ...form, oldPassword: '', newPassword: '', confirmPassword: '', success: '', error: res.error });
				}
			} catch (error) {
				console.log(error);
			}
		}
	};

	return (
		<div className="px-8 pb-8">
			<div className="py-4 border-b border-gray-200">
				<h4 className="text-black font-medium">Change password</h4>
				<p className="text-sm text-black/40 font-light">lorem</p>
			</div>

			{form.error && alert('red', form.error)}
			{form.success && alert('green', form.success)}

			<form onSubmit={handleSubmit} className="mt-4 space-y-4">
				<div>
					<label className="block mb-1 text-sm">Old password</label>
					<input type="password" name="oldPassword" autoComplete="off" value={form.oldPassword} onChange={handleChange} className="text-sm px-4 w-full h-10 border border-gray-200 rounded-sm outline-none focus:border-black" />
				</div>
				<div>
					<label className="block mb-1 text-sm">New password</label>
					<div className="relative">
						<input
							type={form.types.newPass ? 'text' : 'password'}
							name="newPassword"
							autoComplete="off"
							value={form.newPassword}
							onChange={handleChange}
							className="text-sm px-4 w-full h-10 border border-gray-200 rounded-sm outline-none focus:border-black"
						/>
						<span onClick={() => setForm({ ...form, types: { ...form.types, newPass: true } })} className="absolute top-1/2 right-3 transform -translate-y-1/2 cursor-pointer select-none text-black/50 hover:text-black">
							{form.types.newPass ? <BsEyeSlashFill /> : <BsEyeFill />}
						</span>
					</div>
				</div>
				<div>
					<label className="block mb-1 text-sm">Confirm password</label>
					<div className="relative">
						<input
							type={form.types.confirmPass ? 'text' : 'password'}
							name="confirmPassword"
							autoComplete="off"
							value={form.confirmPassword}
							onChange={handleChange}
							className="text-sm px-4 w-full h-10 border border-gray-200 rounded-sm outline-none focus:border-black"
						/>
						<span onClick={() => setForm({ ...form, types: { ...form.types, confirmPass: true } })} className="absolute top-1/2 right-3 transform -translate-y-1/2 cursor-pointer select-none text-black/50 hover:text-black">
							{form.types.confirmPass ? <BsEyeSlashFill /> : <BsEyeFill />}
						</span>
					</div>
				</div>

				<button type="submit" className="px-8 py-2 text-sm text-white bg-black rounded-sm">
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

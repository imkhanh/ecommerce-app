import React, { useState } from 'react';
import { BsEyeFill, BsEyeSlashFill } from 'react-icons/bs';
import { registerReq } from './FetchData';

const Register = () => {
	const [showPass, setShowPass] = useState(false);
	const [state, setState] = useState({ fullname: '', username: '', email: '', password: '', success: '', error: '' });
	const { fullname, username, email, password } = state;

	const handleChange = (e) => {
		const { name, value } = e.target;
		setState({ ...state, [name]: value });
	};

	const alert = (color, text) => <div className={`mb-4 px-4 py-[10px] border-l-2 border-${color}-500 bg-${color}-50 text-sm text-${color}-500`}>{text}</div>;

	if (state.error || state.success) {
		setTimeout(() => {
			setState({ ...state, fullname: '', username: '', email: '', password: '', error: false, success: false });
		}, 2000);
	}

	const handleSubmit = async (e) => {
		e.preventDefault();

		try {
			const res = await registerReq({ fullname, username, email, password });
			if (res && res.success) {
				setState({ ...state, fullname: '', username: '', email: '', password: '', error: false, success: res.success });
			} else {
				setState({ ...state, fullname: '', username: '', email: '', password: '', error: res.error, success: false });
			}
		} catch (error) {
			console.log(error);
		}
	};
	return (
		<div className="py-8 px-12">
			<div className="mb-8">
				<h4 className="text-black text-xl uppercase font-bold">Register</h4>
				<p className="text-black/50 text-sm font-light">Become a member shop</p>
			</div>

			{state.error && alert('red', state.error)}
			{state.success && alert('green', state.success)}

			<form onSubmit={handleSubmit} className="space-y-4">
				<div>
					<label className="block mb-1 text-sm text-black">Full name</label>
					<input type="text" name="fullname" id="fullname" placeholder="Enter full name" value={fullname} onChange={handleChange} className="px-4 text-sm w-full h-10 border black/30 outline-none focus:border-black rounded-sm" />
				</div>
				<div>
					<label className="block mb-1 text-sm text-black">User name</label>
					<input type="text" name="username" id="username" placeholder="Enter user name" value={username} onChange={handleChange} className="px-4 text-sm w-full h-10 border black/30 outline-none focus:border-black rounded-sm" />
				</div>
				<div>
					<label className="block mb-1 text-sm text-black">Email</label>
					<input type="text" name="email" id="email" placeholder="Enter email" value={email} onChange={handleChange} className="px-4 text-sm w-full h-10 border black/30 outline-none focus:border-black rounded-sm" />
				</div>
				<div>
					<label className="block mb-1 text-sm text-black">Password</label>
					<div className="relative">
						<input
							type={showPass ? 'text' : 'password'}
							name="password"
							id="password"
							placeholder="Enter password"
							autoComplete="off"
							value={password}
							onChange={handleChange}
							className="px-4 text-sm w-full h-10 border black/30 outline-none focus:border-black rounded-sm"
						/>
						<span onClick={() => setShowPass(!showPass)} className="absolute top-1/2 right-4 -translate-y-1/2 cursor-pointer select-none text-sm text-black/50 hover:text-black">
							{showPass ? <BsEyeSlashFill /> : <BsEyeFill />}
						</span>
					</div>
				</div>
				<button type="submit" className="w-full h-10 text-sm bg-black text-white rounded-sm">
					Register
				</button>
			</form>
		</div>
	);
};

export default Register;

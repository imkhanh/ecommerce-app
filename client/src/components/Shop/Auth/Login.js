import React, { useState } from 'react';
import { BsEyeFill, BsEyeSlashFill } from 'react-icons/bs';
import { loginReq } from './FetchData';

const Login = () => {
	const [showPass, setShowPass] = useState(false);
	const [state, setState] = useState({ email: '', password: '', error: '' });
	const { email, password } = state;

	const handleSubmit = async (e) => {
		e.preventDefault();

		try {
			const res = await loginReq({ email, password });
			if (res && res.success) {
				localStorage.setItem('jwt', JSON.stringify(res));
				window.location.href = '/';
			} else {
				setState({ ...state, email: '', password: '', error: res.error });
				setTimeout(() => {
					setState({ ...state, email: '', password: '', error: false });
				}, 2000);
			}
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<div className="py-8 px-12">
			<div className="mb-8">
				<h4 className="text-black text-xl uppercase font-bold">Login</h4>
				<p className="text-black/50 text-sm font-light">Your account for everything shop</p>
			</div>
			{state.error && <div className="mb-4 px-4 py-[10px] border-l-2 border-red-500 bg-red-50 text-sm text-red-500">{state.error}</div>}
			<form onSubmit={handleSubmit} className="space-y-4">
				<div>
					<label className="block mb-1 text-sm text-black">Email</label>
					<input type="text" name="email" id="email" value={email} onChange={(e) => setState({ ...state, email: e.target.value })} placeholder="Enter email" className="px-4 text-sm w-full h-10 border black/30 outline-none focus:border-black rounded-sm" />
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
							onChange={(e) => setState({ ...state, password: e.target.value })}
							className="px-4 text-sm w-full h-10 border black/30 outline-none focus:border-black rounded-sm"
						/>
						<span onClick={() => setShowPass(!showPass)} className="absolute top-1/2 right-4 -translate-y-1/2 cursor-pointer select-none text-sm text-black/50 hover:text-black">
							{showPass ? <BsEyeSlashFill /> : <BsEyeFill />}
						</span>
					</div>
				</div>
				<button type="submit" className="w-full h-10 text-sm bg-black text-white rounded-sm">
					Login
				</button>
			</form>
		</div>
	);
};

export default Login;

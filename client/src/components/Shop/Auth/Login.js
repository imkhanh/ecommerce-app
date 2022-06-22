import React, { useState } from 'react';
import { BsEyeFill, BsEyeSlashFill } from 'react-icons/bs';

const Login = () => {
	const [showPass, setShowPass] = useState(false);

	return (
		<div className="py-8 px-12">
			<div className="mb-8">
				<h4 className="text-black text-xl uppercase font-bold">Login</h4>
				<p className="text-black/50 text-sm font-light">Your account for everything shop</p>
			</div>
			{/* <div className="mb-4 px-4 py-2 bg-red-50 text-sm text-red-500">Login</div> */}
			<form className="space-y-4">
				<div>
					<label className="block mb-1 text-sm text-black">Email</label>
					<input type="text" name="email" id="email" placeholder="Enter email" className="px-4 text-sm w-full h-10 border black/30 outline-none focus:border-black rounded-sm" />
				</div>
				<div>
					<label className="block mb-1 text-sm text-black">Password</label>
					<div className="relative">
						<input type={showPass ? 'text' : 'password'} name="password" id="password" placeholder="Enter password" autoComplete="off" className="px-4 text-sm w-full h-10 border black/30 outline-none focus:border-black rounded-sm" />
						<span onClick={() => setShowPass(!showPass)} className="absolute top-1/2 right-4 -translate-y-1/2 cursor-pointer select-none text-sm text-black/50 hover:text-black">
							{showPass ? <BsEyeSlashFill /> : <BsEyeFill />}
						</span>
					</div>
				</div>
				<button className="w-full h-10 text-sm bg-black text-white rounded-sm">Login</button>
			</form>
		</div>
	);
};

export default Login;

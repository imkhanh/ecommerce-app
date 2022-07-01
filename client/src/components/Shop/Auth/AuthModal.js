import React, { useContext, useState } from 'react';
import { LayoutContext } from '../Layout/Layout';
import { loginReq, registerReq } from './FetchData';
import InputField from './InputField';

const AuthModal = () => {
	const [isLogin, setIsLogin] = useState(true);
	const { state, dispatch } = useContext(LayoutContext);
	const [showPass, setShowPass] = useState(false);
	const [form, setForm] = useState({ name: '', email: '', password: '', error: '', success: '' });

	const alert = (color, msg) => {
		return <div className={`mb-4 px-4 h-10 flex items-center text-sm border-l-2 border-${color}-700 bg-${color}-100 text-${color}-700 rounded-[3px]`}>{msg}</div>;
	};

	if (form.success || form.error) {
		setTimeout(() => {
			setForm({ ...form, name: '', email: '', password: '', error: '', success: '' });
		}, 2000);
	}

	const switchMode = () => {
		setShowPass(false);
		setIsLogin((prevLogin) => !prevLogin);
		setForm({ name: '', email: '', password: '', error: '', success: '' });
	};

	const handleChange = (e) => {
		const { name, value } = e.target;
		setForm({ ...form, [name]: value });
	};

	const handleShowPassword = () => setShowPass(!showPass);

	const handleSubmit = async (e) => {
		e.preventDefault();

		if (isLogin) {
			await loginReq(form, setForm);
		} else {
			await registerReq(form, setForm);
		}
	};

	return (
		<div>
			<div onClick={() => dispatch({ type: 'authModal', payload: false })} className={`${state.authModal ? '' : 'hidden'} fixed inset-0 bg-black opacity-50 z-20`}></div>
			<div className={`${state.authModal ? '' : 'hidden'} fixed top-1/2 left-1/2 max-w-sm w-full h-auto bg-white rounded shadow-lg transform -translate-x-1/2 -translate-y-1/2 z-30`}>
				<div className="px-12 py-8">
					<div className="mb-8 text-center space-y-3">
						<h4 className="text-xs line-through text-black font-normal uppercase tracking-widest">onedayonething</h4>
						<p className="text-[22px] uppercase text-black font-bold whitespace-pre-wrap">{isLogin ? 'Your account for everything shop' : 'Become a member shop'}</p>
					</div>

					{form.error && alert('red', form.error)}
					{form.success && alert('green', form.success)}

					<form onSubmit={handleSubmit} className="space-y-4">
						{isLogin ? (
							<>
								<InputField type="text" name="email" placeholder="Email address" value={form.email} handleChange={handleChange} handleShowPassword={handleShowPassword} error={form.error} />
								<InputField type={showPass ? 'text' : 'password'} name="password" placeholder="Password" value={form.password} handleChange={handleChange} handleShowPassword={handleShowPassword} error={form.error} />
							</>
						) : (
							<>
								<InputField type="text" name="name" placeholder="User name" value={form.name} handleChange={handleChange} handleShowPassword={handleShowPassword} error={form.error} />
								<InputField type="text" name="email" placeholder="Email address" value={form.email} handleChange={handleChange} handleShowPassword={handleShowPassword} error={form.error} />
								<InputField type={showPass ? 'text' : 'password'} name="password" placeholder="Password" value={form.password} handleChange={handleChange} handleShowPassword={handleShowPassword} error={form.error} />
							</>
						)}
						<div className="py-4">
							<p className="text-xs font-light text-black/50 text-center">{isLogin ? 'By logging in' : 'By creating an account'}, you agree to Shop's Privacy Policy and Terms of Use.</p>
						</div>
						<button type="submit" className="w-full h-10 text-xs font-medium uppercase bg-black text-white rounded-[3px]">
							{isLogin ? 'Login' : 'Register'}
						</button>
					</form>
				</div>
				<div className="px-12 pb-8 text-center">
					<p onClick={switchMode} className="text-xs font-light text-black/50 hover:text-black hover:underline cursor-pointer">
						{isLogin ? 'Not a Member? Join us' : 'Already a Member? Login'}
					</p>
				</div>
			</div>
		</div>
	);
};

export default AuthModal;

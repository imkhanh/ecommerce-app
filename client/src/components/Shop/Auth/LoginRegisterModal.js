import React, { useContext, useState } from 'react';
import { LayoutContext } from '../Layout/Layout';
import Login from './Login';
import Register from './Register';

const LoginRegisterModal = () => {
	const { data, dispatch } = useContext(LayoutContext);
	const [login, setLogin] = useState(true);

	return (
		<div>
			<div onClick={() => dispatch({ type: 'loginRegisterModal', payload: false })} className={`${data.loginRegisterModal ? '' : 'hidden'} fixed inset-0 w-full h-full bg-black opacity-30 z-40`} />
			<div className={`${data.loginRegisterModal ? '' : 'hidden'} fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 max-w-sm w-full h-auto bg-white rounded-sm shadow-xl z-50`}>
				{login ? <Login /> : <Register />}
				<div className="pb-8">
					<p onClick={() => setLogin(!login)} className="text-center text-sm font-light cursor-pointer select-none text-black/50 hover:text-black hover:underline hover:underline-offset-1">
						{login ? 'Not a Member? Join us' : 'Already a Member? Login now'}
					</p>
				</div>
			</div>
		</div>
	);
};

export default LoginRegisterModal;

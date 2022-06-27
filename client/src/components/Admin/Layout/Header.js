import React from 'react';
import { BsSearch } from 'react-icons/bs';

const Header = () => {
	const logout = () => {
		localStorage.removeItem('jwt');
		window.location.href = '/';
	};

	return (
		<header className="h-16 bg-white ">
			<nav className="h-full px-8 flex items-center justify-between">
				<div className="relative">
					<span className="absolute top-1/2 left-3 transform -translate-y-1/2">
						<BsSearch className="text-sm" />
					</span>
					<input
						type="text"
						placeholder="Search"
						className="pl-9 text-sm w-full h-9 bg-gray-50 outline-none border border-gray-200 rounded-lg focus:border-black transition-colors"
					/>
				</div>
				<div>
					<span onClick={logout} className="text-sm underline underline-offset-2 cursor-pointer select-none">
						Logout
					</span>
				</div>
			</nav>
		</header>
	);
};

export default Header;

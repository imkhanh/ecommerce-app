import React from 'react';
import { BsSearch } from 'react-icons/bs';

const Header = () => {
	return (
		<header className="h-16 bg-white ">
			<nav className="h-full px-8 flex items-center justify-between">
				<div className="relative">
					<span className="absolute top-1/2 left-3 transform -translate-y-1/2">
						<BsSearch />
					</span>
					<input type="text" placeholder="Search" className="pl-10 text-sm w-full h-10 bg-gray-50 outline-none border border-gray-200 rounded-lg focus:border-black transition-colors" />
				</div>
				<div>
					<span className="text-sm underline underline-offset-2 cursor-pointer select-none">Logout</span>
				</div>
			</nav>
		</header>
	);
};

export default Header;

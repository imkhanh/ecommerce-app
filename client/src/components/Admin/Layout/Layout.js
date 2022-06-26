import React from 'react';
import Header from './Header';
import Sidebar from './Sidebar';

const Layout = ({ children }) => {
	return (
		<div className="bg-white flex">
			<Sidebar />
			<div className="w-[85%] bg-white">
				<Header />
				{children}
			</div>
		</div>
	);
};

export default Layout;

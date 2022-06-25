import React from 'react';
import Header from './Header';
import Sidebar from './Sidebar';

const Layout = ({ children }) => {
	return (
		<div className="bg-white grid grid-cols-12">
			<Sidebar />
			<div className="col-span-10">
				<Header />
				{children}
			</div>
		</div>
	);
};

export default Layout;

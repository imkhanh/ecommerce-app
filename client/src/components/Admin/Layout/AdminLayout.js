import React from 'react';
import AdminSidebar from './AdminSidebar';

const AdminLayout = ({ children }) => {
	const handleLogout = () => {
		localStorage.removeItem('jwt');
		window.location.href = '/';
	};

	return (
		<div className="flex">
			<AdminSidebar />
			<div className="w-[85%] bg-gray-50">
				<div className="h-16 px-8 bg-white flex items-center justify-end shadow-sm">
					<span onClick={handleLogout} className="text-sm font-medium underline underline-offset-2 cursor-pointer">
						Logout
					</span>
				</div>
				{children}
			</div>
		</div>
	);
};

export default AdminLayout;

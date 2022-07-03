import React from 'react';
import AdminSidebar from './AdminSidebar';

const AdminLayout = ({ children }) => {
	return (
		<div className="flex">
			<AdminSidebar />
			<div className="w-[85%] bg-gray-50">{children}</div>
		</div>
	);
};

export default AdminLayout;

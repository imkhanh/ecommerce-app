import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { BsBox, BsCollection, BsGrid, BsPeople, BsReceipt } from 'react-icons/bs';

const AdminSidebar = () => {
	const location = useLocation();

	const links = [
		{ to: '/admin/dashboard', icon: <BsGrid />, label: 'Dashboard' },
		{ to: '/admin/dashboard/products', icon: <BsCollection />, label: 'Products' },
		{ to: '/admin/dashboard/categories', icon: <BsBox />, label: 'Categories' },
		{ to: '/admin/dashboard/users', icon: <BsPeople />, label: 'Users' },
		{ to: '/admin/dashboard/orders', icon: <BsReceipt />, label: 'Orders' },
	];

	return (
		<div className="w-[15%] sticky top-0 h-screen bg-white shadow-xl">
			<div className="p-8 flex items-center justify-center">
				<h1 className="text-black font-semibold uppercase">Admin Dashboard</h1>
			</div>
			<ul className="flex-1 overflow-y-auto">
				<li>
					{links.map((link, index) => {
						return (
							<Link key={index} to={link.to} className={`${location.pathname === link.to && 'bg-blue-50 text-blue-500 border-r-2 border-blue-500'} py-3 px-8 flex items-center`}>
								<span className={`${location.pathname === link.to && 'bg-blue-500 text-white'} w-8 h-8 rounded-full flex items-center justify-center`}>{link.icon}</span>
								<span className="ml-4 font-medium text-sm">{link.label}</span>
							</Link>
						);
					})}
				</li>
			</ul>
		</div>
	);
};

export default AdminSidebar;

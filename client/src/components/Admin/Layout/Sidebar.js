import React from 'react';
import { BsCashCoin, BsGearFill, BsPeopleFill } from 'react-icons/bs';
import { Link } from 'react-router-dom';

const Sidebar = () => {
	return (
		<div className="col-span-2 bg-white sticky top-0 h-screen border-r border-gray-200">
			<div className="h-16 flex items-center justify-center">
				<h3 className="text-black text-xl uppercase font-bold">Admin</h3>
			</div>
			<ul className="space-y-4">
				<li>
					<Link to="/admin/dashboard" className="px-8 py-4 text-black flex items-center">
						<BsGearFill />
						<span className="ml-4 text-sm uppercase">Dashboard</span>
					</Link>
				</li>
				<li>
					<Link to="/admin/products" className="px-8 py-4 text-black flex items-center">
						<BsGearFill />
						<span className="ml-4 text-sm uppercase">Products</span>
					</Link>
				</li>
				<li>
					<Link to="/admin/products" className="px-8 py-4 text-black flex items-center">
						<BsGearFill />
						<span className="ml-4 text-sm uppercase">Categories</span>
					</Link>
				</li>
				<li>
					<Link to="/admin/products" className="px-8 py-4 text-black flex items-center">
						<BsCashCoin />
						<span className="ml-4 text-sm uppercase">Checkout</span>
					</Link>
				</li>
				<li>
					<Link to="/admin/products" className="px-8 py-4 text-black flex items-center">
						<BsPeopleFill />
						<span className="ml-4 text-sm uppercase">Users</span>
					</Link>
				</li>
			</ul>
		</div>
	);
};

export default Sidebar;

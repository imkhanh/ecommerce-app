import React from 'react';
import { BsCollectionFill, BsFillArchiveFill, BsCashCoin, BsGearFill, BsPeopleFill } from 'react-icons/bs';
import { Link, useLocation } from 'react-router-dom';

const Sidebar = () => {
	const location = useLocation();

	return (
		<div className="w-[15%] bg-white sticky top-0 min-h-screen shadow-lg">
			<div className="h-16 flex items-center justify-center">
				<h3 className="text-black text-xl uppercase font-bold">Admin</h3>
			</div>
			<ul className="mt-8">
				<li>
					<Link
						to="/admin/dashboard"
						className={`${
							location.pathname === '/admin/dashboard' && 'text-blue-500 bg-blue-50 border-r-2 border-blue-700'
						} px-8 py-4 text-black/70 hover:text-blue-500 hover:bg-blue-50 flex items-center`}
					>
						<BsGearFill />
						<span className="ml-4 text-sm uppercase">Dashboard</span>
					</Link>
				</li>
				<li>
					<Link
						to="/admin/products"
						className={`${
							location.pathname === '/admin/products' && 'text-blue-500 bg-blue-50 border-r-2 border-blue-700'
						} px-8 py-4 text-black/70 hover:text-blue-500 hover:bg-blue-50 flex items-center`}
					>
						<BsCollectionFill />
						<span className="ml-4 text-sm uppercase">Products</span>
					</Link>
				</li>
				<li>
					<Link
						to="/admin/categories"
						className={`${
							location.pathname === '/admin/categories' && 'text-blue-500 bg-blue-50 border-r-2 border-blue-700'
						} px-8 py-4 text-black/70 hover:text-blue-500 hover:bg-blue-50 flex items-center`}
					>
						<BsFillArchiveFill />
						<span className="ml-4 text-sm uppercase">Categories</span>
					</Link>
				</li>
				<li>
					<Link
						to="/admin/users"
						className={`${
							location.pathname === '/admin/users' && 'text-blue-500 bg-blue-50 border-r-2 border-blue-700'
						} px-8 py-4 text-black/70 hover:text-blue-500 hover:bg-blue-50 flex items-center`}
					>
						<BsPeopleFill />
						<span className="ml-4 text-sm uppercase">Users</span>
					</Link>
				</li>
				<li>
					<Link
						to="/admin/checkout"
						className={`${
							location.pathname === '/admin/checkout' && 'text-blue-500 bg-blue-50 border-r-2 border-blue-700'
						} px-8 py-4 text-black/70 hover:text-blue-500 hover:bg-blue-50 flex items-center`}
					>
						<BsCashCoin />
						<span className="ml-4 text-sm uppercase">Checkout</span>
					</Link>
				</li>
			</ul>
		</div>
	);
};

export default Sidebar;

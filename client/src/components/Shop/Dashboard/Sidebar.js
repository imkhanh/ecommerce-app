import React from 'react';
import { BsGear, BsHeart, BsPerson, BsPersonCircle, BsPower, BsReceipt } from 'react-icons/bs';
import { Link, useLocation } from 'react-router-dom';
import { logout } from '../Auth/Authentication';

const Sidebar = () => {
	const location = useLocation();

	return (
		<div className="w-1/5 lg:w-[30%] md:w-full bg-white z-10">
			<div className="px-2 h-20 md:h-14 flex items-center bg-slate-700">
				<BsPersonCircle className="text-[44px] md:text-4xl text-white" />
				<div className="ml-2">
					<div className="text-sm text-white">User</div>
					<div className="text-sm text-white/50 font-light italic">user@gmail.com</div>
				</div>
			</div>
			<ul className="divide-y divide-gray-200 border border-gray-200">
				<li>
					<Link to="/user/profile" className={`${location.pathname === '/user/profile' && 'border-r-2 border-orange-500'} p-4 md:py-3 md:px-4 flex items-center hover:bg-gray-50`}>
						<BsPerson />
						<span className="ml-4 text-sm">Profile</span>
					</Link>
				</li>
				<li>
					<Link to="/user/wish-list" className={`${location.pathname === '/user/wish-list' && 'border-r-2 border-orange-500'} p-4 md:py-3 md:px-4 flex items-center hover:bg-gray-50`}>
						<BsHeart />
						<span className="ml-4 text-sm">My Wish List</span>
					</Link>
				</li>
				<li>
					<Link to="/user/orders" className={`${location.pathname === '/user/orders' && 'border-r-2 border-orange-500'} p-4 md:py-3 md:px-4 flex items-center hover:bg-gray-50`}>
						<BsReceipt />
						<span className="ml-4 text-sm">My Orders</span>
					</Link>
				</li>
				<li>
					<Link to="/user/change-password" className={`${location.pathname === '/user/change-password' && 'border-r-2 border-orange-500'} p-4 md:py-3 md:px-4 flex items-center hover:bg-gray-50`}>
						<BsGear />
						<span className="ml-4 text-sm">Change password</span>
					</Link>
				</li>
				<li>
					<div onClick={logout} className="p-4 md:py-3 md:px-4 flex items-center cursor-pointer hover:bg-gray-50">
						<BsPower />
						<span className="ml-4 text-sm">Logout</span>
					</div>
				</li>
			</ul>
		</div>
	);
};

export default Sidebar;

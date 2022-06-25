import React, { useContext } from 'react';
import { BsCashCoin, BsHeart, BsKey, BsPerson, BsPersonCircle, BsPower } from 'react-icons/bs';
import { Link, useLocation } from 'react-router-dom';
import { logout } from '../Auth/Auth';
import { DashboardLayoutContext } from './DashboardLayout';

const Sidebar = () => {
	const location = useLocation();
	const { data } = useContext(DashboardLayoutContext);

	const user = data.singleUser !== null ? data.singleUser : '';

	return (
		<div className="col-span-3 lg:col-span-12">
			<div className="h-20 px-2 flex items-center bg-gray-800">
				<BsPersonCircle className="text-5xl text-white" />
				<div className="ml-3">
					<h4 className="text-white text-sm">{user.username}</h4>
					<p className="text-xs text-white/50">{user.email}</p>
				</div>
			</div>
			<ul className="border border-gray-200 divide-y divide-gray-200">
				<li>
					<Link to="/user/profile" className={`${location.pathname === '/user/profile' && 'border-r-2 border-orange-500'} p-4 text-black/70 hover:text-black flex items-center hover:bg-gray-50 transition-colors`}>
						<BsPerson />
						<span className="ml-4 text-sm">Update Profile</span>
					</Link>
				</li>
				<li>
					<Link to="/user/change-password" className={`${location.pathname === '/user/change-password' && 'border-r-2 border-orange-500'} p-4 text-black/70 hover:text-black flex items-center hover:bg-gray-50 transition-colors`}>
						<BsKey />
						<span className="ml-4 text-sm">Change Password</span>
					</Link>
				</li>
				<li>
					<Link to="/user/wish-list" className={`${location.pathname === '/user/wish-list' && 'border-r-2 border-orange-500'} p-4 text-black/70 hover:text-black flex items-center hover:bg-gray-50 transition-colors`}>
						<BsHeart />
						<span className="ml-4 text-sm">My Wish List</span>
					</Link>
				</li>
				<li>
					<Link to="/user/orders" className={`${location.pathname === '/user/orders' && 'border-r-2 border-orange-500'} p-4 text-black/70 hover:text-black flex items-center hover:bg-gray-50 transition-colors`}>
						<BsCashCoin />
						<span className="ml-4 text-sm">My Orders</span>
					</Link>
				</li>
				<li>
					<div onClick={logout} className="p-4 text-black/70 hover:text-black flex items-center hover:bg-gray-50 cursor-pointer transition-colors">
						<BsPower />
						<span className="ml-4 text-sm">Logout</span>
					</div>
				</li>
			</ul>
		</div>
	);
};

export default Sidebar;

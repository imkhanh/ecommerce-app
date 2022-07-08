import React, { useContext, useEffect, useRef, useState } from 'react';
import { BsGear, BsHandbag, BsHeart, BsPerson, BsPersonCircle, BsPower, BsReceipt, BsShieldLock } from 'react-icons/bs';
import { IoCloseOutline, IoMenuOutline } from 'react-icons/io5';
import { Link, useLocation } from 'react-router-dom';
import { LayoutContext } from './Layout';
import { isAdmin, isAuth, logout } from '../Auth/Authentication';

const Header = () => {
	const menuRef = useRef(null);
	const location = useLocation();
	const { state, dispatch } = useContext(LayoutContext);
	const [isVisible, setIsVisible] = useState(false);

	useEffect(() => {
		const handleClick = (e) => {
			if (menuRef.current && !menuRef.current.contains(e.target)) {
				setIsVisible(false);
			}
		};

		window.addEventListener('click', handleClick, true);

		return () => window.removeEventListener('click', handleClick, true);
	}, []);

	const menuLinks = [
		{ index: 1, label: 'Home', to: '/' },
		{ index: 2, label: 'Products', to: '/products' },
		{ index: 3, label: 'News', to: '/news' },
		{ index: 4, label: 'Q&A', to: '/qanda' },
		{ index: 5, label: 'Notice', to: '/notice' },
	];

	const activeLink = (pn) => (location.pathname === pn ? 'border-black' : 'border-transparent');

	const DropdownMenu = () => {
		return (
			<ul className="absolute top-12 -right-12 border border-gray-200 bg-white w-44 h-auto shadow rounded-[3px] z-20">
				{isAdmin() ? (
					<li>
						<Link to="/admin/dashboard" className="px-4 py-2 flex items-center text-black hover:bg-gray-50 transition-colors">
							<BsShieldLock className="text-sm" />
							<span className="ml-4 text-sm">Admin</span>
						</Link>
					</li>
				) : (
					<>
						<li>
							<Link to="/user/profile" className="px-4 py-2 flex items-centerw text-black hover:bg-gray-50 transition-colors">
								<BsPersonCircle className="text-sm" />
								<span className="ml-4 text-sm">Profile</span>
							</Link>
						</li>
						<li>
							<Link to="/user/wish-list" className="px-4 py-2 flex items-center text-black hover:bg-gray-50 transition-colors">
								<BsHeart className="text-sm" />
								<span className="ml-4 text-sm">My wish list</span>
							</Link>
						</li>
						<li>
							<Link to="/user/orders" className="px-4 py-2 flex items-center text-black hover:bg-gray-50 transition-colors">
								<BsReceipt className="text-sm" />
								<span className="ml-4 text-sm">My orders</span>
							</Link>
						</li>
						<li>
							<Link to="/user/change-password" className="px-4 py-2 flex items-center text-black hover:bg-gray-50 transition-colors">
								<BsGear className="text-sm" />
								<span className="ml-4 text-sm">Change password</span>
							</Link>
						</li>
					</>
				)}
				<li>
					<div onClick={logout} className="px-4 py-2 border-t border-gray-200 flex items-center cursor-pointer text-black hover:bg-gray-50 transition-colors">
						<BsPower className="text-sm" />
						<span className="ml-4 text-sm">Logout</span>
					</div>
				</li>
			</ul>
		);
	};

	return (
		<header className="sticky top-0 left-0 w-full bg-white border-b border-gray-200 z-20">
			<div className="relative px-8 md:px-4 h-14 flex items-center justify-between">
				<div className="hidden md:block">
					<span onClick={() => dispatch({ type: 'toggleMenu', payload: !state.toggleMenu })} className="cursor-pointer select-none">
						{state.toggleMenu ? <IoCloseOutline className="text-2xl" /> : <IoMenuOutline className="text-2xl" />}
					</span>
					<div className={`${state.toggleMenu ? 'translate-x-0 opacity-100' : '-translate-x-full opacity-0'} fixed left-0 top-14 w-full h-screen bg-white z-20 transform transition-all duration-300 ease-in-out px-4`}>
						<ul className="h-full flex flex-col items-center justify-center space-y-12">
							{menuLinks.map((link) => {
								return (
									<li key={link.index}>
										<Link to={`${link.to}`} onClick={() => dispatch({ type: 'toggleMenu', payload: false })} className="text-2xl font-semibold uppercase hover:italic hover:text-black/70">
											{link.label}
										</Link>
									</li>
								);
							})}
						</ul>
					</div>
				</div>
				<div className="w-1/6 md:w-4/6 md:flex md:items-center md:justify-center">
					<Link to="/" className="text-sm line-through text-black font-normal uppercase tracking-widest">
						onedayonething
					</Link>
				</div>
				<div className="w-4/6 flex items-center justify-center md:hidden">
					<ul className="flex space-x-10 lg:space-x-6">
						{menuLinks.map((link) => {
							return (
								<li key={link.index}>
									<Link to={`${link.to}`} className={`${activeLink(link.to)} block text-xs uppercase  border-b leading-[56px] text-black hover:text-black/70 hover:border-black transition-colors`}>
										{link.label}
									</Link>
								</li>
							);
						})}
					</ul>
				</div>
				<div className="w-1/6 flex items-center justify-end space-x-6 md:space-x-4">
					<Link to="/user/wish-list">
						<BsHeart />
					</Link>
					<div ref={menuRef} className="relative">
						{isAuth() ? (
							<>
								<div onClick={() => setIsVisible(!isVisible)} className="cursor-pointer select-none">
									<BsPersonCircle />
								</div>
								{isVisible && DropdownMenu()}
							</>
						) : (
							<div onClick={() => dispatch({ type: 'authModal', payload: true })} className="cursor-pointer select-none">
								<BsPerson className="text-lg" />
							</div>
						)}
					</div>
					<div onClick={() => dispatch({ type: 'cartModal', payload: true })} className="relative cursor-pointer select-none">
						<BsHandbag />
						{state.cartProduct && state.cartProduct.length > 0 && <span className="absolute -top-3 -right-3 w-6 h-6 rounded-full flex items-center justify-center border-2 border-white bg-black text-sm text-white">{state.cartProduct.length}</span>}
					</div>
				</div>
			</div>
		</header>
	);
};

export default Header;

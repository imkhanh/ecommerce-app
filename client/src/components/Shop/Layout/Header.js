import React, { useContext, useEffect, useRef, useState } from 'react';
import { BsPerson, BsHeart, BsHandbag, BsPersonCircle, BsPower, BsSpeedometer } from 'react-icons/bs';
import { LayoutContext } from './Layout';
import { Link } from 'react-router-dom';
import { isAdmin, isAuth, logout } from '../Auth/Auth';

const Header = () => {
	const menuRef = useRef(null);
	const { data, dispatch } = useContext(LayoutContext);
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

	return (
		<header className="h-16 sticky top-0 w-full z-20 bg-white border-b border-gray-100 px-8 md:px-4 flex items-center justify-between">
			<div className="w-1/3">
				<Link to="/" className="text-sm uppercase font-black text-black">
					e-Commerce
				</Link>
			</div>

			<div className="w-1/3 flex items-center justify-center">
				<ul className="md:hidden flex items-center space-x-12">
					<li>
						<Link to="/" className="text-xs uppercase text-black hover:text-gray-700">
							Home
						</Link>
					</li>
					<li>
						<Link to="/products" className="text-xs uppercase text-black hover:text-gray-700">
							Products
						</Link>
					</li>
					<li>
						<Link to="/" className="text-xs uppercase text-black hover:text-gray-700">
							News
						</Link>
					</li>
					<li>
						<Link to="/" className="text-xs uppercase text-black hover:text-gray-700">
							Q&A
						</Link>
					</li>
					<li>
						<Link to="/" className="text-xs uppercase text-black hover:text-gray-700">
							Notice
						</Link>
					</li>
				</ul>
			</div>

			<div className="w-1/3 flex items-center justify-end space-x-8">
				<div className="cursor-pointer">
					<BsHeart />
				</div>
				<div ref={menuRef} className="relative">
					{isAuth() ? (
						<>
							<span onClick={() => setIsVisible(!isVisible)} className="cursor-pointer select-none">
								<BsPersonCircle className="text-lg" />
							</span>
							{isVisible && (
								<ul className="absolute top-12 left-1/2 w-44 h-auto transform -translate-x-1/2 bg-white rounded-sm border border-gray-200 shadow-md z-10">
									{isAdmin() ? (
										<li>
											<Link to="/admin/dashboard" className="px-6 py-3 flex items-center hover:bg-gray-50">
												<BsSpeedometer />
												<span className="ml-4 text-xs">Admin</span>
											</Link>
										</li>
									) : (
										<>
											<li>
												<Link to="/user/profile" className="px-6 py-3 flex items-center hover:bg-gray-50">
													<BsPerson />
													<span className="ml-4 text-xs">Profile</span>
												</Link>
											</li>
											<li>
												<Link to="/user/wish-list" className="px-6 py-3 flex items-center hover:bg-gray-50">
													<BsHeart />
													<span className="ml-4 text-xs">Wish List</span>
												</Link>
											</li>
										</>
									)}
									<li>
										<div onClick={logout} className="px-6 py-3 flex items-center cursor-pointer hover:bg-gray-50">
											<BsPower />
											<span className="ml-4 text-xs">Logout</span>
										</div>
									</li>
								</ul>
							)}
						</>
					) : (
						<span className="cursor-pointer select-none" onClick={() => dispatch({ type: 'loginRegisterModal', payload: true })}>
							<BsPerson />
						</span>
					)}
				</div>
				<div onClick={() => dispatch({ type: 'cartModal', payload: true })} className="relative cursor-pointer select-none">
					<BsHandbag />
					{data.cartProduct && data.cartProduct.length > 0 && <span className="absolute -top-3 -right-3 w-6 h-6 rounded-full bg-black text-white text-sm border-2 border-white grid place-items-center">{data.cartProduct.length}</span>}
				</div>
			</div>
		</header>
	);
};

export default Header;

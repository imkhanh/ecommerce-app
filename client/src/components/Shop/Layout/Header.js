import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { BsPerson, BsHeart, BsHandbag } from 'react-icons/bs';
import { LayoutContext } from './Layout';

const Header = () => {
	const { dispatch } = useContext(LayoutContext);

	return (
		<header className="h-16 sticky top-0 w-full z-20 bg-white border-b border-gray-100 px-8 md:px-4 flex items-center justify-between">
			<div className="w-1/3">
				<Link to="/" className="text-sm uppercase font-black text-black">
					e-Commerce
				</Link>
			</div>

			<div className="w-1/3 flex items-center justify-center">
				<ul className="flex items-center space-x-12">
					<li>
						<Link to="/" className="text-xs uppercase text-black hover:text-gray-700">
							Home
						</Link>
					</li>
					<li>
						<Link to="/" className="text-xs uppercase text-black hover:text-gray-700">
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

			<div className="w-1/3 flex items-center justify-end space-x-12">
				<div className="cursor-pointer">
					<BsHeart className="text-lg" />
				</div>
				<div>
					<span className="cursor-pointer select-none" onClick={() => dispatch({ type: 'loginRegisterModal', payload: true })}>
						<BsPerson className="text-lg" />
					</span>
				</div>
				<div onClick={() => dispatch({ type: 'cartModal', payload: true })} className="relative cursor-pointer select-none">
					<BsHandbag className="text-lg" />
					<span className="absolute -top-3 -right-3 w-6 h-6 rounded-full bg-black text-white text-sm border-2 border-white grid place-items-center">0</span>
				</div>
			</div>
		</header>
	);
};

export default Header;

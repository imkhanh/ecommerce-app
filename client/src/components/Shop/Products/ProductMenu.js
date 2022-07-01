import React, { useContext } from 'react';
import { BsChevronRight } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import { ProductContext } from './Products';

const ProductMenu = () => {
	const { state } = useContext(ProductContext);

	return (
		<div className="h-14 sticky top-14 bg-white border-b border-black/10 flex items-center justify-between z-10">
			<div className="flex items-center space-x-2">
				<Link to="/" className="text-sm font-light text-black/50">
					Home
				</Link>
				<span className="text-sm text-black/50">
					<BsChevronRight />
				</span>
				<span className="text-sm text-black cursor-pointer">Have {state.products && state.products.length} products</span>
			</div>
			<select className="p-2 w-40 text-sm border border-black/30 rounded-sm outline-none">
				<option value="">Sort by</option>
				<option value="">1</option>
				<option value="">1</option>
				<option value="">1</option>
			</select>
		</div>
	);
};

export default ProductMenu;

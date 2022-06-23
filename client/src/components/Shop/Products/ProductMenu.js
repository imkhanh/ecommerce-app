import React, { useContext } from 'react';
import { BsChevronDown, BsChevronUp } from 'react-icons/bs';
import ProductMenuDropdown from './ProductMenuDropdown';
import { ProductContext } from './Products';

const ProductMenu = () => {
	const { data, dispatch } = useContext(ProductContext);

	return (
		<div className="mb-8 sticky top-16 bg-white z-30">
			<div className="h-20 grid grid-cols-12 items-center">
				<div className="col-span-6">
					<h4 className="text-sm text-black font-light">Have {data.products.length} products</h4>
				</div>
				<div className="col-span-6 flex items-center justify-end space-x-6">
					<div
						onClick={() => dispatch({ type: 'searchDropdown', payload: !data.searchDropdown })}
						className={`${data.searchDropdown && 'text-blue-500 border-blue-500'} h-7 flex items-center justify-between w-full text-sm border-b border-black text-black cursor-pointer select-none`}
					>
						<span>Search</span>
						{data.searchDropdown ? <BsChevronUp /> : <BsChevronDown />}
					</div>
					<div
						onClick={() => dispatch({ type: 'categoryDropdown', payload: !data.categoryDropdown })}
						className={`${data.categoryDropdown && 'text-blue-500 border-blue-500'} h-7 flex items-center justify-between w-full text-sm border-b border-black text-black cursor-pointer select-none`}
					>
						<span>Category</span>
						{data.categoryDropdown ? <BsChevronUp /> : <BsChevronDown />}
					</div>
					<div
						onClick={() => dispatch({ type: 'priceDropdown', payload: !data.priceDropdown })}
						className={`${data.priceDropdown && 'text-blue-500 border-blue-500'} h-7 flex items-center justify-between w-full text-sm border-b border-black text-black cursor-pointer select-none`}
					>
						<span>Price</span>
						{data.priceDropdown ? <BsChevronUp /> : <BsChevronDown />}
					</div>
				</div>
			</div>
			<ProductMenuDropdown />
		</div>
	);
};

export default ProductMenu;

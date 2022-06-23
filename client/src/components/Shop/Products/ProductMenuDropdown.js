import React, { useContext } from 'react';
import { ProductContext } from './Products';
import { BsSearch } from 'react-icons/bs';

const SearchDropdown = () => {
	const { data } = useContext(ProductContext);

	return (
		<div className={`${data.searchDropdown ? 'h-28 opacity-100 pointer-events-auto border-gray-200' : 'h-0 opacity-0 pointer-events-none border-white'} border-t transition-all duration-300 ease-in-out`}>
			<div className="relative h-full flex items-center">
				<span className="absolute top-1/2 left-4 transform -translate-y-1/2 text-black/50">
					<BsSearch />
				</span>
				<input type="text" placeholder="Search" className="pl-11 text-sm w-full h-11 bg-gray-50 border border-gray-200 outline-none rounded-md focus:border-black/50 transition-colors" />
			</div>
		</div>
	);
};

const CategoryDropdown = () => {
	const { data } = useContext(ProductContext);

	return (
		<div className={`${data.categoryDropdown ? 'h-28 opacity-100 pointer-events-auto border-gray-200' : 'h-0 opacity-0 pointer-events-none border-white'} border-t transition-all duration-300 ease-in-out`}>
			<div className="h-full flex flex-col justify-center">
				<span className="block mb-2 text-sm font-medium">Category:</span>
				<span>Cate</span>
			</div>
		</div>
	);
};

const PriceDropdown = () => {
	const { data } = useContext(ProductContext);

	return (
		<div className={`${data.priceDropdown ? 'h-28 opacity-100 pointer-events-auto border-gray-200' : 'h-0 opacity-0 pointer-events-none border-white'} border-t transition-all duration-300 ease-in-out`}>
			<div className="h-full flex flex-col justify-center">
				<span className="block mb-2 text-sm font-medium">Price:</span>
				<input type="range" className="w-full cursor-pointer" min="0" max="10000" />
			</div>
		</div>
	);
};

const ProductMenuDropdown = () => {
	return (
		<>
			<SearchDropdown />
			<CategoryDropdown />
			<PriceDropdown />
		</>
	);
};

export default ProductMenuDropdown;

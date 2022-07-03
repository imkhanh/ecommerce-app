import React from 'react';
import { BsPlusCircleDotted } from 'react-icons/bs';

const ProductHeader = () => {
	return (
		<div>
			<button className="py-2 px-4 rounded-full flex items-center justify-center bg-black text-white">
				<BsPlusCircleDotted className="text-xl" />
				<span className="ml-2 text-sm">Add product</span>
			</button>
		</div>
	);
};

export default ProductHeader;

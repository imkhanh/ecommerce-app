import React from 'react';

const ProductSkeleton = () => {
	return (
		<div className="bg-white animate-pulse">
			<div className="w-full h-[340px] bg-gray-100"></div>
			<div className="pt-4">
				<div className="w-full h-6 bg-gray-100"></div>
				<div className="mt-3 w-full h-6 bg-gray-100"></div>
				<div className="mt-1 w-full h-6 bg-gray-100"></div>
			</div>
		</div>
	);
};

export default ProductSkeleton;

import React from 'react';

const Featured = () => {
	return (
		<div className="mt-16">
			<h4 className="text-3xl md:text-2xl">Featured</h4>
			<div className="mt-8 h-[700px] grid grid-cols-2 lg:grid-cols-1 gap-8">
				<div className="relative bg-blue-400">
					<div className="absolute left-8 bottom-8 space-y-6">
						<h4 className="text-3xl text-white">Restocked: The AF1 '07</h4>
						<button className="px-6 py-2 bg-black text-white rounded-full">Shop</button>
					</div>
				</div>
				<div className="relative bg-indigo-300">
					<div className="absolute left-8 bottom-8 space-y-6">
						<h4 className="text-3xl text-white">AJ XXXVI Low: 'New INFRARED</h4>
						<button className="px-6 py-2 bg-black text-white rounded-full">Shop</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Featured;

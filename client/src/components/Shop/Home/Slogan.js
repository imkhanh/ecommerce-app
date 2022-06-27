import React from 'react';

const Slogan = ({ title, subTitle }) => {
	return (
		<div className="py-16 flex items-center justify-center">
			<div className="text-center space-y-6">
				<h2 className="uppercase text-5xl lg:text-4xl md:text-3xl sm:text-2xl font-black text-black">{title}</h2>
				<p className="text-black">{subTitle}</p>
				<button className="px-6 py-2 text-sm sm:text-xs rounded-full text-white bg-black">Shop</button>
			</div>
		</div>
	);
};

export default Slogan;

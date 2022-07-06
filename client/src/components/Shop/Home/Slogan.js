import React from 'react';

const Slogan = ({ title, subTitle }) => {
	return (
		<div className="my-24 md:my-12 py-12 w-full h-full flex flex-col justify-center items-center">
			<div className="mb-4 text-center space-y-4">
				<h1 className="font-black text-6xl lg:text-5xl md:text-3xl uppercase">{title}</h1>
				<p className="lg:text-sm">{subTitle}</p>
			</div>
			<button className="py-2 px-6 bg-black text-white font-medium rounded-full">Shop</button>
		</div>
	);
};

export default Slogan;

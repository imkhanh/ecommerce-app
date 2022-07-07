import React from 'react';

const Featured = () => {
	return (
		<div>
			<div className="mb-8">
				<h1 className="font-bold text-2xl">Featured</h1>
			</div>
			<div className="grid grid-cols-2 lg:grid-cols-1 gap-4">
				{/* <div className="relative h-[700px] lg:h-[500px] md:h-[300px] bg-rose-500" style={{ backgroundImage: 'url()', backgroundPosition: 'center center', backgroundSize: 'cover' }}> */}
				<div className="relative">
					<img src="https://static.nike.com/a/images/f_auto/dpr_2.0,cs_srgb/w_779,c_limit/e4d57622-5c5f-4d98-818c-5c3ac1d55519/men-s-shoes-clothing-accessories.png" alt="featureImage" className="w-full h-auto object-cover" />
					<div className="absolute bottom-6 left-6 space-y-4">
						<h4 className="text-white text-2xl">Have A Nice Day: Sunshine for Days</h4>
						<button className="px-6 py-2 text-black bg-white rounded-full">Shop</button>
					</div>
				</div>

				<div className="relative">
					<img src="https://static.nike.com/a/images/f_auto/dpr_2.0,cs_srgb/w_779,c_limit/2360a758-317e-4d2c-849b-4cc2db22d82c/men-s-shoes-clothing-accessories.png" alt="featureImage" className="w-full h-auto object-cover" />
					<div className="absolute bottom-6 left-6 space-y-4">
						<h4 className="text-white text-2xl">Basketball Essentials</h4>
						<button className="px-6 py-2 text-black bg-white rounded-full">Shop</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Featured;

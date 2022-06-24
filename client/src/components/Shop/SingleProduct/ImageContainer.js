import React, { useState } from 'react';
import { BsChevronLeft, BsChevronRight } from 'react-icons/bs';
import { changeSlide } from './Mixins';
import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';

const ImageContainer = ({ product }) => {
	const [currentImg, setCurrentImg] = useState(0);

	return (
		<div className="col-span-6 md:col-span-12">
			<div className="relative">
				<span
					onClick={() => changeSlide('prev', product.images, currentImg, setCurrentImg)}
					className="absolute top-1/2 left-3 transform -translate-y-1/2 w-12 h-12 md:w-10 md:h-10 rounded-full grid place-items-center bg-transparent hover:bg-white cursor-pointer select-none transition-colors z-10"
				>
					<BsChevronLeft className="text-lg md:text-sm" />
				</span>
				<Zoom zoomMargin={80}>
					<img src={`http://localhost:3000/uploads/products/${product.images[currentImg]}`} alt={product.name} className="w-full h-full object-cover" />
				</Zoom>
				<span
					onClick={() => changeSlide('next', product.images, currentImg, setCurrentImg)}
					className="absolute top-1/2 right-3 transform -translate-y-1/2 w-12 h-12 md:w-10 md:h-10 rounded-full grid place-items-center bg-transparent hover:bg-white cursor-pointer select-none transition-colors z-10"
				>
					<BsChevronRight className="text-lg md:text-sm" />
				</span>
				<div className="absolute bottom-4 left-3 z-10">
					<span className="text-sm font-light bg-white rounded-full w-14 h-6 flex items-center justify-center ">
						{currentImg + 1} / {product.images.length}
					</span>
				</div>
			</div>
		</div>
	);
};

export default ImageContainer;

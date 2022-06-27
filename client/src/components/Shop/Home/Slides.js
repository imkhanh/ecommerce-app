import React, { useContext, useEffect, useState } from 'react';
import { BsChevronLeft, BsChevronRight } from 'react-icons/bs';
import { getAllSlides } from './FetchData';
import { HomeContext } from './Home';
import { changeSlide } from '../SingleProduct/Mixins';

const Slides = () => {
	const { data, dispatch } = useContext(HomeContext);

	const [currentImage, setCurrentImage] = useState(0);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const res = await getAllSlides();
				dispatch({ type: 'slides', payload: res.images });
			} catch (error) {
				console.log(error);
			}
		};
		fetchData();
		// eslint-disable-next-line
	}, []);

	return (
		<section className="relative bg-white h-[90vh] lg:h-[70vh] md:h-[60vh] sm:h-[40vh] transition-all duration-200 ease-in-out">
			<div className="absolute inset-0 bg-black opacity-20 z-10" />

			{data.slides.length > 0 && (
				<img src={`http://localhost:3000/uploads/slides/${data.slides[currentImage].slideImage}`} alt="slider" className=" object-cover w-full h-full" />
			)}

			<span
				onClick={() => changeSlide('prev', data.slides, currentImage, setCurrentImage)}
				className="absolute top-1/2 left-4 transform -translate-y-1/2 w-10 h-10 bg-transparent border border-white hover:border-white text-white hover:text-black rounded-full select-none flex items-center justify-center cursor-pointer z-10 transition-colors"
			>
				<BsChevronLeft />
			</span>
			<span
				onClick={() => changeSlide('next', data.slides, currentImage, setCurrentImage)}
				className="absolute top-1/2 right-4 transform -translate-y-1/2 w-10 h-10 bg-transparent border border-white hover:border-white text-white hover:text-black rounded-full select-none flex items-center justify-center cursor-pointer z-10 transition-colors"
			>
				<BsChevronRight />
			</span>
		</section>
	);
};

export default Slides;

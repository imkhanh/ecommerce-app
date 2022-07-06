import React, { useContext, useEffect, useState } from 'react';
import { HomeContext } from './Home';
import { getAllSlides } from './FetchData';
import { BsChevronLeft, BsChevronRight } from 'react-icons/bs';
import { changeSlide } from '../SingleProduct/Minxins';

const Slides = () => {
	const { state, dispatch } = useContext(HomeContext);
	const [currentImage, setCurrentImage] = useState(0);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const res = await getAllSlides();
				dispatch({ type: 'slides', payload: res.slides });
			} catch (error) {
				console.log(error);
			}
		};

		fetchData();
		// eslint-disable-next-line
	}, []);

	return (
		<div className="relative h-[740px] lg:h-[640px] md:h-[540px] sm:h-[440px] bg-gray-200 transition-all duration-200 ease-in-out">
			{state.slides.length > 0 ? <img src={`http://localhost:3000/uploads/customizes/${state.slides[currentImage].slideImage}`} className="w-full h-full object-cover" alt="slideIamge" /> : ''}

			{state.slides.length > 0 ? (
				<>
					<span
						onClick={() => changeSlide('prev', currentImage, setCurrentImage, state.slides)}
						className="z-10 absolute top-1/2 left-8 md:left-4 transform -translate-y-1/2 border border-black/30 text-black/30 hover:text-black hover:bg-white hover:border-white rounded-full w-10 h-10 flex items-center justify-center cursor-pointer select-none transition-colors"
					>
						<BsChevronLeft />
					</span>
					<span
						onClick={() => changeSlide('next', currentImage, setCurrentImage, state.slides)}
						className="z-10 absolute top-1/2 right-8 md:right-4 transform -translate-y-1/2 border border-black/30 text-black/30 hover:text-black hover:bg-white hover:border-white rounded-full w-10 h-10 flex items-center justify-center cursor-pointer select-none transition-colors"
					>
						<BsChevronRight />
					</span>
				</>
			) : null}
		</div>
	);
};

export default Slides;

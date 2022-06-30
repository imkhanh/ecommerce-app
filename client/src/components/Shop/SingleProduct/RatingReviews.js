import React from 'react';
import { BsChevronUp } from 'react-icons/bs';

const RatingReviews = () => {
	return (
		<div className="py-4 border-b border-gray-200 flex items-center justify-between cursor-pointer select-none">
			<span className="text-black text-lg">Rating reveiws (0)</span>
			<span className="text-lg">
				<BsChevronUp />
			</span>
		</div>
	);
};

export default RatingReviews;

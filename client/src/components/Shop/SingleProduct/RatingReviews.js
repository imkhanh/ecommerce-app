import React, { useContext, useState } from 'react';
import { BsChevronDown, BsChevronUp } from 'react-icons/bs';
import { isAuth } from '../Auth/Authentication';
import { LayoutContext } from '../Layout/Layout';
import ReviewForm from './ReviewForm';
import ReviewDisplay from './ReviewDisplay';

const RatingReviews = () => {
	const { state, dispatch } = useContext(LayoutContext);
	const [showReview, setShowReview] = useState(false);

	const product = state.singleProduct;

	return (
		<div className="py-4 border-b border-gray-200">
			<div onClick={() => setShowReview(!showReview)} className="flex items-center justify-between cursor-pointer select-none">
				<span className="text-black font-medium text-lg">Rating reviews ({product && product.ratingReviews.length})</span>
				<span className="text-lg">{showReview ? <BsChevronDown /> : <BsChevronUp />}</span>
			</div>

			{showReview && (
				<div className="py-6">
					<ReviewDisplay />
					{!isAuth() ? (
						<div>
							<p onClick={() => dispatch({ type: 'authModal', payload: true })} className="underline underline-offset-4 cursor-pointer">
								Write a Review
							</p>
						</div>
					) : (
						<ReviewForm />
					)}
				</div>
			)}
		</div>
	);
};

export default RatingReviews;

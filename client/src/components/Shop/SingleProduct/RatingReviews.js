import React, { useContext, useState } from 'react';
import { isAuth } from '../Auth/Auth';
import { LayoutContext } from '../Layout/Layout';
import RatingReviewForm from './RatingReviewForm';
import RatingReviewDisplay from './RatingReviewDisplay';

const RatingReviews = () => {
	const { data, dispatch } = useContext(LayoutContext);
	const [menu, setMenu] = useState(false);

	const product = data.singleProduct;

	return (
		<div className="mt-24">
			<div className="h-16 flex items-center justify-center border-b border-gray-200 space-x-8">
				<div onClick={() => setMenu(true)} className={`${menu ? 'text-black' : 'text-black/50'} uppercase text-xs font-light  cursor-pointer select-none`}>
					<span>Description</span>
				</div>
				<div className="text-black/50">/</div>
				<div onClick={() => setMenu(false)} className={`${menu ? 'text-black/50' : 'text-black'} relative flex items-center uppercase text-xs font-light  cursor-pointer select-none`}>
					<span>Reviews</span>
					<span className="ml-1 w-4 h-4 text-xs flex items-center justify-center rounded-full bg-gray-300 text-black">{product.ratingReviews.length}</span>
				</div>
			</div>

			{menu ? (
				<div className="py-8 space-y-12">
					<div>
						<span className="text-sm font-medium underline underline-offset-2">Description</span>
						<p className="mt-3 font-light text-sm text-justify leading-7">{product.description}</p>
					</div>
					<div className="grid grid-cols-1 gap-y-3">
						{product.images.length > 0 &&
							product.images.map((img, index) => {
								return <img key={index} src={`http://localhost:3000/uploads/products/${img}`} alt={product.name} className="w-full h-full object-cover" />;
							})}
					</div>
				</div>
			) : (
				<div className="py-8 space-y-8">
					{!isAuth() ? (
						<div>
							<p onClick={() => dispatch({ type: 'loginRegisterModal', payload: true })} className="underline underline-offset-2 cursor-pointer select-none">
								Write a review
							</p>
						</div>
					) : (
						<RatingReviewForm />
					)}
					<RatingReviewDisplay />
				</div>
			)}
		</div>
	);
};

export default RatingReviews;

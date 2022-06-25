import React, { useContext } from 'react';
import { BsPersonCircle, BsStarFill, BsTrash } from 'react-icons/bs';
import { useParams } from 'react-router-dom';
import { LayoutContext } from '../Layout/Layout';
import { postDeleteReview, getSingleProduct } from './FetchData';
import { isAuth } from '../Auth/Auth';
import dayjs from 'dayjs';

const RatingReviewDisplay = () => {
	const { id } = useParams();
	const { data, dispatch } = useContext(LayoutContext);

	const reviews = data.singleProduct.ratingReviews;

	const fetchData = async () => {
		try {
			const res = await getSingleProduct(id);
			dispatch({ type: 'singleProduct', payload: res.product });
		} catch (error) {}
	};

	const handleDelete = async (reviewId) => {
		let formData = {
			pId: id,
			rId: reviewId,
		};

		try {
			const res = await postDeleteReview(formData);
			if (res && res.success) {
				fetchData();
			}
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<div>
			<div className="mb-4">
				<h2 className="text-2xl">All reviews</h2>
				<p className="mt-2 text-sm font-light text-black/40 italic">{reviews && reviews.length} reviews</p>
			</div>

			<div className="divide-y divide-gray-200">
				{reviews && reviews.length > 0 ? (
					reviews.map((item) => {
						return (
							<div key={item._id} className="py-4 bg-white grid grid-cols-12">
								<div className="col-span-11 flex items-start">
									<div className="flex flex-col items-center justify-start space-y-2">
										<div className="text-[40px] text-black/50">
											<BsPersonCircle />
										</div>
										<div className="flex items-center">
											{[...Array(Number(item.rating))].map((_, index) => {
												return (
													<span key={index} className="text-xs text-yellow-500">
														<BsStarFill />
													</span>
												);
											})}
											{[...Array(5 - Number(item.rating))].map((_, index) => {
												return (
													<span key={index} className="text-xs text-black/30">
														<BsStarFill />
													</span>
												);
											})}
										</div>
									</div>
									<div className="pl-6">
										<div>
											<h4 className="text-xs text-black">{item.user.username}</h4>
											<p className="text-[10px] text-black/30 font-light italic">
												{item.user.email} - {dayjs(item.createdAt).format('DD/MM/YYYY')}
											</p>
										</div>
										<div className="mt-3">
											<p className="text-xs">{item.review}</p>
										</div>
									</div>
								</div>
								{isAuth().user && item.user && isAuth().user._id === item.user._id && (
									<div onClick={() => handleDelete(item._id)} className="col-span-1 flex justify-end cursor-pointer hover:text-red-500">
										<BsTrash />
									</div>
								)}
							</div>
						);
					})
				) : (
					<div>Be the first reivew</div>
				)}
			</div>
		</div>
	);
};

export default RatingReviewDisplay;

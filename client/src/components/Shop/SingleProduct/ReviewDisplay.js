import React, { useContext } from 'react';
import { BsStarFill, BsTrash } from 'react-icons/bs';
import { LayoutContext } from '../Layout/Layout';
import { isAuth } from '../Auth/Authentication';
import { useParams } from 'react-router-dom';
import { getSingleProduct, postDeleteReview } from './FetchData';
import dayjs from 'dayjs';

const ReviewDisplay = () => {
	const { id } = useParams();
	const { state, dispatch } = useContext(LayoutContext);

	const product = state.singleProduct;

	const fetchData = async () => {
		try {
			const res = await getSingleProduct(id);
			dispatch({ type: 'singleProduct', payload: res.product });
		} catch (error) {
			console.log(error);
		}
	};

	const handleDeleteReview = async (reviewId) => {
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
		<div className="mb-4 divide-y divide-gray-200">
			{product.ratingReviews && product.ratingReviews.length > 0 ? (
				product.ratingReviews.map((item) => {
					return (
						<div key={item._id} className="py-4">
							<div className="">
								<div className="flex items-center justify-between">
									<div className="flex">
										{[...Array(Number(item.rating))].map((_, index) => {
											return (
												<span key={index} className="text-yellow-500 text-xs">
													<BsStarFill />
												</span>
											);
										})}
										{[...Array(Number(5 - item.rating))].map((_, index) => {
											return (
												<span key={index} className="text-black/30 text-xs">
													<BsStarFill />
												</span>
											);
										})}
									</div>
									{isAuth().user && item.user && isAuth().user._id === item.user._id && (
										<div>
											<span onClick={() => handleDeleteReview(item._id)} className="select-none cursor-pointer">
												<BsTrash />
											</span>
										</div>
									)}
								</div>
								<p className="mt-1 text-black/40 text-sm font-light">
									{item.user.name} - {item.user._id} - {dayjs(item.createdAt).format('DD/MM/YYYY')}
								</p>
							</div>
							<p className="mt-3 text-sm">{item.review}</p>
						</div>
					);
				})
			) : (
				<div className="mt-2">
					<p className="text-black">
						Have your say. Be the first to review the <span className="font-medium">{product.title}.</span>
					</p>
				</div>
			)}
		</div>
	);
};

export default ReviewDisplay;

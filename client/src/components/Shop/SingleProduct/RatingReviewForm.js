import React, { useContext, useState } from 'react';
import { getSingleProduct, postAddReview } from './FetchData';
import { useParams } from 'react-router-dom';
import { LayoutContext } from '../Layout/Layout';
import './style.css';

const RatingReviewForm = () => {
	const { id } = useParams();
	const { dispatch } = useContext(LayoutContext);
	const [state, setState] = useState({ rating: '', review: '', success: '', error: '' });

	const fetchData = async () => {
		try {
			const res = await getSingleProduct(id);
			dispatch({ type: 'singleProduct', payload: res.product });
		} catch (error) {}
	};

	const alert = (color, text) => {
		return <div className={`mt-2 mb-4 px-4 py-3 border-l-2 border-${color}-500 text-sm bg-${color}-50 text-${color}-500 rounded-sm`}>{text}</div>;
	};

	if (state.error || state.success) {
		setTimeout(() => {
			setState({ ...state, rating: '', review: '', success: false, error: false });
		}, 2000);
	}

	const handleSubmit = async () => {
		let formData = {
			pId: id,
			uId: JSON.parse(localStorage.getItem('jwt')).user._id,
			rating: state.rating,
			review: state.review,
		};

		try {
			const res = await postAddReview(formData);
			if (res && res.success) {
				setState({ ...state, rating: '', review: '', success: res.success, error: false });
				fetchData();
			} else {
				setState({ ...state, rating: '', review: '', success: false, error: res.error });
			}
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<div>
			<div className="flex flex-col space-y-2">
				<span className="text-2xl font-medium">Add a review</span>
				<span className="text-black/50 text-sm font-light italic">Your email address will not be published. Required fields are marked *</span>
			</div>
			{state.error && alert('red', state.error)}
			{state.success && alert('green', state.success)}
			{/* Input Rating */}
			<div className="mb-4">
				<fieldset className="rating" onChange={(e) => setState({ ...state, rating: e.target.value })}>
					<input type="radio" className="rating" id="star5" name="rating" defaultValue={5} />
					<label className="full" htmlFor="star5" title="Awesome - 5 stars" />
					<input type="radio" className="rating" id="star4" name="rating" defaultValue={4} />
					<label className="full" htmlFor="star4" title="Pretty good - 4 stars" />
					<input type="radio" className="rating" id="star3" name="rating" defaultValue={3} />
					<label className="full" htmlFor="star3" title="Meh - 3 stars" />
					<input type="radio" className="rating" id="star2" name="rating" defaultValue={2} />
					<label className="full" htmlFor="star2" title="Kinda bad - 2 stars" />
					<input type="radio" className="rating" id="star1" name="rating" defaultValue={1} />
					<label className="full" htmlFor="star1" title="Sucks big time - 1 star" />
				</fieldset>
			</div>
			<div className="space-y-3">
				<textarea
					rows={5}
					value={state.review}
					onChange={(e) => setState({ ...state, review: e.target.value })}
					placeholder="Write a review"
					className="pt-2 pl-2 text-sm w-full border border-gray-200 rounded-sm outline-none focus:border-black transition-colors"
				/>
				<button type="button" onClick={handleSubmit} className="py-2 px-4 text-sm bg-black text-white rounded-sm">
					Submit
				</button>
			</div>
		</div>
	);
};

export default RatingReviewForm;

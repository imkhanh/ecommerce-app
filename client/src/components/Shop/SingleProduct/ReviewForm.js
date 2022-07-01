import React, { useContext, useState } from 'react';
import { useParams } from 'react-router-dom';
import { isAuth } from '../Auth/Authentication';
import { LayoutContext } from '../Layout/Layout';
import { getSingleProduct, postAddReview } from './FetchData';
import './style.css';

const ReviewForm = () => {
	const { id } = useParams();
	const { state, dispatch } = useContext(LayoutContext);
	const [form, setForm] = useState({ rating: '', review: '', success: '', error: '' });

	const alert = (color, text) => <div className={`my-2 px-4 h-10 flex items-center text-sm border-l-2 border-${color}-700 bg-${color}-100 text-${color}-700 `}>{text}</div>;

	if (form.success || form.error) {
		setTimeout(() => {
			setForm({ ...form, rating: '', review: '', success: '', error: '' });
		}, 2000);
	}

	const fetchData = async () => {
		try {
			const res = await getSingleProduct(id);
			dispatch({ type: 'singleProduct', payload: res.product });
		} catch (error) {
			console.log(error);
		}
	};

	const handleSubmit = async () => {
		let formData = {
			pId: id,
			uId: JSON.parse(localStorage.getItem('jwt')).user._id,
			rating: form.rating,
			review: form.review,
		};
		try {
			const res = await postAddReview(formData);
			if (res && res.success) {
				fetchData();
				setForm({ ...form, rating: '', review: '', success: res.success, error: false });
			} else {
				setForm({ ...form, rating: '', review: '', success: false, error: res.error });
			}
		} catch (error) {
			console.log(error);
		}
	};

	const reviewList = state.singleProduct.ratingReviews.map((item) => {
		return item.user ? item.user._id : '';
	});

	return (
		<>
			{reviewList.includes(isAuth().user._id) ? (
				''
			) : (
				<div>
					<div className="flex flex-col">
						<span className="text-lg font-medium">Add a review</span>
						<span className="text-[#888] text-sm font-light italic">* Your email address will not be published. Required fields are marked</span>
					</div>

					{form.error && alert('red', form.error)}
					{form.success && alert('green', form.success)}

					<div>
						<fieldset
							className="rating"
							onChange={(e) => {
								setForm({ ...form, rating: e.target.value });
							}}
						>
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
					<div>
						<textarea
							value={form.review}
							onChange={(e) => {
								setForm({ ...form, review: e.target.value });
							}}
							rows={4}
							placeholder="Write a review"
							className="p-2 w-full h-auto text-sm border border-black/30 hover:border-black outline-none rounded-sm"
						/>
						<button onClick={() => handleSubmit()} type="button" className="px-4 py-2 bg-black text-white text-sm font-medium rounded-sm">
							Submit
						</button>
					</div>
				</div>
			)}
		</>
	);
};

export default ReviewForm;

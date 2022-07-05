import React, { useContext, useEffect, useState } from 'react';
import { BsPlusCircleDotted, BsX } from 'react-icons/bs';
import { getAllSlides, postAddSlide, deleteSlide } from './FetchData';
import { AdminDashboardContext } from './AdminDashboard';
import Loading from '../Layout/Loading';

const UploadContainer = () => {
	const { state, dispatch } = useContext(AdminDashboardContext);
	const { slides, loading } = state;
	const [image, setImage] = useState('');

	useEffect(() => {
		fetchData();
		// eslint-disable-next-line
	}, []);

	const fetchData = async () => {
		dispatch({ type: 'loading', payload: true });

		try {
			const res = await getAllSlides();
			dispatch({ type: 'slides', payload: res.slides });
			dispatch({ type: 'loading', payload: false });
		} catch (error) {
			console.log(error);
		}
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		let formData = new FormData();
		formData.append('image', image);

		try {
			const res = await postAddSlide(formData);
			if (res && res.success) {
				dispatch({ type: 'slides', payload: res.slides });
			}
		} catch (error) {
			console.log(error);
		}
	};

	const handleDeletImage = async (id) => {
		try {
			const res = await deleteSlide(id);
			if (res && res.success) {
				fetchData();
			}
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<div className="mt-12">
			<div className="mb-4">
				<h4 className="text-black font-bold">Upload slide</h4>
			</div>

			<div className="relative w-full p-8 border-t-4 border-black bg-white rounded-bl-md rounded-br-md shadow-lg overflow-x-auto space-y-8">
				<form onSubmit={handleSubmit} className="relative">
					<button type="submit" className="px-4 py-2 rounded-full flex items-center justify-center bg-black text-white">
						<BsPlusCircleDotted className="text-xl" />
						<span className="ml-2 text-white text-sm">Add slide</span>
					</button>
					<input type="file" name="image" onChange={(e) => setImage(e.target.files[0])} className="absolute top-1/2 left-0 -translate-y-1/2 opacity-0" />
				</form>

				<div className="flex overflow-x-auto space-x-3">
					{slides &&
						slides.map((img, index) => {
							return (
								<div key={index} className="pb-2 flex-shrink-0 relative w-[700px] h-[360px]">
									<span onClick={() => handleDeletImage(img._id)} className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black text-white flex items-center justify-center cursor-pointer select-none">
										<BsX className="text-xl" />
									</span>
									<img src={`http://localhost:3000/uploads/customizes/${img.slideImage}`} alt={index} className="w-full h-full object-cover" />
								</div>
							);
						})}
					{loading && <Loading />}
				</div>
			</div>
		</div>
	);
};

export default UploadContainer;

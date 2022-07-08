import React, { useContext, useEffect } from 'react';
import { BsPlusCircleDotted, BsX } from 'react-icons/bs';
import { getAllSlides, postAddSlide, deleteSlide } from './FetchData';
import { AdminDashboardContext } from './AdminDashboard';

const UploadContainer = () => {
	const { state, dispatch } = useContext(AdminDashboardContext);
	const { slides } = state;

	useEffect(() => {
		fetchData();
		// eslint-disable-next-line
	}, []);

	const fetchData = async () => {
		try {
			const res = await getAllSlides();
			dispatch({ type: 'slides', payload: res.slides });
		} catch (error) {
			console.log(error);
		}
	};

	const handleChange = async (image) => {
		const formData = new FormData();
		formData.append('slideImage', image);

		try {
			const res = await postAddSlide(formData);
			console.log(res);
			if (res && res.success) {
				fetchData();
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
				<h4 className="text-black font-bold">Upload Slide</h4>
			</div>

			<div className="relative w-full p-8 border-t-4 border-black bg-white rounded-bl-md rounded-br-md shadow-lg overflow-x-auto space-y-8">
				<div className="relative">
					<button type="submit" className="px-4 py-2 rounded-full flex items-center justify-center bg-black text-white">
						<BsPlusCircleDotted className="text-xl" />
						<span className="ml-2 text-white text-sm">Add slide</span>
					</button>
					<input type="file" name="image" onChange={(e) => handleChange(e.target.files[0])} className="absolute top-1/2 left-0 -translate-y-1/2 opacity-0" />
				</div>

				<div className="flex overflow-x-auto space-x-3">
					{slides &&
						slides.map((img, index) => {
							return (
								<div key={index} className="pb-3 flex-shrink-0 relative w-[880px] h-[420px]">
									<span onClick={() => handleDeletImage(img._id)} className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black text-white flex items-center justify-center cursor-pointer select-none">
										<BsX className="text-xl" />
									</span>
									<img src={`http://localhost:3000/uploads/customizes/${img.slideImage}`} alt={index} className="w-full h-full object-cover" />
								</div>
							);
						})}
				</div>
			</div>
		</div>
	);
};

export default UploadContainer;

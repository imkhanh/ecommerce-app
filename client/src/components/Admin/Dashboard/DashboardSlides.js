import React, { useContext, useEffect } from 'react';
import { BsPlusCircleDotted, BsXLg } from 'react-icons/bs';
import UploadModal from './UploadModal';
import { DashboardContext } from './Dashboard';
import { deleteImage, getAllSlides } from './FetchData';
import Loading from '../Layout/Loading';

const DashboardSlides = () => {
	const { data, dispatch } = useContext(DashboardContext);
	const { slideImages: images, loading } = data;

	useEffect(() => {
		fetchData();
		// eslint-disable-next-line
	}, []);

	const fetchData = async () => {
		dispatch({ type: 'loading', payload: true });
		try {
			const res = await getAllSlides();
			if (res && res.images) {
				dispatch({ type: 'slideImages', payload: res.images });
				dispatch({ type: 'loading', payload: false });
			}
		} catch (error) {
			console.log(error);
		}
	};

	const handleDeleteImage = async (id) => {
		try {
			const res = await deleteImage(id);
			if (res && res.success) {
				fetchData();
			}
		} catch (error) {
			console.log(error);
		}
	};

	if (loading) return <Loading />;

	return (
		<div className="mt-16 p-8 border-t-[3px] border-black shadow-lg rounded-bl-md rounded-br-md">
			<div className="mb-4">
				<button onClick={() => dispatch({ type: 'uploadModal', payload: true })} className="p-3 bg-black text-white rounded-full flex items-center">
					<BsPlusCircleDotted />
				</button>
			</div>
			<div className="mb-2">
				<h4 className="text-sm font-light text-black/50">{images && images.length} slides</h4>
			</div>
			{data.uploadModal && <UploadModal />}

			<div className="flex gap-x-3 overflow-x-auto">
				{images && images.length > 0 ? (
					images.map((img, index) => {
						return (
							<div key={index} className="relative mb-4 flex-shrink-0 h-[300px]">
								<div className="absolute inset-0 bg-black opacity-30" />
								<img src={`http://localhost:3000/uploads/slides/${img.slideImage}`} alt={index} className="w-full h-full object-cover" />
								<span
									onClick={() => handleDeleteImage(img._id)}
									className="absolute top-3 right-3 bg-black text-white w-8 h-8 rounded-full flex items-center justify-center cursor-pointer z-20"
								>
									<BsXLg />
								</span>
							</div>
						);
					})
				) : (
					<div className="pt-4 font-light italic text-black/50">No slide found</div>
				)}
			</div>
		</div>
	);
};

export default DashboardSlides;

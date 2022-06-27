import React, { useContext } from 'react';
import { BsImage } from 'react-icons/bs';
import { DashboardContext } from './Dashboard';
import { postUploadImage } from './FetchData';

const UploadModal = () => {
	const { data, dispatch } = useContext(DashboardContext);

	const handleUploadImage = async (image) => {
		let formData = new FormData();
		formData.append('slideImage', image);

		try {
			const res = await postUploadImage(formData);
			if (res && res.success) {
				dispatch({ type: 'uploadModal', payload: false });
			}
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<div>
			<div onClick={() => dispatch({ type: 'uploadModal', payload: false })} className={`${data.uploadModal ? '' : 'hidden'} fixed inset-0 bg-black opacity-30 z-10`}></div>
			<div
				className={`${
					data.uploadModal ? '' : 'hidden'
				} fixed top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2 bg-white max-w-md w-full h-auto rounded-sm shadow-lg z-30`}
			>
				<form className="relative p-8">
					<div className="text-sm w-full h-40 border border-dotted border-black/70">
						<span className="absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2 cursor-pointer">
							<BsImage className="text-5xl text-gray-500" />
						</span>
						<input
							type="file"
							onChange={(e) => handleUploadImage(e.target.files[0])}
							className="absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2 opacity-0 cursor-pointer"
						/>
					</div>
				</form>
			</div>
		</div>
	);
};

export default UploadModal;

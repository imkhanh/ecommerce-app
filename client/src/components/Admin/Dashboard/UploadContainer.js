import React from 'react';
import { BsPlusCircleDotted } from 'react-icons/bs';

const UploadContainer = () => {
	return (
		<div className="mt-12">
			<div className="mb-4">
				<h4 className="text-black font-bold">Upload slide</h4>
			</div>

			<div className="w-full p-8 border-t-4 border-black rounded-bl-md rounded-br-md shadow-lg overflow-x-auto space-y-8">
				<div className="relative">
					<button className="px-4 py-2 rounded-full flex items-center justify-center bg-black text-white">
						<BsPlusCircleDotted className="text-xl" />
						<span className="ml-2 text-white text-sm">Add slide</span>
					</button>
					<input type="file" className="absolute top-1/2 left-0 -translate-y-1/2 opacity-0" />
				</div>

				<div>
					<div className="w-[700px] h-[360px] bg-gray-100"></div>
				</div>
			</div>
		</div>
	);
};

export default UploadContainer;

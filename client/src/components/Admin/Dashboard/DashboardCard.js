import React, { useContext, useEffect } from 'react';
import { BsCollectionFill, BsPeopleFill, BsBox, BsReceipt } from 'react-icons/bs';
import { AdminDashboardContext } from './AdminDashboard';
import { getAllData } from './FetchData';

const DashboardCard = () => {
	const { state, dispatch } = useContext(AdminDashboardContext);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const res = await getAllData();
				dispatch({ type: 'totalData', payload: res });
			} catch (error) {
				console.log(error);
			}
		};

		fetchData();
		// eslint-disable-next-line
	}, []);

	return (
		<div>
			<div className="mb-4">
				<h4 className="text-black font-bold">Dashboard Card</h4>
			</div>
			<div className="grid grid-cols-4 gap-4">
				<div className="h-44 border-t-4 border-blue-500 flex items-center justify-center shadow-lg rounded-bl-md rounded-br-md">
					<div className="flex flex-col items-center space-y-2">
						<div className="w-12 h-12 rounded-full flex items-center justify-center bg-blue-50 text-blue-500">
							<BsPeopleFill />
						</div>
						<span className="text-sm text-blue-500">{state ? state.totalData.users : 0}</span>
					</div>
				</div>
				<div className="h-44 border-t-4 border-yellow-500 flex items-center justify-center shadow-lg rounded-bl-md rounded-br-md">
					<div className="flex flex-col items-center space-y-2">
						<div className="w-12 h-12 rounded-full flex items-center justify-center bg-yellow-50 text-yellow-500">
							<BsCollectionFill />
						</div>
						<span className="text-sm text-yellow-500">{state ? state.totalData.products : 0}</span>
					</div>
				</div>
				<div className="h-44 border-t-4 border-sky-500 flex items-center justify-center shadow-lg rounded-bl-md rounded-br-md">
					<div className="flex flex-col items-center space-y-2">
						<div className="w-12 h-12 rounded-full flex items-center justify-center bg-sky-50 text-sky-500">
							<BsBox />
						</div>
						<span className="text-sm text-sky-500">{state ? state.totalData.categories : 0}</span>
					</div>
				</div>
				<div className="h-44 border-t-4 border-green-500 flex items-center justify-center shadow-lg rounded-bl-md rounded-br-md">
					<div className="flex flex-col items-center space-y-2">
						<div className="w-12 h-12 rounded-full flex items-center justify-center bg-green-50 text-green-500">
							<BsReceipt />
						</div>
						<span className="text-sm text-green-500">{state ? state.totalData.orders : 0}</span>
					</div>
				</div>
			</div>
		</div>
	);
};

export default DashboardCard;

import React, { useContext, useEffect } from 'react';
import { BsArchiveFill, BsCashCoin, BsCollectionFill, BsPeopleFill } from 'react-icons/bs';
import Loading from '../Layout/Loading';
import { DashboardContext } from './Dashboard';
import { getAllData } from './FetchData';

const DashboadCard = () => {
	const { data, dispatch } = useContext(DashboardContext);
	const { totalData, loading } = data;

	useEffect(() => {
		const fetchData = async () => {
			dispatch({ type: 'loading', payload: true });

			try {
				const res = await getAllData();
				if (res) {
					dispatch({ type: 'totalData', payload: res });
					dispatch({ type: 'loading', payload: false });
				}
			} catch (error) {
				console.log(error);
			}
		};

		fetchData();
		// eslint-disable-next-line
	}, []);

	if (loading) return <Loading />;

	return (
		<div className="grid grid-cols-4 gap-3">
			<div className="border-t-[3px] border-sky-500 w-full h-40 bg-white shadow-lg rounded-bl-md rounded-br-md">
				<div className="h-full flex flex-col items-center justify-center space-y-2">
					<span className="w-10 h-10 rounded-full grid place-items-center bg-sky-50 text-sky-500">
						<BsCollectionFill />
					</span>
					<span>{data.totalData ? totalData.products : 0}</span>
				</div>
			</div>
			<div className="border-t-[3px] border-amber-500 w-full h-40 bg-white shadow-lg rounded-bl-md rounded-br-md">
				<div className="h-full flex flex-col items-center justify-center space-y-2">
					<span className="w-10 h-10 rounded-full grid place-items-center bg-amber-50 text-amber-500">
						<BsArchiveFill />
					</span>
					<span>{data.totalData ? totalData.categories : 0}</span>
				</div>
			</div>
			<div className="border-t-[3px] border-blue-500 w-full h-40 bg-white shadow-lg rounded-bl-md rounded-br-md">
				<div className="h-full flex flex-col items-center justify-center space-y-2">
					<span className="w-10 h-10 rounded-full grid place-items-center bg-blue-50 text-blue-500">
						<BsPeopleFill />
					</span>
					<span>{data.totalData ? totalData.users : 0}</span>
				</div>
			</div>
			<div className="border-t-[3px] border-purple-500 w-full h-40 bg-white shadow-lg rounded-bl-md rounded-br-md">
				<div className="h-full flex flex-col items-center justify-center space-y-2">
					<span className="w-10 h-10 rounded-full grid place-items-center bg-purple-50 text-purple-500">
						<BsCashCoin />
					</span>
					<span>4</span>
				</div>
			</div>
		</div>
	);
};

export default DashboadCard;

import React, { useContext, useEffect } from 'react';
import { AdminDashboardContext } from './AdminDashboard';
import { getAllOrders } from './FetchData';
import dayjs from 'dayjs';
import { useNavigate } from 'react-router-dom';

const TodayAllOrders = () => {
	const navigate = useNavigate();
	const { state, dispatch } = useContext(AdminDashboardContext);

	useEffect(() => {
		const fetchOrderData = async () => {
			try {
				const res = await getAllOrders();
				dispatch({ type: 'totalOrders', payload: res.orders });
			} catch (error) {
				console.log(error);
			}
		};

		fetchOrderData();
		// eslint-disable-next-line
	}, []);

	return (
		<div className="mt-12 w-full p-8 border-t-4 border-black bg-white rounded-bl-md rounded-br-md shadow-lg overflow-x-auto">
			<div className="text-2xl font-semibold mb-8 text-center">Today's Orders </div>
			<table className="min-w-full text-sm border border-gray-200">
				<thead className="border-b border-gray-200">
					<tr>
						<th className="p-4 font-medium text-left text-gray-900 whitespace-nowrap">Products</th>
						<th className="py-4 font-medium text-left text-gray-900 whitespace-nowrap">Image</th>
						<th className="p-4 font-medium text-left text-gray-900 whitespace-nowrap">Status</th>
						<th className="p-4 font-medium text-left text-gray-900 whitespace-nowrap">Order Address</th>
						<th className="p-4 font-medium text-left text-gray-900 whitespace-nowrap">Ordered At</th>
					</tr>
				</thead>
				<tbody>
					{state.totalOrders !== undefined ? (
						state.totalOrders.map((order, index) => {
							return (
								<tr key={index} className="divide-y divide-gray-200">
									<td className="w-72 p-4 space-y-2 divide-y divide-gray-200">
										{order.allProduct.map((item, index) => {
											return (
												<div key={index} className="py-1 flex flex-col space-y-2">
													<span>{item.id.title}</span>
													<span className="text-black/40">x{item.quantity}</span>
												</div>
											);
										})}
									</td>
									<td className="py-4 space-y-2">
										{order.allProduct.map((item, index) => {
											return <img key={index} className="w-16 h-18 object-cover" src={`http://localhost:3000/uploads/products/${item.id.images[0]}`} alt="Pic" />;
										})}
									</td>
									<td className="py-4">
										{order.status === 'Not processed' && <strong className="bg-red-100 text-red-700 px-3 py-2 rounded text-xs font-medium cursor-pointer select-none">{order.status}</strong>}
										{order.status === 'Processing' && <strong className="bg-yellow-100 text-yellow-700 px-3 py-2 rounded text-xs font-medium cursor-pointer select-none">{order.status}</strong>}
										{order.status === 'Shipped' && <strong className="bg-blue-100 text-blue-700 px-3 py-2 rounded text-xs font-medium cursor-pointer select-none">{order.status}</strong>}
										{order.status === 'Delivered' && <strong className="bg-green-100 text-green-700 px-3 py-2 rounded text-xs font-medium cursor-pointer select-none">{order.status}</strong>}
										{order.status === 'Cancelled' && <strong className="bg-red-100 text-red-700 px-3 py-2 rounded text-xs font-medium cursor-pointer select-none">{order.status}</strong>}
									</td>
									<td className="p-4 ">{order.address}</td>
									<td className="p-4">{dayjs(order.createdAt).format('DD/MM/YYYY')}</td>
								</tr>
							);
						})
					) : (
						<tr>
							<td> No orders found today</td>
						</tr>
					)}
				</tbody>
			</table>

			<div className="py-4 flex items-center justify-between">
				<div className="text-sm text-gray-600 mt-2">Total {state.totalOrders !== undefined ? state.totalOrders.length : 0} orders found</div>
				<div>
					<span onClick={() => navigate('/admin/dashboard/orders')} className="cursor-pointer select-none text-sm text-black underline underline-offset-2">
						View all
					</span>
				</div>
			</div>
		</div>
	);
};

export default TodayAllOrders;

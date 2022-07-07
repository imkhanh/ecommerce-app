import React, { useEffect, useContext } from 'react';
import DashboardLayout, { DashboardContext } from './DashboardLayout';
import { getSingleOrder } from './FetchData';
import dayjs from 'dayjs';
import { useNavigate } from 'react-router-dom';

const TableHeader = () => {
	return (
		<thead className="border-b border-gray-200">
			<tr>
				<th className="p-4 font-medium text-left text-gray-900 whitespace-nowrap">Products</th>
				<th className="p-4 font-medium text-left text-gray-900 whitespace-nowrap">Status</th>
				<th className="p-4 font-medium text-left text-gray-900 whitespace-nowrap">Total</th>
				<th className="p-4 font-medium text-left text-gray-900 whitespace-nowrap">Phone</th>
				<th className="p-4 font-medium text-left text-gray-900 whitespace-nowrap">Address</th>
				<th className="p-4 font-medium text-left text-gray-900 whitespace-nowrap">Transaction Id</th>
				<th className="p-4 font-medium text-left text-gray-900 whitespace-nowrap">Checkout</th>
				<th className="p-4 font-medium text-left text-gray-900 whitespace-nowrap">Processing</th>
			</tr>
		</thead>
	);
};

const TableBody = ({ order }) => {
	const navigate = useNavigate();
	return (
		<tr>
			{order.allProduct.map((product, i) => {
				return (
					<td className="p-4 flex items-center space-x-3" key={i}>
						<img
							onClick={() => navigate(`/product/detail/${product.id._id}`)}
							className="w-16 h-20 object-cover object-center cursor-pointer border border-black/10"
							src={`http://localhost:3000/uploads/products/${product.id.images[0]}`}
							alt="productImage"
						/>
						<div className="flex flex-col space-y-1">
							<span className="text-sm text-black/50">{product.id.title.length < 20 ? product.id.title : product.id.title.slice(0, 20) + '...'}</span>
							<span className="text-sm text-black/50">x{product.quantity}</span>
						</div>
					</td>
				);
			})}
			<td className="py-4 text-center">
				{order.status === 'Not processed' && <strong className="bg-red-100 text-red-700 px-3 py-2 rounded text-xs font-medium cursor-pointer select-none">{order.status}</strong>}
				{order.status === 'Processing' && <strong className="bg-yellow-100 text-yellow-700 px-3 py-2 rounded text-xs font-medium cursor-pointer select-none">{order.status}</strong>}
				{order.status === 'Shipped' && <strong className="bg-blue-100 text-blue-700 px-3 py-2 rounded text-xs font-medium cursor-pointer select-none">{order.status}</strong>}
				{order.status === 'Delivered' && <strong className="bg-green-100 text-green-700 px-3 py-2 rounded text-xs font-medium cursor-pointer select-none">{order.status}</strong>}
				{order.status === 'Cancelled' && <strong className="bg-red-100 text-red-700 px-3 py-2 rounded text-xs font-medium cursor-pointer select-none">{order.status}</strong>}
			</td>
			<td className="p-4 text-gray-700 whitespace-nowrap">${order.amount}</td>
			<td className="p-4 text-gray-700 whitespace-nowrap">{order.phone}</td>
			<td className="p-4 text-gray-700 whitespace-nowrap">{order.address}</td>
			<td className="p-4 text-gray-700 whitespace-nowrap">{order.transactionId}</td>
			<td className="p-4 text-gray-700 whitespace-nowrap">{dayjs(order.createdAt).format('DD/MM/YYYY')}</td>
			<td className="p-4 text-gray-700 whitespace-nowrap">{dayjs(order.updatedAt).format('DD/MM/YYYY')}</td>
		</tr>
	);
};

const UserOrderComponent = () => {
	const { state, dispatch } = useContext(DashboardContext);
	const { orderByUser: orders } = state;

	useEffect(() => {
		const fetchOrderData = async () => {
			dispatch({ type: 'loading', payload: true });

			try {
				const res = await getSingleOrder();
				dispatch({ type: 'orderByUser', payload: res.order });
				dispatch({ type: 'loading', payload: false });
			} catch (error) {
				console.log(error);
			}
		};

		fetchOrderData();
		// eslint-disable-next-line
	}, []);

	return (
		<div className="px-12 md:px-8 pb-8 ">
			<div className="py-4 border-b border-gray-200">
				<h4 className="text-black font-medium">My Orders</h4>
				<p className="text-sm text-black/40 font-light">Have {orders && orders.length} products</p>
			</div>

			<div className="mt-4 overflow-x-auto">
				<table className="min-w-full text-sm border border-gray-200">
					<TableHeader />
					<tbody className="divide-y divide-gray-200">
						{orders && orders.length > 0 ? (
							orders.map((order, i) => {
								return <TableBody key={i} order={order} />;
							})
						) : (
							<tr>
								<td className="text-sm italic text-black/50 text-center font-light p-4">No order found</td>
							</tr>
						)}
					</tbody>
				</table>
			</div>
		</div>
	);
};

const UserOrder = () => {
	return <DashboardLayout children={<UserOrderComponent />} />;
};

export default UserOrder;

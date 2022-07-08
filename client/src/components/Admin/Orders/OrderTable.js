import React, { useContext, useEffect } from 'react';
import { getAllOrders, deleteOrder } from './FetchData';
import { AdminOrderContext } from './AdminOrders';
import { BsPencil, BsTrash } from 'react-icons/bs';
import dayjs from 'dayjs';
import Loading from '../Layout/Loading';

const OrderTable = () => {
	const { state, dispatch } = useContext(AdminOrderContext);
	const { orders, loading } = state;

	useEffect(() => {
		fetchOrderData();
		// eslint-disable-next-line
	}, []);

	const fetchOrderData = async () => {
		dispatch({ type: 'loading', payload: true });

		try {
			const res = await getAllOrders();
			dispatch({ type: 'orders', payload: res.orders });
			dispatch({ type: 'loading', payload: false });
		} catch (error) {
			console.log(error);
		}
	};

	const handleDeleteOrder = async (id) => {
		try {
			const res = await deleteOrder(id);
			if (res && res.success) {
				fetchOrderData();
			}
		} catch (error) {
			console.log(error);
		}
	};

	const handleUpdateOrder = (id, order) => {
		dispatch({ type: 'updateOrderModalOpen', payload: { id, ...order } });
	};

	if (loading) return <Loading />;

	return (
		<div className="mt-6 p-8 bg-white shadow-lg rounded-md">
			<div>
				<p className="mb-4 px-4 text-sm font-medium text-black/50">{orders && orders.length} orders</p>
			</div>

			<div className="mt-4 overflow-x-auto">
				<table className="min-w-full text-sm border-b border-gray-200">
					<thead className="border-b border-gray-200">
						<tr>
							<th className="p-4 font-medium text-left text-gray-900 whitespace-nowrap">Products</th>
							<th className="p-4 font-medium text-left text-gray-900 whitespace-nowrap">Status</th>
							<th className="p-4 font-medium text-left text-gray-900 whitespace-nowrap">Total</th>
							<th className="p-4 font-medium text-left text-gray-900 whitespace-nowrap">Customer</th>
							<th className="p-4 font-medium text-left text-gray-900 whitespace-nowrap">Phone</th>
							<th className="p-4 font-medium text-left text-gray-900 whitespace-nowrap">Email</th>
							<th className="p-4 font-medium text-left text-gray-900 whitespace-nowrap">Address</th>
							<th className="p-4 font-medium text-left text-gray-900 whitespace-nowrap">Transaction Id</th>
							<th className="p-4 font-medium text-left text-gray-900 whitespace-nowrap">Order At</th>
							<th className="p-4 font-medium text-left text-gray-900 whitespace-nowrap">Updated At</th>
							<th className="p-4 font-medium text-left text-gray-900 whitespace-nowrap">Actions</th>
						</tr>
					</thead>
					<tbody className="divide-y divide-gray-200">
						{orders && orders.length > 0 ? (
							orders.map((order) => {
								return (
									<tr key={order._id}>
										{order.allProduct.map((product, i) => {
											return (
												<td className="p-4 flex items-center space-x-3" key={i}>
													<img className="w-12 h-14 object-cover object-center cursor-pointer border border-black/10" src={`http://localhost:3000/uploads/products/${product.id.images[0]}`} alt="productImage" />
													<div className="flex flex-col space-y-1">
														<span className="text-sm text-black/50">{product.id.title.length < 20 ? product.id.title : product.id.title.slice(0, 20) + '...'}</span>
														<span className="text-sm text-black/50">x{product.quantity}</span>
													</div>
												</td>
											);
										})}
										<td className="py-4 text-center">
											{order.status === 'Not processed' && <strong className="bg-red-100 text-red-700 p-2 rounded text-xs font-medium cursor-pointer select-none">{order.status}</strong>}
											{order.status === 'Processing' && <strong className="bg-yellow-100 text-yellow-700 p-2 rounded text-xs font-medium cursor-pointer select-none">{order.status}</strong>}
											{order.status === 'Shipped' && <strong className="bg-blue-100 text-blue-700 p-2 rounded text-xs font-medium cursor-pointer select-none">{order.status}</strong>}
											{order.status === 'Delivered' && <strong className="bg-green-100 text-green-700 p-2 rounded text-xs font-medium cursor-pointer select-none">{order.status}</strong>}
											{order.status === 'Cancelled' && <strong className="bg-red-100 text-red-700 p-2 rounded text-xs font-medium cursor-pointer select-none">{order.status}</strong>}
										</td>
										<td className="p-4 text-gray-700">${order.amount}</td>
										<td className="p-4 text-gray-700">{order.user.name}</td>
										<td className="p-4 text-gray-700">{order.phone}</td>
										<td className="p-4 text-gray-700">{order.user.email}</td>
										<td className="p-4 text-gray-700">{order.address}</td>
										<td className="p-4 text-gray-700">{order.transactionId}</td>
										<td className="p-4 text-gray-700">{dayjs(order.createdAt).format('DD/MM/YYYY')}</td>
										<td className="p-4 text-gray-700">{dayjs(order.updatedAt).format('DD/MM/YYYY')}</td>
										<td className="pl-4 flex space-x-2">
											<strong onClick={() => handleUpdateOrder(order._id, order)} className="bg-amber-300 text-black px-3 py-2 rounded text-xs font-medium cursor-pointer select-none">
												<BsPencil />
											</strong>
											<strong onClick={() => handleDeleteOrder(order._id)} className="bg-red-500 text-white px-3 py-2 rounded text-xs font-medium cursor-pointer select-none">
												<BsTrash />
											</strong>
										</td>
									</tr>
								);
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

export default OrderTable;

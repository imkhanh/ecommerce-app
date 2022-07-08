import React, { useContext, useEffect, useState } from 'react';
import { AdminOrderContext } from './AdminOrders';
import { getAllOrders, patchUpdateOrder } from './FetchData';

const UpdateOrder = () => {
	const { state, dispatch } = useContext(AdminOrderContext);
	const [form, setForm] = useState({ id: '', status: '' });

	useEffect(() => {
		setForm({ ...form, id: state.updateOrderModal.id, status: state.updateOrderModal.status });

		// eslint-disable-next-line
	}, [state.updateOrderModal]);

	const fetchData = async () => {
		try {
			const res = await getAllOrders();
			dispatch({ type: 'orders', payload: res.orders });
		} catch (error) {
			console.log(error);
		}
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		let formData = { id: form.id, status: form.status };
		try {
			const res = await patchUpdateOrder(formData.id.id, formData);
			if (res && res.success) {
				dispatch({ type: 'updateOrderModalClose' });
				fetchData();
			}
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<div>
			<div onClick={() => dispatch({ type: 'updateOrderModalClose', payload: false })} className={`${state.updateOrderModal.modal ? '' : 'hidden'} fixed inset-0 bg-black opacity-50 z-20`}></div>
			<div className={`${state.updateOrderModal.modal ? '' : 'hidden'} fixed top-10 left-1/2 max-w-lg w-full h-auto bg-white rounded-[3px] shadow-lg transform -translate-x-1/2 z-30`}>
				<div className="py-6 flex items-center justify-center">
					<h1 className="text-black font-bold uppercase">Update Order</h1>
				</div>
				<form onSubmit={handleSubmit} className="p-8 space-y-4">
					<div className="flex flex-col space-y-1 w-full">
						<label className="block text-sm font-medium">Order Status</label>
						<select value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })} className="px-4 h-10 w-full text-sm border border-gray-300 rounded-[3px] outline-none" id="status">
							<option name="status" value="Not processed">
								Not processed
							</option>
							<option name="status" value="Processing">
								Processing
							</option>
							<option name="status" value="Shipped">
								Shipped
							</option>
							<option name="status" value="Delivered">
								Delivered
							</option>
							<option name="status" value="Cancelled">
								Cancelled
							</option>
						</select>
					</div>
					<button type="submit" className="text-sm h-10 w-full rounded-[3px] bg-black text-white">
						Update
					</button>
				</form>
			</div>
		</div>
	);
};

export default UpdateOrder;

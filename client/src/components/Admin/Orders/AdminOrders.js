import React, { createContext, useReducer } from 'react';
import AdminLayout from '../Layout/AdminLayout';
import { adminOrderReducer, adminOrderState } from './AdminOrderContext';
import OrderHeader from './OrderHeader';
import OrderTable from './OrderTable';

export const AdminOrderContext = createContext();

const AdminOrderComponent = () => {
	return (
		<div className="p-8">
			<OrderHeader />
			<OrderTable />
		</div>
	);
};

const AdminOrders = () => {
	const [state, dispatch] = useReducer(adminOrderReducer, adminOrderState);

	return (
		<AdminOrderContext.Provider value={{ state, dispatch }}>
			<AdminLayout children={<AdminOrderComponent />} />
		</AdminOrderContext.Provider>
	);
};

export default AdminOrders;

import React, { createContext, useReducer } from 'react';
import { adminProductReducer, adminProductState } from './AdminProductContext';
import AdminLayout from '../Layout/AdminLayout';
import ProductHeader from './ProductHeader';
import ProductTable from './ProductTable';

export const AdminProductContext = createContext();

const AdminProductComponent = () => {
	return (
		<section className="p-8">
			<div className="mb-4">
				<h4 className="text-black font-bold">Dashboard Product</h4>
			</div>
			<ProductHeader />
			<ProductTable />
		</section>
	);
};

const AdminDashboard = () => {
	const [state, dispatch] = useReducer(adminProductReducer, adminProductState);

	return (
		<AdminProductContext.Provider value={{ state, dispatch }}>
			<AdminLayout children={<AdminProductComponent />} />
		</AdminProductContext.Provider>
	);
};

export default AdminDashboard;

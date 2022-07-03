import React, { createContext, useReducer } from 'react';
import { adminProductReducer, adminProductState } from './AdminProductContext';
import AdminLayout from '../Layout/AdminLayout';
import ProductHeader from './ProductHeader';
import ProductTable from './ProductTable';

export const AdminProductContext = createContext();

const AdminProductComponent = () => {
	return (
		<section className="p-8">
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

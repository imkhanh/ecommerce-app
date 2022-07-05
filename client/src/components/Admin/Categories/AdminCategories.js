import React, { createContext, useReducer } from 'react';
import { adminCategoryReducer, adminCategoryState } from './AdminCategoryContext';
import AdminLayout from '../Layout/AdminLayout';
import CategoryHeader from './CategoryHeader';
import CategoryTable from './CategoryTable';

export const AdminCategoryContext = createContext();

const AdminCategoryComponent = () => {
	return (
		<section className="p-8">
			<CategoryHeader />
			<CategoryTable />
		</section>
	);
};

const AdminCategories = () => {
	const [state, dispatch] = useReducer(adminCategoryReducer, adminCategoryState);
	return (
		<AdminCategoryContext.Provider value={{ state, dispatch }}>
			<AdminLayout children={<AdminCategoryComponent />} />
		</AdminCategoryContext.Provider>
	);
};

export default AdminCategories;

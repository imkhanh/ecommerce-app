import React, { createContext, useReducer } from 'react';
import AdminLayout from '../Layout/AdminLayout';
import { adminCategoryReducer, adminCategoryState } from './AdminCategoryContext';

export const AdminCategoryContext = createContext();

const AdminCategoryComponent = () => {
	return <div>AdminCategoryComponent</div>;
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

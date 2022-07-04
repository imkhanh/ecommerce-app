import React, { createContext, useReducer } from 'react';
import AdminLayout from '../Layout/AdminLayout';
import { adminUserReducer, adminUserState } from './AdminUserContext';
import UserTable from './UserTable';

export const AdminUserContext = createContext();

const AdminUserComponent = () => {
	return (
		<section className="p-8">
			<div className="mb-4">
				<h4 className="text-black font-bold">Dashboard Category</h4>
			</div>
			<UserTable />
		</section>
	);
};

const AdminUsers = () => {
	const [state, dispatch] = useReducer(adminUserReducer, adminUserState);
	return (
		<AdminUserContext.Provider value={{ state, dispatch }}>
			<AdminLayout children={<AdminUserComponent />} />
		</AdminUserContext.Provider>
	);
};

export default AdminUsers;

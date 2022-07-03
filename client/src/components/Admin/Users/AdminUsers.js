import React, { createContext, useReducer } from 'react';
import AdminLayout from '../Layout/AdminLayout';
import { adminUserReducer, adminUserState } from './AdminUserContext';

export const AdminUserContext = createContext();

const AdminUserComponent = () => {
	return <div>AdminUserComponent</div>;
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

import React, { createContext, useReducer } from 'react';
import AdminLayout from '../Layout/AdminLayout';
import { adminDashboardReducer, adminDashboardState } from './AdminDashboardContext';

export const AdminDashboardContext = createContext();

const AdminDashboardComponent = () => {
	return <div className="h-[2000px]">AdminDashboardComponent</div>;
};

const AdminDashboard = () => {
	const [state, dispatch] = useReducer(adminDashboardReducer, adminDashboardState);

	return (
		<AdminDashboardContext.Provider value={{ state, dispatch }}>
			<AdminLayout children={<AdminDashboardComponent />} />
		</AdminDashboardContext.Provider>
	);
};

export default AdminDashboard;

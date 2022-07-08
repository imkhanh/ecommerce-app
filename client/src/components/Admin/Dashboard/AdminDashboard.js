import React, { createContext, useReducer } from 'react';
import { adminDashboardReducer, adminDashboardState } from './AdminDashboardContext';
import AdminLayout from '../Layout/AdminLayout';
import DashboardCard from './DashboardCard';
import UploadContainer from './UploadContainer';
import TodayAllOrders from './TodayAllOrders';

export const AdminDashboardContext = createContext();

const AdminDashboardComponent = () => {
	return (
		<section className="p-8">
			<DashboardCard />
			<UploadContainer />
			<TodayAllOrders />
		</section>
	);
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

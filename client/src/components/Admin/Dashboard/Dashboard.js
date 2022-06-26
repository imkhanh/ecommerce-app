import React, { createContext, useReducer } from 'react';
import Layout from '../Layout/Layout';
import { dashboardReducer, dashboardState } from './DashboardContext';

export const DashboardContext = createContext();

const DashboardComponent = () => {
	return <section className="p-8">DashboardComponent</section>;
};

const Dashboard = () => {
	const [data, dispatch] = useReducer(dashboardReducer, dashboardState);
	return (
		<DashboardContext.Provider value={{ data, dispatch }}>
			<Layout children={<DashboardComponent />} />
		</DashboardContext.Provider>
	);
};

export default Dashboard;

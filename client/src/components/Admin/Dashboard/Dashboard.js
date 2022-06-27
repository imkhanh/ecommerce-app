import React, { createContext, useReducer } from 'react';
import { dashboardReducer, dashboardState } from './DashboardContext';
import Layout from '../Layout/Layout';
import DashboadCard from './DashboadCard';
import DashboardSlides from './DashboardSlides';

export const DashboardContext = createContext();

const DashboardComponent = () => {
	return (
		<section className="p-8">
			<DashboadCard />
			<DashboardSlides />
		</section>
	);
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

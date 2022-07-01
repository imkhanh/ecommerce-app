import React, { createContext, useEffect, useReducer } from 'react';
import { dashboardReducer, dashboardState } from './DashboardContext';
import Header from '../Layout/Header';
import Footer from '../Layout/Footer';
import CartProduct from '../Layout/CartProduct';
import Sidebar from './Sidebar';
import { getSingleUser } from './FetchData';

export const DashboardContext = createContext();

const DashboardLayout = ({ children }) => {
	const [state, dispatch] = useReducer(dashboardReducer, dashboardState);
	const userId = JSON.parse(localStorage.getItem('jwt')).user._id;

	useEffect(() => {
		const fetchData = async () => {
			try {
				const res = await getSingleUser(userId);
				if (res && res.user) {
					dispatch({ type: 'singleUser', payload: res.user });
				}
			} catch (error) {
				console.log(error);
			}
		};

		fetchData();
		// eslint-disable-next-line
	}, []);

	return (
		<DashboardContext.Provider value={{ state, dispatch }}>
			<Header />
			<CartProduct />
			<div className="max-w-[80rem] mx-auto py-12 px-8 md:px-4" style={{ minHeight: 'calc(100vh)' }}>
				<div className="flex md:flex-col items-start space-x-6 md:space-x-0 md:space-y-6">
					<Sidebar />
					<div className="w-4/5 lg:w-2/3 md:w-full border-t-2 border-green-700 shadow-lg rounded-bl-md rounded-br-md">{children}</div>
				</div>
			</div>
			<Footer />
		</DashboardContext.Provider>
	);
};

export default DashboardLayout;

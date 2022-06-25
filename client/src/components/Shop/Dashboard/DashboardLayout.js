import React, { createContext, useEffect, useReducer } from 'react';
import CartProduct from '../Layout/CartProduct';
import Footer from '../Layout/Footer';
import Header from '../Layout/Header';
import Sidebar from './Sidebar';
import { dashboardReducer, dashboardState } from './DashboardContext';
import { getSingleUser } from './FetchData';

export const DashboardLayoutContext = createContext();

const DashboardLayout = ({ children }) => {
	const uId = JSON.parse(localStorage.getItem('jwt')).user._id;
	const [data, dispatch] = useReducer(dashboardReducer, dashboardState);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const res = await getSingleUser(uId);
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
		<DashboardLayoutContext.Provider value={{ data, dispatch }}>
			<>
				<Header />
				<CartProduct />
				<div className="max-w-[70rem] mx-auto w-full py-12 px-8 md:px-4 grid grid-cols-12 gap-8" style={{ minHeight: 'calc(100vh - 128px)' }}>
					<Sidebar />
					<div className="col-span-9 lg:col-span-12 border-t-2 border-green-500 ">{children}</div>
				</div>

				<Footer />
			</>
		</DashboardLayoutContext.Provider>
	);
};

export default DashboardLayout;

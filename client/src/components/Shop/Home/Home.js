import React, { createContext, useReducer } from 'react';
import { homeReducer, homeState } from './HomeContext';
import Layout from '../Layout/Layout';

export const HomeContext = createContext();

const HomeComponent = () => {
	return <div className="h-[2000px]">HomeComponent</div>;
};

const Home = () => {
	const [data, dispatch] = useReducer(homeReducer, homeState);

	return (
		<HomeContext.Provider value={{ data, dispatch }}>
			<Layout children={<HomeComponent />} />
		</HomeContext.Provider>
	);
};

export default Home;

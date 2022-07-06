import React, { createContext, useReducer } from 'react';
import { homeReducer, homeState } from './HomeContext';
import Layout from '../Layout/Layout';
import Featured from './Featured';
import Slides from './Slides';
import Slogan from './Slogan';

export const HomeContext = createContext();

const HomeComponent = () => {
	return (
		<div className="p-8 md:p-4">
			<Slides />
			<Slogan title="Never done summering" subTitle="Play. Let loose. Repeat. This sesson, turn it up in styles made for living life to the max." />
			<Featured />
			<Slogan title="Stay grounded" subTitle="Take on the terrain in the Shop, featuring comfort, support and traction you can trust - from road to trail and black" />
		</div>
	);
};

const Home = () => {
	const [state, dispatch] = useReducer(homeReducer, homeState);

	return (
		<HomeContext.Provider value={{ state, dispatch }}>
			<Layout children={<HomeComponent />} />
		</HomeContext.Provider>
	);
};

export default Home;

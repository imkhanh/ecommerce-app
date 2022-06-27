import React, { createContext, useReducer } from 'react';
import { homeReducer, homeState } from './HomeContext';
import Layout from '../Layout/Layout';
import Slides from './Slides';
import Featured from './Featured';
import Slogan from './Slogan';
import LatestProducts from './LatestProducts';

export const HomeContext = createContext();

const HomeComponent = () => {
	return (
		<section className="px-8 md:px-4">
			<Slides />
			<Slogan title="ALL Day, All New, All You" subTitle="The new product was made to move with you. All, Day, Long" />
			<Featured />
			<Slogan title="More Hate, More Tour" subTitle="One Pass and One Shot. It makes me feel gorgeous" />
			<LatestProducts />
		</section>
	);
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

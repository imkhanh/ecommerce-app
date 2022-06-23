import React, { useReducer } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { layoutReducer, layoutState } from './components/Shop/Layout/LayoutContext';
import { LayoutContext } from './components/Shop/Layout/Layout';

//shop
import Home from './components/Shop/Home/Home';
import Products from './components/Shop/Products/Products';
import SingleProduct from './components/Shop/SingleProduct/SingleProduct';

const App = () => {
	const [data, dispatch] = useReducer(layoutReducer, layoutState);

	return (
		<LayoutContext.Provider value={{ data, dispatch }}>
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/products" element={<Products />} />
					<Route path="/product/detail/:id" element={<SingleProduct />} />
				</Routes>
			</BrowserRouter>
		</LayoutContext.Provider>
	);
};

export default App;

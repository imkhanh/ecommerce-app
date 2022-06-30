import React, { useReducer } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
//
import { LayoutContext } from './components/Shop/Layout/Layout';
import { layoutState, layoutReducer } from './components/Shop/Layout/LayoutContext';

//Shop
import Home from './components/Shop/Home/Home';
import Products from './components/Shop/Products/Products';
import SingleProduct from './components/Shop/SingleProduct/SingleProduct';

const App = () => {
	const [state, dispatch] = useReducer(layoutReducer, layoutState);

	return (
		<LayoutContext.Provider value={{ state, dispatch }}>
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

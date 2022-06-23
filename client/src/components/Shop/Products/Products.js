import React, { createContext, useReducer } from 'react';
import Layout from '../Layout/Layout';
import { productReducer, productState } from './ProductContext';
import ProductList from './ProductList';
import ProductMenu from './ProductMenu';

export const ProductContext = createContext();

const ProductComponent = () => {
	return (
		<section className="px-8 md:px-4 py-12 md:py-8 max-w-[70rem] mx-auto w-full">
			<ProductMenu />
			<ProductList />
		</section>
	);
};

const Products = () => {
	const [data, dispatch] = useReducer(productReducer, productState);

	return (
		<ProductContext.Provider value={{ data, dispatch }}>
			<Layout children={<ProductComponent />} />
		</ProductContext.Provider>
	);
};

export default Products;

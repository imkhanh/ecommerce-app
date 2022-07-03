import React, { createContext, useReducer } from 'react';
import { productReducer, productState } from './ProductContext';
import Layout from '../Layout/Layout';
import ProductMenu from './ProductMenu';
import ProductList from './ProductList';

export const ProductContext = createContext();

const ProductComponent = () => {
	return (
		<section className="pt-12 pb-32 px-8 md:px-4 max-w-[80rem] mx-auto">
			<ProductMenu />
			<ProductList />
		</section>
	);
};

const Products = () => {
	const [state, dispatch] = useReducer(productReducer, productState);

	return (
		<ProductContext.Provider value={{ state, dispatch }}>
			<Layout children={<ProductComponent />} />
		</ProductContext.Provider>
	);
};

export default Products;

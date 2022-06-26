import React, { createContext, useReducer } from 'react';
import { productReducer, productState } from './ProductContext';
import Layout from '../Layout/Layout';
import ProductMenu from './ProductMenu';
import ProductTable from './ProductTable';

export const ProductContext = createContext();

const ProductComponent = () => {
	return (
		<section className="p-8">
			<ProductMenu />
			<ProductTable />
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

import React, { createContext, useReducer } from 'react';
import { productReducer, productState } from './ProductContext';
import Layout from '../Layout/Layout';
import ProductMenu from './ProductMenu';
import ProductList from './ProductList';

export const ProductContext = createContext();

const Products = () => {
	const [state, dispatch] = useReducer(productReducer, productState);

	return (
		<ProductContext.Provider value={{ state, dispatch }}>
			<Layout>
				<section className="py-12 px-8 md:px-4 max-w-[70rem] mx-auto">
					<ProductMenu />
					<ProductList />
				</section>
			</Layout>
		</ProductContext.Provider>
	);
};

export default Products;

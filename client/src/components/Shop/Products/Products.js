import React, { createContext, useReducer } from 'react';
import { productReducer, productState } from './ProductContext';
import Layout from '../Layout/Layout';
import ProductComponent from './ProductComponent';

export const ProductContext = createContext();

const Products = () => {
	const [state, dispatch] = useReducer(productReducer, productState);

	return (
		<ProductContext.Provider value={{ state, dispatch }}>
			<Layout children={<ProductComponent />} />
		</ProductContext.Provider>
	);
};

export default Products;

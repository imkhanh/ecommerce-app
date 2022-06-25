import React, { createContext, useReducer } from 'react';
import { productReducer, productState } from './ProductContext';
import Layout from '../Layout/Layout';

export const ProductContext = createContext();

const ProductComponent = () => {
	return <div className="p-8">ProductComponent</div>;
};

const Products = () => {
	const [data, dispatch] = useReducer(productReducer, productState);

	return (
		<ProductContext.Provider value={{ data, dispatch }}>
			<Layout children={<ProductComponent />} />;
		</ProductContext.Provider>
	);
};

export default Products;

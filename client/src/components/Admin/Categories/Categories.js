import React, { createContext, useReducer } from 'react';
import Layout from '../Layout/Layout';
import { categoryReducer, categoryState } from './CategoryContext';
import CategoryTable from './CategoryTable';
import CategoryMenu from './CategoryMenu';

export const CategoryContext = createContext();

const CategoryComponent = () => {
	return (
		<section className="p-8">
			<CategoryMenu />
			<CategoryTable />
		</section>
	);
};

const Categories = () => {
	const [data, dispatch] = useReducer(categoryReducer, categoryState);

	return (
		<CategoryContext.Provider value={{ data, dispatch }}>
			<Layout children={<CategoryComponent />} />
		</CategoryContext.Provider>
	);
};

export default Categories;

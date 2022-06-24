import React, { useContext, useEffect } from 'react';
import ProductItem from './ProductItem';
import { ProductContext } from './Products';
import { getAllProduct } from './FetchData';
import Loading from '../Layout/Loading';

const ProductList = () => {
	const { data, dispatch } = useContext(ProductContext);
	const { products, loading } = data;

	useEffect(() => {
		fetchData();

		// eslint-disable-next-line
	}, []);

	const fetchData = async () => {
		dispatch({ type: 'loading', payload: true });

		try {
			const res = await getAllProduct();
			setTimeout(() => {
				if (res && res.products) {
					dispatch({ type: 'products', payload: res.products });
					dispatch({ type: 'loading', payload: false });
				}
			}, 1000);
		} catch (error) {
			console.log(error);
		}
	};

	if (loading) return <Loading />;

	return (
		<div className="grid grid-cols-4 lg:grid-cols-3 md:grid-cols-2 gap-x-3 gap-y-12">
			{products && products.length > 0 ? (
				products.map((product) => {
					return <ProductItem key={product._id} product={product} />;
				})
			) : (
				<div className="text-sm font-light italic text-black/50">No product found</div>
			)}
		</div>
	);
};

export default ProductList;

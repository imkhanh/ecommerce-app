import React, { useState, useContext, useEffect } from 'react';
import { ProductContext } from './Products';
import { getAllProduct } from './FetchData';
import ProductMenu from './ProductMenu';
import ProductItem from './ProductItem';
import Loading from '../Layout/Loading';
import LoadMoreButton from './LoadMoreButton';

const ProductComponent = () => {
	const { state, dispatch } = useContext(ProductContext);
	const { products, loading } = state;
	const [page, setPage] = useState(1);
	const [search, setSearch] = useState('');
	const [category, setCategory] = useState('');
	const [sort, setSort] = useState('');

	useEffect(() => {
		const fetchData = async () => {
			dispatch({ type: 'loading', payload: true });
			try {
				const res = await getAllProduct(page, category, sort, search);
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

		fetchData();
		// eslint-disable-next-line
	}, [page, category, sort, search]);

	if (loading) return <Loading />;

	return (
		<section className="py-12 px-8 md:px-4">
			<ProductMenu category={category} setCategory={setCategory} sort={sort} setSort={setSort} search={search} setSearch={setSearch} />

			<div className="grid grid-cols-4 lg:grid-cols-3 md:grid-cols-2 gap-x-4 gap-y-16 transition-all duration-200 ease-in-out">
				{products && products.length > 0 ? (
					products.map((product) => {
						return <ProductItem key={product._id} product={product} />;
					})
				) : (
					<div>No product found</div>
				)}
			</div>

			<LoadMoreButton products={products} page={page} setPage={setPage} />
		</section>
	);
};

export default ProductComponent;

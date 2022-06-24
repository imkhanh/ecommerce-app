import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getProductByCategory } from './FetchData';
import { BsChevronRight } from 'react-icons/bs';
import Layout from '../Layout/Layout';
import Loading from '../Layout/Loading';
import ProductItem from './ProductItem';

const ProductByCategoryComponent = () => {
	const { cateId } = useParams();
	const [products, setProducts] = useState([]);
	const [loading, setLoading] = useState(false);

	const category = products && products.length > 0 ? products[0].category.name : '';

	useEffect(() => {
		fetchData();

		// eslint-disable-next-line
	}, []);

	const fetchData = async () => {
		setLoading(true);
		try {
			const res = await getProductByCategory(cateId);
			setProducts(res.products);
			setLoading(false);
		} catch (error) {
			console.log(error);
		}
	};

	if (loading) return <Loading />;

	return (
		<section className="px-8 md:px-4 py-12 md:py-8 max-w-[70rem] mx-auto w-full">
			<div className="mb-8 h-20 md:mb-4 flex items-center space-x-2 text-sm md:text-xs">
				<Link to="/" className="text-black/50 font-light">
					Home
				</Link>
				<span className="text-black/50">
					<BsChevronRight />
				</span>
				<Link to="/products" className="text-black/50 font-light">
					Products
				</Link>
				<span className="text-black/50">
					<BsChevronRight />
				</span>
				<p className="text-black">{category}</p>
			</div>

			<div className="grid grid-cols-4 lg:grid-cols-3 md:grid-cols-2 gap-x-3 gap-y-12">
				{products && products.length > 0 ? (
					products.map((product) => {
						return <ProductItem key={product._id} product={product} />;
					})
				) : (
					<div className="text-sm font-light italic text-black/50">No product found</div>
				)}
			</div>
		</section>
	);
};

const ProductByCategory = () => {
	return <Layout children={<ProductByCategoryComponent />} />;
};

export default ProductByCategory;

import React, { useEffect, useContext } from 'react';
import { HomeContext } from './Home';
import { getLatestProduct } from './FetchData';
import { Link } from 'react-router-dom';

const LatestProducts = () => {
	const { data, dispatch } = useContext(HomeContext);
	const { latestProducts: products } = data;

	useEffect(() => {
		fetchData();
		// eslint-disable-next-line
	}, []);

	const fetchData = async () => {
		try {
			const res = await getLatestProduct();
			if (res && res.products) {
				dispatch({ type: 'latestProducts', payload: res.products });
			}
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<div className="mt-16">
			<h4 className="text-3xl md:text-2xl">Latest Products</h4>
			<div className="mt-8 grid grid-cols-4 lg:grid-cols-3 md:grid-cols-2 gap-x-3 gap-y-12">
				{products &&
					products.length > 0 &&
					products.map((product) => {
						return (
							<Link to={`/product/detail/${product._id}`} key={product._id}>
								<figure>
									<img src={`http://localhost:3000/uploads/products/${product.images[0]}`} alt={product.name} className="w-full h-[500px] md:h-[300px] object-cover" />
								</figure>
								<div className="pt-4">
									<h4 className="text-lg lg:text-base font-semibold text-black">{product.name}</h4>
									<p className="mt-2 text-black/60">{product.category.name}</p>
									<p className="text-black/60">${product.price}</p>
								</div>
							</Link>
						);
					})}
			</div>
		</div>
	);
};

export default LatestProducts;

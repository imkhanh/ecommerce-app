import React, { useState, useContext, useEffect } from 'react';
import { isWish, addWishListProduct, removeWishListProduct } from './Minxins';
import { BsHeart, BsHeartFill } from 'react-icons/bs';
import { ProductContext } from './Products';
import { getAllProduct } from './FetchData';
import { Link } from 'react-router-dom';
import Loading from '../Layout/Loading';
import { isAuth } from '../Auth/Authentication';
import { LayoutContext } from '../Layout/Layout';

const ProductList = () => {
	const { state, dispatch } = useContext(ProductContext);
	const { dispatch: layoutDispatch } = useContext(LayoutContext);
	const { products, loading } = state;
	const [wishList, setWishList] = useState(JSON.parse(localStorage.getItem('wish')));

	useEffect(() => {
		fetchData();

		// eslint-disable-next-line
	}, []);

	const fetchData = async () => {
		dispatch({ type: 'loading', payload: true });
		try {
			const res = await getAllProduct();
			if (res && res.products) {
				dispatch({ type: 'products', payload: res.products });
				dispatch({ type: 'loading', payload: false });
			}
		} catch (error) {
			console.log(error);
		}
	};

	if (loading) return <Loading />;

	return (
		<div className="mt-8 grid grid-cols-4 lg:grid-cols-3 md:grid-cols-2 gap-x-4 gap-y-16 transition-all duration-200 ease-in-out">
			{products && products.length > 0 ? (
				products.map((product) => {
					return (
						<div key={product._id} className="relative bg-white">
							<div className="absolute top-3 right-3 z-[5]">
								{isAuth() ? (
									<>
										<span onClick={() => addWishListProduct(product._id, setWishList)} className={`${isWish(product._id, wishList) && 'hidden'} text-black w-8 h-8 bg-white rounded-full grid place-items-center cursor-pointer select-none`}>
											<BsHeart />
										</span>
										<span onClick={() => removeWishListProduct(product._id, setWishList)} className={`${!isWish(product._id, wishList) && 'hidden'} text-white w-8 h-8 bg-red-500 rounded-full grid place-items-center cursor-pointer select-none`}>
											<BsHeartFill />
										</span>
									</>
								) : (
									<span onClick={() => layoutDispatch({ type: 'authModal', payload: true })} className="text-black w-8 h-8 bg-white rounded-full grid place-items-center cursor-pointer select-none">
										<BsHeart />
									</span>
								)}
							</div>
							<figure>
								<Link to={`/product/detail/${product._id}`}>
									<img src={`http://localhost:3000/uploads/products/${product.images[0]}`} alt={product.name} className="w-full h-full object-cover" />
								</Link>
							</figure>
							<div className="pt-4">
								<Link to={`/product/detail/${product._id}`} className="text-black font-medium">
									{product.title.length < 35 ? product.title : product.title.slice(0, 35) + '...'}
								</Link>
								<div className="text-black/50 font-light">{product.category.title}</div>
								{product.discount ? (
									<div className="pt-3 flex flex-col">
										<p className="text-black font-light space-x-3">
											<span className="text-black font-medium">{product.price_discount}$</span>
											<span className="text-black/30 line-through">{product.price}$</span>
										</p>
										<p className="mt-1 font-medium text-green-700">{product.discount}% off</p>
									</div>
								) : (
									<div className="pt-3 text-black font-medium">{product.price}$</div>
								)}
							</div>
						</div>
					);
				})
			) : (
				<div>No product found</div>
			)}
		</div>
	);
};

export default ProductList;

import React, { useState, useContext, useEffect } from 'react';
import { ProductContext } from './Products';
import { getAllProduct } from './FetchData';
import { BsHeart, BsHeartFill } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import { isWish, addWishListProduct, removeWishListProduct } from './Minxins';

const ProductList = () => {
	const { state, dispatch } = useContext(ProductContext);
	const { products, loading } = state;

	const [wishList, setWishList] = useState(JSON.parse(localStorage.getItem('wish')));

	useEffect(() => {
		getAllProduct(dispatch);
		// eslint-disable-next-line
	}, []);

	if (loading) return <div>Loading</div>;

	return (
		<div className="mt-8 grid grid-cols-4 gap-x-4 gap-y-16">
			{products && products.length > 0 ? (
				products.map((product) => {
					return (
						<div key={product._id} className="relative bg-white">
							<div className="absolute top-2 right-2 z-[5]">
								<span onClick={() => addWishListProduct(product._id, setWishList)} className={`${isWish(product._id, wishList) && 'hidden'} text-black cursor-pointer select-none`}>
									<BsHeart />
								</span>
								<span onClick={() => removeWishListProduct(product._id, setWishList)} className={`${!isWish(product._id, wishList) && 'hidden'} text-red-500 cursor-pointer select-none`}>
									<BsHeartFill />
								</span>
							</div>
							<figure>
								<Link to={`/product/detail/${product._id}`}>
									<img src={`http://localhost:3000/uploads/products/${product.images[0]}`} alt={product.name} className="w-full h-[300px] object-cover" />
								</Link>
							</figure>
							<div className="mt-4 text-xs text-center font-light text-[#888]">
								<div className="mb-2 flex items-center justify-center space-x-1">
									{product.colors &&
										product.colors.map((item, index) => {
											return <span key={index} className="w-3 h-3 cursor-pointer border border-gray-200" style={{ background: `${item}` }}></span>;
										})}
								</div>
								<Link to={`/product/detail/${product._id}`} className="text-black">
									{product.title}
								</Link>
								<p className="mt-2 text-[#888]">{product.category.title}</p>
								<p className="mt-1 text-black text-sm font-medium">$ {product.price}</p>
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

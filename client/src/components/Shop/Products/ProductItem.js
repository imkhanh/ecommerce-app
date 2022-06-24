import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { BsHeart, BsHeartFill } from 'react-icons/bs';
import { isWish, addWishList, removeWishList } from './Mixins';
import { isAuth } from '../Auth/Auth';
import { LayoutContext } from '../Layout/Layout';

const ProductItem = ({ product }) => {
	const { dispatch } = useContext(LayoutContext);
	const [wList, setWList] = useState(JSON.parse(localStorage.getItem('wish')));

	return (
		<div className="bg-white relative">
			<div className="absolute top-2 right-3">
				<>
					{isAuth() ? (
						<>
							<span onClick={() => addWishList(product._id, setWList)} className={`${isWish(product._id, wList) && 'hidden'} w-8 h-8 rounded-full grid place-items-center bg-white text-black cursor-pointer`}>
								<BsHeart />
							</span>
							<span onClick={() => removeWishList(product._id, setWList)} className={`${!isWish(product._id, wList) && 'hidden'} w-8 h-8 rounded-full grid place-items-center bg-red-500 text-white cursor-pointer`}>
								<BsHeartFill />
							</span>
						</>
					) : (
						<span onClick={() => dispatch({ type: 'loginRegisterModal', payload: true })} className="w-8 h-8 rounded-full grid place-items-center bg-white text-black cursor-pointer">
							<BsHeart />
						</span>
					)}
				</>
			</div>
			<figure>
				<Link to={`/product/detail/${product._id}`}>
					<img src={`http://localhost:3000/uploads/products/${product.images[0]}`} alt={product.name} className="w-full h-[340px] md:h-full object-cover" />
				</Link>
			</figure>
			<div className="pt-4">
				<Link to={`/product/detail/${product._id}`} className="text-black">
					{product.name}
				</Link>
				<p className="mt-2 text-black/50">{product.category.name}</p>
				<p className="text-black">$ {product.price}</p>
			</div>
		</div>
	);
};

export default ProductItem;

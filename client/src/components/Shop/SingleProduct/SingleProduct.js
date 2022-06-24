import React, { useContext, useEffect, useState } from 'react';
import Layout, { LayoutContext } from '../Layout/Layout';
import { Link, useParams } from 'react-router-dom';
import { getSingleProduct, postAddToCart } from './FetchData';
import ImageContainer from './ImageContainer';
import { BsChevronRight, BsHeart, BsHeartFill, BsShare, BsX } from 'react-icons/bs';
import { isWish, addWishList, removeWishList } from '../Products/Mixins';
import { cartList, updateQuantity, addToCart } from './Mixins';
import Loading from '../Layout/Loading';
import RatingReviews from './RatingReviews';
import { isAuth } from '../Auth/Auth';

const SingleProductComponent = () => {
	const { id } = useParams();
	const { data, dispatch } = useContext(LayoutContext);
	const product = data.singleProduct;

	const [quantity, setQuantity] = useState(1);
	const [alert, setAlert] = useState(false);
	const [wList, setWList] = useState(JSON.parse(localStorage.getItem('wish')));

	useEffect(() => {
		fetchData();
		// eslint-disable-next-line
	}, []);

	const fetchData = async () => {
		dispatch({ type: 'loading', payload: true });
		try {
			const res = await getSingleProduct(id);
			if (res && res.product) {
				dispatch({ type: 'singleProduct', payload: res.product });
				dispatch({ type: 'loading', payload: false });
				dispatch({ type: 'inCart', payload: cartList() });
			}
		} catch (error) {
			console.log(error);
		}

		fetchCartData();
	};

	const fetchCartData = async () => {
		try {
			const res = await postAddToCart();
			if (res && res.products) {
				dispatch({ type: 'cartProduct', payload: res.products });
			}
		} catch (error) {
			console.log(error);
		}
	};

	if (data.loading) {
		return (
			<div>
				<Loading />
			</div>
		);
	} else if (!product) {
		return <div>No product found</div>;
	}

	return (
		<section className="px-8 md:px-4 py-12 md:py-8 max-w-[70rem] mx-auto w-full">
			<div className="mb-8 md:mb-4 flex items-center space-x-2 text-sm md:text-xs">
				<Link to="/" className="text-black/50 font-light">
					Home
				</Link>
				<span className="text-black/50">
					<BsChevronRight />
				</span>
				<p className="text-black">{product.name}</p>
			</div>

			{/* Product detail */}
			<div className="grid grid-cols-12 md:gap-y-6">
				{/* Left content */}
				<ImageContainer product={product} />

				{/* Right content */}
				<div className="col-span-6 md:col-span-12 pl-24 lg:pl-12 md:pl-0 sticky top-0">
					<div className="pb-6 flex items-center justify-between border-b border-gray-200">
						<div>
							<h1 className="text-2xl uppercase font-medium text-black">{product.name}</h1>
							<p className="mt-2 text-black/50">{product.category.name}</p>
							<p className="mt-1">${product.price}</p>
						</div>
						<span className="text-gray-500 cursor-pointer">
							<BsShare className="text-xl" />
						</span>
					</div>

					<div className="my-6">
						<span className="text-xs font-medium">Description</span>
						<p className="mt-3 text-sm font-light text-justify text-black/80">{product.description}</p>
					</div>

					<div>
						<span className="text-xs font-medium">Quantity</span>
						<div className="mt-3 flex items-center">
							<span
								onClick={() => updateQuantity('decrease', product.quantity, quantity, setQuantity, setAlert)}
								className="w-6 h-6 rounded-full border border-black/50 hover:bg-black hover:text-white cursor-pointer select-none flex items-center justify-center"
							>
								-
							</span>
							<span className="w-10 text-center text-sm">{quantity}</span>
							<span
								onClick={() => updateQuantity('increase', product.quantity, quantity, setQuantity, setAlert)}
								className="w-6 h-6 rounded-full border border-black/50 hover:bg-black hover:text-white cursor-pointer select-none flex items-center justify-center"
							>
								+
							</span>
						</div>
						{alert && (
							<div className="relative mt-4 px-4 py-8 bg-gray-50 flex items-center">
								<p className="text-black text-sm">Stock limited</p>
								<span onClick={() => setAlert(false)} className="absolute top-2 right-2 w-6 h-6 rounded-full flex items-center justify-center border border-black text-black cursor-pointer select-none">
									<BsX />
								</span>
							</div>
						)}
					</div>

					{/*Add to cart */}
					<div className="mt-12 space-y-4">
						{product.quantity !== 0 && data.inCart !== null && data.inCart.includes(product._id) ? (
							<button className="w-full h-12 bg-gray-800 text-white font-medium rounded-full">In cart</button>
						) : (
							<>
								{!isAuth() ? (
									<button onClick={() => dispatch({ type: 'loginRegisterModal', payload: true })} className="w-full h-12 bg-black text-white font-medium rounded-full">
										Please login to buy
									</button>
								) : (
									<button onClick={() => addToCart(product._id, product.price, quantity, setQuantity, dispatch, fetchData)} className="w-full h-12 bg-black text-white font-medium rounded-full">
										Add to cart
									</button>
								)}
							</>
						)}

						<button onClick={() => addWishList(product._id, setWList)} className={`${isWish(product._id, wList) && 'hidden'} flex items-center text-gray-500`}>
							<BsHeart />
							<span className="ml-2 text-sm">Favourite</span>
						</button>
						<button onClick={() => removeWishList(product._id, setWList)} className={`${!isWish(product._id, wList) && 'hidden'} flex items-center text-red-500`}>
							<BsHeartFill />
							<span className="ml-2 text-sm">Remove Favourite</span>
						</button>
					</div>
				</div>
			</div>

			{/* Rating reviews */}
			<RatingReviews />
		</section>
	);
};

const SingleProduct = () => {
	return <Layout children={<SingleProductComponent />} />;
};

export default SingleProduct;

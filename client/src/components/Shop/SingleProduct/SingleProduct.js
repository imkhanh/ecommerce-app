import React, { useContext, useEffect, useState } from 'react';
import { BsChevronDown, BsChevronLeft, BsChevronRight, BsChevronUp, BsHeart, BsHeartFill, BsShare } from 'react-icons/bs';
import { changeSlide, updateQuantity, addToCart, cartList } from './Minxins';
import { isWish, addWishListProduct, removeWishListProduct } from '../Products/Minxins';
import { getSingleProduct, postAddToCart } from './FetchData';
import Layout, { LayoutContext } from '../Layout/Layout';
import { Link, useParams } from 'react-router-dom';
import { isAdmin, isAuth } from '../Auth/Authentication';
import RatingReviews from './RatingReviews';
import Loading from '../Layout/Loading';

import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';
import Slogan from '../Home/Slogan';

const SingleProductSection = () => {
	const { id } = useParams();
	const { state, dispatch } = useContext(LayoutContext);
	const product = state.singleProduct;

	const [wishList, setWishList] = useState(JSON.parse(localStorage.getItem('wish')));
	const [currentImage, setCurrentImage] = useState(0);
	const [quantity, setQuantity] = useState(1);
	const [readMore, setReadMore] = useState(false);
	const [alert, setAlert] = useState(false);
	const [showDelivery, setShowDelivery] = useState(false);

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
				dispatch({ type: 'inCart', payload: cartList() });

				dispatch({ type: 'loading', payload: false });
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

	if (state.loading) {
		return <Loading />;
	} else if (!product) {
		return <div>No product found</div>;
	}

	return (
		<section className="pt-12 pb-32 px-8 md:px-4 max-w-[80rem] mx-auto">
			<div className="mb-4 flex items-center space-x-2">
				<Link to="/" className="text-sm font-light text-black/50">
					Home
				</Link>
				<span className="text-sm text-black/50">
					<BsChevronRight />
				</span>
				<span className="text-sm text-black cursor-pointer">{product && product.title}</span>
			</div>

			<div className="flex md:flex-col">
				<div className="w-2/3 lg:w-3/5 md:w-full">
					<div className={`md:hidden grid ${product.images.length > 3 ? 'grid-cols-2 md:grid-cols-1' : 'grid-cols-1'} gap-3`}>
						{product &&
							product.images.length > 0 &&
							product.images.map((img, index) => {
								return (
									<Zoom key={index} zoomMargin={80}>
										<img src={`http://localhost:3000/uploads/products/${img}`} alt={index} className="w-full h-full object-cover" />
									</Zoom>
								);
							})}
					</div>
					<div className="relative hidden md:block">
						<span
							onClick={() => changeSlide('prev', currentImage, setCurrentImage, product.images)}
							className="absolute top-1/2 left-3 transform -translate-y-1/2 w-10 h-10 rounded-full bg-transparent hover:bg-white cursor-pointer select-none grid place-items-center transition-colors z-10"
						>
							<BsChevronLeft />
						</span>
						<span
							onClick={() => changeSlide('next', currentImage, setCurrentImage, product.images)}
							className="absolute top-1/2 right-3 transform -translate-y-1/2 w-10 h-10 rounded-full bg-transparent hover:bg-white cursor-pointer select-none grid place-items-center transition-colors z-10"
						>
							<BsChevronRight />
						</span>
						<Zoom zoomMargin={80}>
							<img src={`http://localhost:3000/uploads/products/${product.images[currentImage]}`} alt={product.name} className="w-full h-full object-cover" />
						</Zoom>
						<span className="absolute bottom-4 left-4 px-4 py-[3px] bg-white z-10 text-sm rounded-full">
							{currentImage + 1} / {product.images.length}
						</span>
					</div>
				</div>
				<div className="w-1/3 lg:w-2/5 md:w-full ml-16 lg:ml-12 md:ml-0 md:mt-12 sticky top-20 bg-white">
					<div className="space-y-12">
						{/* ============ Product detail ============ */}
						<div className="pb-4 border-b border-gray-200 flex items-center justify-between">
							<div>
								<h1 className="text-black font-semibold text-3xl">{product.title}</h1>
								<div>{product.category.title}</div>
								{product.discount ? (
									<div className="mt-4 flex items-center text-black font-light space-x-4">
										<span className="text-black font-medium">{product.price_discount}$</span>
										<span className="text-black/30 line-through">{product.price}$</span>
										<p className="font-medium text-green-700">{product.discount}% off</p>
									</div>
								) : (
									<div className="mt-4 text-black font-medium">{product.price}$</div>
								)}
							</div>
							<span className="text-lg text-black/70 cursor-pointer select-none">
								<BsShare />
							</span>
						</div>

						{/* ============ Description ============ */}
						<div>
							<span className="mb-3 block text-sm font-medium cursor-pointer">Description</span>
							<p className="text-black/80 font-light text-justify leading-6">
								{product.description.length < 190 ? product.description : readMore ? product.description + '' : product.description.slice(0, 190) + '... '}

								{product.description.length > 190 && (
									<span onClick={() => setReadMore(!readMore)} className="underline underline-offset-2 cursor-pointer select-none">
										{readMore ? 'hide' : 'read more'}
									</span>
								)}
							</p>
						</div>

						{/* ============ Quantity ============ */}
						{product.quantity && (
							<div>
								<span className="block mb-3 text-sm font-medium">Quantity: {product.quantity}</span>
								<div className="flex items-center select-none">
									<span
										onClick={() => updateQuantity('decrease', product.quantity, quantity, setQuantity, setAlert)}
										className="px-3.5 py-0.5 rounded-md bg-white text-black border border-black/40 hover:border-black flex items-center justify-center cursor-pointer transition-colors"
									>
										-
									</span>
									<span className="w-12 text-center">{quantity}</span>
									<span
										onClick={() => updateQuantity('increase', product.quantity, quantity, setQuantity, setAlert)}
										className="px-3.5 py-0.5 rounded-md bg-white text-black border border-black/40 hover:border-black flex items-center justify-center cursor-pointer transition-colors"
									>
										+
									</span>
								</div>

								{alert && (
									<div className="mt-4 p-4 flex items-center justify-between text-black/30 border-b border-black/50 bg-[#fafafa]">
										<span className="text-sm">Stock limited</span>
										<span onClick={() => setAlert(false)} className="text-sm cursor-pointer select-none">
											Close
										</span>
									</div>
								)}
							</div>
						)}

						{/* ============ Button add to cart ============ */}
						<div className="space-y-3">
							{product.quantity && state.inCart !== null && state.inCart.includes(product._id) ? (
								<button className="w-full h-14 font-medium border border-black bg-black text-white rounded-full">In cart</button>
							) : (
								<>
									{!isAuth() ? (
										<button onClick={() => dispatch({ type: 'authModal', payload: true })} className="w-full h-14 font-medium border border-black bg-black text-white rounded-full">
											Please login to buy
										</button>
									) : isAdmin() ? (
										<button className="w-full h-14 font-medium border border-black bg-gray-800 text-white rounded-full cursor-not-allowed">Admin can not buy</button>
									) : (
										<button className="w-full h-14 font-medium border border-black bg-black text-white rounded-full" onClick={() => addToCart(product._id, product.price, product.price_discount, quantity, setQuantity, dispatch, fetchData)}>
											Add to cart
										</button>
									)}
								</>
							)}

							<button onClick={() => addWishListProduct(product._id, setWishList)} className={`${isWish(product._id, wishList) && 'hidden'} w-full h-14 border border-black/40 flex items-center justify-center bg-white text-black/50 rounded-full`}>
								<span className="mr-2">Favourite</span>
								<BsHeart />
							</button>
							<button onClick={() => removeWishListProduct(product._id, setWishList)} className={`${!isWish(product._id, wishList) && 'hidden'} w-full h-14 border border-red-500 flex items-center justify-center bg-white text-red-500 rounded-full`}>
								<span className="mr-2">Favourite</span>
								<BsHeartFill />
							</button>
						</div>
					</div>

					<div className="mt-8 py-4 border-y border-gray-200 ">
						<div onClick={() => setShowDelivery(!showDelivery)} className="flex items-center justify-between cursor-pointer select-none">
							<span className="text-black font-medium text-lg">Free Delivery and Returns</span>
							<span className="text-lg">{showDelivery ? <BsChevronDown /> : <BsChevronUp />}</span>
						</div>
						{showDelivery && (
							<div className="py-6 space-y-8 text-black/80 font-light">
								<p>Your order of $300 or more gets free standard delivery.</p>
								<ol className="ml-4 list-disc">
									<li>Standard delivered 4-5 Business Days</li>
									<li>Express delivered 2-4 Business Days</li>
								</ol>

								<p>Orders are processed and delivered Monday-Friday (excluding public holidays)</p>
								<p>
									Nike Members enjoy <span className="cursor-pointer font-medium underline">free returns.</span>
								</p>
							</div>
						)}
					</div>

					<RatingReviews />
				</div>
			</div>

			<Slogan title="Peace through any pose" subTitle="Yoga Soul Festival Collection" />
		</section>
	);
};

const SingleProduct = () => {
	return <Layout children={<SingleProductSection />} />;
};

export default SingleProduct;

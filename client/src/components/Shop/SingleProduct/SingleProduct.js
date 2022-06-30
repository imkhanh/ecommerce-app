import React, { useContext, useEffect, useState } from 'react';
import { BsChevronLeft, BsChevronRight, BsChevronUp, BsHeart, BsHeartFill, BsShare } from 'react-icons/bs';
import { changeSlide, updateQuantity, addToCart, cartList } from './Minxins';
import { isWish, addWishListProduct, removeWishListProduct } from '../Products/Minxins';
import { getSingleProduct, postAddToCart } from './FetchData';
import Layout, { LayoutContext } from '../Layout/Layout';
import { Link, useParams } from 'react-router-dom';
import { isAuth } from '../Auth/Authentication';
import RatingReviews from './RatingReviews';

import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';

const SingleProductSection = () => {
	const { id } = useParams();
	const { state, dispatch } = useContext(LayoutContext);
	const product = state.singleProduct;

	const [wishList, setWishList] = useState(JSON.parse(localStorage.getItem('wish')));
	const [currentImage, setCurrentImage] = useState(0);
	const [quantity, setQuantity] = useState(1);
	const [readMore, setReadMore] = useState(false);
	const [alert, setAlert] = useState(false);
	const [size, setSize] = useState('');
	const [color, setColor] = useState('');

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

	const handlChangeSize = (item) => setSize(item);
	const handlChangeColor = (item) => setColor(item);

	if (state.loading) {
		return <div>Loading</div>;
	} else if (!product) {
		return <div>No product found</div>;
	}

	return (
		<section className="py-12 px-8 md:px-4 max-w-[70rem] mx-auto">
			<div className="mb-4 flex items-center space-x-2">
				<Link to="/" className="text-sm text-slate-500">
					Home
				</Link>
				<span className="text-sm text-slate-500">
					<BsChevronRight />
				</span>
				<span className="text-sm text-black cursor-pointer">{product && product.title}</span>
			</div>
			<div className="grid grid-cols-5 md:grid-cols-1">
				<div className="col-span-3">
					<div className="md:hidden grid grid-cols-2 md:grid-cols-1 gap-3">
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
				<div className="col-span-2 ml-12 lg:ml-6 md:ml-0 md:mt-12 sticky top-0 h-auto z-10">
					<div className="space-y-8">
						<div className="pb-4 border-b border-gray-200 flex items-center justify-between">
							<div>
								<h1 className="text-black font-semibold text-2xl">{product.title}</h1>
								<p className="mt-1 text-sm">{product.category.title}</p>
								<p className="mt-2 font-medium">$ {product.price}</p>
							</div>
							<span className="text-lg text-black/70 cursor-pointer select-none">
								<BsShare />
							</span>
						</div>

						<div>
							<span className="mb-2 block text-sm font-medium">Select size</span>
							<div className="grid grid-cols-4 lg:grid-cols-3 md:grid-cols-5 gap-2">
								{product.sizes &&
									product.sizes.map((item, index) => {
										return (
											<span
												key={index}
												onClick={() => handlChangeSize(item)}
												className={`${item === size ? 'border-black' : 'border-[#ccc]'} flex items-center justify-center px-8 py-2 rounded-md border hover:border-black cursor-pointer select-none transition-colors`}
											>
												{item}
											</span>
										);
									})}
							</div>
						</div>

						<div>
							<span className="mb-2 block text-sm font-medium">Select color</span>
							<div className="grid grid-cols-4 lg:grid-cols-3 md:grid-cols-5 gap-2">
								{product.colors &&
									product.colors.map((item, index) => {
										return (
											<span
												key={index}
												onClick={() => handlChangeColor(item)}
												className={`${item === color ? 'border-black' : 'border-[#ccc]'} flex items-center justify-center px-8 py-2 rounded-md border hover:border-black cursor-pointer select-none transition-colors`}
											>
												{item}
											</span>
										);
									})}
							</div>
						</div>

						{product.quantity !== 0 && (
							<div>
								<span className="block mb-2 text-sm font-medium">Quantity: {product.quantity}</span>
								<div className="flex items-center">
									<span
										onClick={() => updateQuantity('decrease', product.quantity, quantity, setQuantity, setAlert)}
										className="select-none cursor-pointer text-sm w-6 h-6 rounded-full bg-white text-black border border-black/40 hover:border-black flex items-center justify-center"
									>
										-
									</span>
									<span className="w-10 text-center text-sm">{quantity}</span>
									<span
										onClick={() => updateQuantity('increase', product.quantity, quantity, setQuantity, setAlert)}
										className="select-none cursor-pointer text-sm w-6 h-6 rounded-full bg-white text-black border border-black/40 hover:border-black flex items-center justify-center"
									>
										+
									</span>
								</div>

								{alert && (
									<div className="mt-4 p-4 flex items-center justify-between text-[#888] border-b border-black/30 bg-[#fafafa]">
										<span className="text-xs">Stock limited</span>
										<span onClick={() => setAlert(false)} className="text-xs cursor-pointer select-none">
											Close
										</span>
									</div>
								)}
							</div>
						)}

						<div className="space-y-3">
							{product.quantity && state.inCart !== null && state.inCart.includes(product._id) ? (
								<button className="w-full h-14 font-medium border border-black bg-black text-white rounded-full">In cart</button>
							) : (
								<>
									{!isAuth() ? (
										<button onClick={() => dispatch({ type: 'authModal', payload: true })} className="w-full h-14 font-medium border border-black bg-black text-white rounded-full">
											Please login to buy
										</button>
									) : (
										<button className="w-full h-14 font-medium border border-black bg-black text-white rounded-full" onClick={() => addToCart(product._id, product.price, size, color, quantity, setQuantity, setSize, setColor, dispatch, fetchData)}>
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

						<div>
							<span className="mb-2 block text-sm font-medium underline underline-offset-2">Description</span>
							<p className="text-sm text-black/80 font-light text-justify leading-6">
								{product.description.length < 140 ? product.description : readMore ? product.description + '' : product.description.slice(0, 140) + '... '}

								{product.description.length > 140 && (
									<span onClick={() => setReadMore(!readMore)} className="underline cursor-pointer select-none">
										{readMore ? 'hide' : 'read more'}
									</span>
								)}
							</p>
						</div>
					</div>

					<div className="mt-8 py-4 border-y border-gray-200 flex items-center justify-between cursor-pointer select-none">
						<span className="text-black text-lg">Free Delivery and Returns</span>
						<span className="text-lg">
							<BsChevronUp />
						</span>
					</div>

					<RatingReviews />
				</div>
			</div>
		</section>
	);
};

const SingleProduct = () => {
	return <Layout children={<SingleProductSection />} />;
};

export default SingleProduct;

import React, { useContext, useEffect } from 'react';
import { LayoutContext } from './Layout';
import { postAddToCart } from '../SingleProduct/FetchData';
import { cartList, getType, subTotalPrice, totalPrice, totalQuantity } from '../SingleProduct/Minxins';
import { BsArrowLeft, BsCashCoin, BsXLg } from 'react-icons/bs';
import { Link } from 'react-router-dom';

const CartProduct = () => {
	const { state, dispatch } = useContext(LayoutContext);
	const products = state.cartProduct;

	useEffect(() => {
		fetchCartData();
		// eslint-disable-next-line
	}, []);

	const fetchCartData = async () => {
		try {
			const res = await postAddToCart();
			if (res && res.products) {
				dispatch({ type: 'cartProduct', payload: res.products });
				dispatch({ type: 'inCart', payload: cartList() });
			}
		} catch (error) {
			console.log(error);
		}
	};

	const handleRemoveItem = (id) => {
		let cart = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : [];

		if (cart.length > 0) {
			cart = cart.filter((item) => item.id !== id);
			localStorage.setItem('cart', JSON.stringify(cart));
			dispatch({ type: 'inCart', payload: cartList() });
			fetchCartData();
		}
	};

	return (
		<div>
			<div onClick={() => dispatch({ type: 'cartModal', payload: false })} className={`${state.cartModal ? '' : 'hidden'} fixed inset-0 bg-black opacity-50 z-20`}></div>
			<div className={`${state.cartModal ? 'right-0 opacity-100' : '-right-full opacity-0'} transform fixed top-0 max-w-[420px] w-full h-screen transition-all duration-300 ease-in-out bg-white shadow-lg z-30`}>
				<div className="flex flex-col w-full h-full">
					<div className="px-4 h-14 flex items-center justify-between border-b border-gray-200 select-none">
						<div className="text-black font-medium">Cart ({products && products.length})</div>
						<span onClick={() => dispatch({ type: 'cartModal', payload: false })} className="cursor-pointer">
							<BsXLg />
						</span>
					</div>

					<div className="px-4 flex-1 divide-y divide-gray-200">
						{products && products.length > 0 ? (
							products.map((product) => {
								return (
									<div key={product._id} className="py-4 grid grid-cols-5 bg-white">
										<div className="col-span-4 flex items-start">
											<img src={`http://localhost:3000/uploads/products/${product?.images[0]}`} alt={product.name} className="w-24 h-28 object-cover rounded border border-black/20 p-[1px]" />
											<div className="ml-3 text-sm space-y-1 text-[#888] font-light">
												<h4 className="text-black font-medium">{product.title}</h4>
												<p>{getType(product._id)}</p>
												<p>${product.offer ? product.discountPrice : product.price}</p>
												<p>x{totalQuantity(product._id)}</p>
											</div>
										</div>
										<div className="col-span-1 flex flex-col items-end justify-between">
											<span className="font-medium">${subTotalPrice(product._id, product.price, product.discountPrice)}</span>
											<span onClick={() => handleRemoveItem(product._id)} className="text-sm cursor-pointer select-none text-red-500 hover:underline">
												remove
											</span>
										</div>
									</div>
								);
							})
						) : (
							<div className="pt-4">
								<p className="text-black/30 font-light italic">No product in cart</p>
							</div>
						)}
					</div>

					<div className="h-36 border-t border-gray-300 space-y-2">
						<div className="mt-2 px-4 flex items-center justify-between">
							<span className="text-black/50">Total price</span>
							<span className="text-lg text-black font-semibold">${totalPrice()}</span>
						</div>
						<div className="px-4 space-y-1">
							<Link to="/" className="w-full h-11 flex items-center justify-center bg-black text-white rounded-sm">
								<BsCashCoin />
								<span className="ml-2 text-sm">Checkout</span>
							</Link>
							<span className="block text-center text-black/50">or</span>
							<Link to="/products" onClick={() => dispatch({ type: 'cartModal', payload: false })} className="w-full flex items-center justify-center">
								<BsArrowLeft />
								<span className="ml-2 text-sm underline">Continue shopping</span>
							</Link>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default CartProduct;

import React, { useContext, useEffect } from 'react';
import { BsArrowLeft, BsCashCoin, BsXLg } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import { LayoutContext } from './Layout';
import { postAddToCart } from '../SingleProduct/FetchData';
import { cartList, subTotalPrice, totalPrice, totalQuantity } from '../SingleProduct/Mixins';

const CartProduct = () => {
	const { data, dispatch } = useContext(LayoutContext);
	const products = data.cartProduct;

	useEffect(() => {
		fetchData();

		// eslint-disable-next-line
	}, []);

	const fetchData = async () => {
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

	const handleDeleteItem = (id) => {
		let cart = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : [];

		if (cart.length > 0) {
			cart = cart.filter((item) => item.id !== id);
			localStorage.setItem('cart', JSON.stringify(cart));
			dispatch({ type: 'inCart', payload: cartList() });
			fetchData();
		}
	};

	return (
		<div>
			<div onClick={() => dispatch({ type: 'cartModal', payload: false })} className={`${data.cartModal ? '' : 'hidden'} fixed inset-0 w-full h-full bg-black opacity-30 z-40`} />
			<div className={`${data.cartModal ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-full'} fixed top-0 right-0  max-w-[400px] w-full h-screen bg-white rounded-sm shadow-xl transform transition-all duration-300 ease-in-out z-50`}>
				<div className="flex flex-col h-full w-full">
					<div className="px-4 h-16 flex items-center justify-between border-b border-gray-100">
						<div className="text-sm">Cart ({products && products.length})</div>
						<div className="cursor-pointer select-none" onClick={() => dispatch({ type: 'cartModal', payload: false })}>
							<BsXLg />
						</div>
					</div>
					<div className="px-4 flex-1 divide-y divide-gray-200 overflow-y-auto">
						{products && products.length > 0 ? (
							products.map((product) => {
								return (
									<div key={product._id} className="py-4 bg-white grid grid-cols-12">
										<div className="col-span-9 flex items-start">
											<figure>
												<img src={`http://localhost:3000/uploads/products/${product.images[0]}`} alt={product.name} className="w-24 h-28 object-cover rounded" />
											</figure>
											<div className="pl-3 space-y-1">
												<h4 className="text-sm text-black">{product.name}</h4>
												<p className="text-xs text-black/50">{product.category.name}</p>
												<p className="text-xs text-black/50">${product.price}</p>
												<p className="text-xs text-black/50">x{totalQuantity(product._id)}</p>
											</div>
										</div>
										<div className="col-span-3 flex flex-col justify-between items-end">
											<span className="font-semibold">${subTotalPrice(product._id, product.price)}</span>
											<span onClick={() => handleDeleteItem(product._id)} className="text-xs underline underline-offset-2 cursor-pointer select-none text-red-500">
												remove
											</span>
										</div>
									</div>
								);
							})
						) : (
							<div className="py-4 font-light text-black/50 italic">No product in cart</div>
						)}
					</div>
					<div className="h-36 border-t border-gray-200">
						<div className="px-4 py-2 flex items-center justify-between">
							<span className="text-black/60">Total price</span>
							<span className="text-black text-lg font-medium">${totalPrice()}</span>
						</div>
						<div className="mt-2 px-4 space-y-1">
							<Link to="/checkout" className="w-full h-10 flex items-center justify-center bg-black text-white">
								<BsCashCoin />
								<span className="ml-1 text-sm">Checkout</span>
							</Link>
							<div className="text-sm  text-center font-light text-black/40">or</div>
							<Link onClick={() => dispatch({ type: 'cartModal', payload: false })} to="/products" className="flex items-center justify-center text-black/50 hover:text-black hover:underline">
								<BsArrowLeft />
								<span className="ml-1 text-xs">Continue shopping</span>
							</Link>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default CartProduct;

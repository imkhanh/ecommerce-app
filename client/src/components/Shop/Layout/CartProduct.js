import React, { useContext } from 'react';
import { BsArrowLeft, BsCashCoin, BsXLg } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import { LayoutContext } from './Layout';

const CartProduct = () => {
	const { data, dispatch } = useContext(LayoutContext);

	return (
		<div>
			<div onClick={() => dispatch({ type: 'cartModal', payload: false })} className={`${data.cartModal ? '' : 'hidden'} fixed inset-0 w-full h-full bg-black opacity-30 z-40`} />
			<div className={`${data.cartModal ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-full'} fixed top-0 right-0  max-w-sm w-full h-screen bg-white rounded-sm shadow-xl transform transition-all duration-200 ease-in-out z-50`}>
				<div className="flex flex-col h-full w-full">
					<div className="px-4 h-16 flex items-center justify-between border-b border-gray-100">
						<div>cart</div>
						<div className="cursor-pointer select-none" onClick={() => dispatch({ type: 'cartModal', payload: false })}>
							<BsXLg />
						</div>
					</div>
					<div className="flex-1"></div>
					<div className="h-36 border-t border-gray-200">
						<div className="px-4 py-2 flex items-center justify-between">
							<span className="text-black/60">Total price</span>
							<span className="text-black text-lg font-medium">$300</span>
						</div>
						<div className="mt-2 px-4 space-y-1">
							<Link to="/checkout" className="w-full h-10 flex items-center justify-center bg-black text-white">
								<BsCashCoin />
								<span className="ml-1 text-sm">Checkout</span>
							</Link>
							<div className="text-sm  text-center font-light text-black/40">or</div>
							<Link to="/products" className="flex items-center justify-center text-black/50 hover:text-black hover:underline">
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

import React, { useEffect, useContext, useState } from 'react';
import Layout, { LayoutContext } from '../Layout/Layout';
import { Link, useNavigate } from 'react-router-dom';
import { BsChevronRight } from 'react-icons/bs';
import { postAddToCart } from '../SingleProduct/FetchData';
import CheckoutProducts from './CheckoutProducts';
import { getBraintreeToken, getPaymentProcesss, postCreateOrder } from './FetchData';
import { totalPrice } from '../SingleProduct/Minxins';
import Loading from '../Layout/Loading';
import DropIn from 'braintree-web-drop-in-react';

const CheckoutComponent = () => {
	const navigate = useNavigate();
	const { state, dispatch } = useContext(LayoutContext);
	const [data, setData] = useState({
		address: '',
		phone: '',
		success: false,
		error: false,
		clientToken: null,
		instance: {},
	});

	useEffect(() => {
		const fetchCartData = async () => {
			dispatch({ type: 'loading', payload: true });
			try {
				const res = await postAddToCart();
				setTimeout(() => {
					if (res && res.products) {
						dispatch({ type: 'cartProduct', payload: res.products });
						dispatch({ type: 'loading', payload: false });
					}
				}, 1000);
			} catch (error) {
				console.log(error);
			}
		};

		fetchCartData();
		// eslint-disable-next-line
	}, []);

	useEffect(() => {
		const fetchBraintreeToken = async () => {
			try {
				const res = await getBraintreeToken();
				setData({ clientToken: res.clientToken, success: res.success });
			} catch (error) {
				console.log(error);
			}
		};
		fetchBraintreeToken();
	}, []);

	const pay = () => {
		if (!data.address) {
			setData({ ...data, error: 'Please provide your address' });
		} else if (!data.phone) {
			setData({ ...data, error: 'Please provide your phone' });
		} else {
			let nonce;

			data.instance.requestPaymentMethod().then((reslut) => {
				dispatch({ type: 'loading', payload: true });
				nonce = reslut.nonce;
				let paymentData = { amountTotal: totalPrice(), paymentMethod: nonce };
				getPaymentProcesss(paymentData).then(async (res) => {
					if (res) {
						let orderData = {
							allProduct: JSON.parse(localStorage.getItem('cart')),
							user: JSON.parse(localStorage.getItem('jwt')).user._id,
							amount: res.transaction.amount,
							transactionId: res.transaction.id,
							address: data.address,
							phone: data.phone,
						};
						try {
							const res = await postCreateOrder(orderData);

							if (res.success) {
								localStorage.setItem('cart', JSON.stringify([]));
								dispatch({ type: 'cartProduct', payload: null });
								dispatch({ type: 'orderSuccess', payload: true });
								setData({ clientToken: null, instance: {} });
								dispatch({ type: 'loading', payload: false });
								return navigate('/');
							}
						} catch (error) {
							console.log(error);
						}
					}
				});
			});
		}
	};

	if (state.loading) return <Loading />;

	return (
		<section className="py-12 px-8 md:px-4 max-w-[80rem] mx-auto">
			<div className="mb-8 md:mb-4 flex items-center space-x-2">
				<Link to="/" className="text-sm font-light text-black/50">
					Home
				</Link>
				<span className="text-sm text-black/50">
					<BsChevronRight />
				</span>
				<span className="text-sm text-black">Checkout</span>
			</div>

			<div className="grid md:grid-cols-1 grid-cols-2 gap-24 lg:gap-12">
				<CheckoutProducts products={state.cartProduct} />
				<div className="md:order-first">
					{data.clientToken !== null ? (
						<div className="space-y-4">
							{data.error ? <div className="border-l-2 border-red-700 bg-red-100 text-red-700 py-3 px-4 text-sm">{data.error}</div> : ''}
							<div>
								<label className="block mb-1 text-sm text-gray-600" htmlFor="email">
									Deliverly Address
								</label>
								<input type="text" name="address" value={data.address} onChange={(e) => setData({ ...data, address: e.target.value })} className="rounded-[3px] shadow-sm border border-gray-200 w-full text-sm p-2.5" />
							</div>
							<div>
								<label className="block mb-1 text-sm text-gray-600" htmlFor="phone">
									Phone
								</label>
								<input type="text" value={data.phone} onChange={(e) => setData({ ...data, phone: e.target.value })} className="rounded-[3px] shadow-sm border border-gray-200 w-full text-sm p-2.5" />
							</div>
							<div>
								<DropIn
									options={{
										authorization: data.clientToken,
										paypal: {
											flow: 'vault',
										},
									}}
									onInstance={(instance) => (data.instance = instance)}
								/>
							</div>

							<button onClick={pay} className="rounded-[3px] bg-black text-sm py-3 font-medium text-white w-full block" type="button">
								Pay Now
							</button>
						</div>
					) : (
						<div></div>
					)}
				</div>
			</div>
		</section>
	);
};

const Checkout = () => {
	return <Layout children={<CheckoutComponent />} />;
};

export default Checkout;

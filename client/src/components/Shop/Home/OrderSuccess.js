import React, { useContext } from 'react';
import { LayoutContext } from '../Layout/Layout';

const OrderSuccess = () => {
	const { state, dispatch } = useContext(LayoutContext);

	return (
		<div className={`${state.orderSuccess ? 'h-52 opacity-100 pointer-events-auto' : 'h-0 opacity-0 pointer-events-none'} fixed w-full left-0 bottom-0 bg-slate-800 text-white z-20 transform transition-all duration-300 ease-in-out`}>
			<span onClick={() => dispatch({ type: 'orderSuccess', payload: false })} className="absolute top-4 right-4 cursor-pointer">
				close
			</span>
			<div className="h-full flex items-center justify-center"> Your Order in process. Wait 2 days to deliver.</div>
		</div>
	);
};

export default OrderSuccess;

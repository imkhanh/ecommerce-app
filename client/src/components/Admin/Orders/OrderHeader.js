import React, { useContext, useState } from 'react';
import { BsFilter } from 'react-icons/bs';
import Loading from '../Layout/Loading';
import { AdminOrderContext } from './AdminOrders';
import { getAllOrders } from './FetchData';
import UpdateOrder from './UpdateOrder';

const OrderHeader = () => {
	const { state, dispatch } = useContext(AdminOrderContext);
	const [dropdown, setDropdown] = useState(false);

	const handleFilterState = async (type) => {
		dispatch({ type: 'loading', payload: true });

		try {
			const res = await getAllOrders();
			if (res && res.orders) {
				let newOrder;
				if (type === 'All') {
					dispatch({ type: 'orders', payload: res.orders });
					setDropdown(!dropdown);
					dispatch({ type: 'loading', payload: false });
				} else if (type === 'Not processed') {
					newOrder = res.orders.filter((item) => item.status === 'Not processed');
					dispatch({ type: 'orders', payload: newOrder });
					setDropdown(!dropdown);
					dispatch({ type: 'loading', payload: false });
				} else if (type === 'Processing') {
					newOrder = res.orders.filter((item) => item.status === 'Processing');
					dispatch({ type: 'orders', payload: newOrder });
					setDropdown(!dropdown);
					dispatch({ type: 'loading', payload: false });
				} else if (type === 'Shipped') {
					newOrder = res.orders.filter((item) => item.status === 'Shipped');
					dispatch({ type: 'orders', payload: newOrder });
					setDropdown(!dropdown);
					dispatch({ type: 'loading', payload: false });
				} else if (type === 'Delivered') {
					newOrder = res.orders.filter((item) => item.status === 'Delivered');
					dispatch({ type: 'orders', payload: newOrder });
					setDropdown(!dropdown);
					dispatch({ type: 'loading', payload: false });
				} else if (type === 'Cancelled') {
					newOrder = res.orders.filter((item) => item.status === 'Cancelled');
					dispatch({ type: 'orders', payload: newOrder });
					setDropdown(!dropdown);
					dispatch({ type: 'loading', payload: false });
				}
			}
		} catch (error) {}
	};

	if (state.loading) return <Loading />;

	return (
		<div>
			<div className="relative">
				<div onClick={(e) => setDropdown(!dropdown)} className="text-white w-24 h-9 flex items-center justify-center bg-black rounded-full cursor-pointer select-none">
					<BsFilter className="text-xl" />
					<span className="ml-3 text-sm font-medium">Filter</span>
				</div>
				<div className={`${dropdown ? '' : 'hidden'} absolute top-0 left-0 mt-12 overflow-hidden w-48 flex flex-col bg-white shadow-md rounded-md border border-gray-200 z-10`}>
					<span onClick={() => handleFilterState('All')} className="px-4 py-3 text-sm hover:bg-gray-50 text-black text-center cursor-pointer select-none">
						All
					</span>
					<span onClick={() => handleFilterState('Not processed')} className="px-4 py-3 text-sm hover:bg-gray-50 text-black text-center cursor-pointer select-none">
						Not processed
					</span>
					<span onClick={() => handleFilterState('Processing')} className="px-4 py-3 text-sm hover:bg-gray-50 text-black text-center cursor-pointer select-none">
						Processing
					</span>
					<span onClick={() => handleFilterState('Shipped')} className="px-4 py-3 text-sm hover:bg-gray-50 text-black text-center cursor-pointer select-none">
						Shipped
					</span>
					<span onClick={() => handleFilterState('Delivered')} className="px-4 py-3 text-sm hover:bg-gray-50 text-black text-center cursor-pointer select-none">
						Delivered
					</span>
					<span onClick={() => handleFilterState('Cancelled')} className="px-4 py-3 text-sm hover:bg-gray-50 text-black text-center cursor-pointer select-none">
						Cancelled
					</span>
				</div>
			</div>
			<UpdateOrder />
		</div>
	);
};

export default OrderHeader;

import React, { useContext, useEffect } from 'react';
import DashboardLayout, { DashboardContext } from './DashboardLayout';
import { LayoutContext } from '../Layout/Layout';
import { postAddWishList } from './FetchData';
import { useNavigate } from 'react-router-dom';
import Loading from '../Layout/Loading';

const UserWishListComponent = () => {
	const navigate = useNavigate();
	const { state, dispatch } = useContext(DashboardContext);
	const { state: layoutState, dispatch: layoutDispatch } = useContext(LayoutContext);
	const { products, loading } = state;

	useEffect(() => {
		fetchData();

		// eslint-disable-next-line
	}, []);

	const fetchData = async () => {
		dispatch({ type: 'loading', payload: true });

		try {
			const res = await postAddWishList();
			if (res && res.products) {
				dispatch({ type: 'products', payload: res.products });
				dispatch({ type: 'loading', payload: false });
			}
		} catch (error) {
			console.log(error);
		}
	};

	const handleRemoveItem = (id) => {
		const list = localStorage.getItem('wish') ? JSON.parse(localStorage.getItem('wish')) : [];

		if (list.length > 0) {
			if (list.includes(id)) {
				list.splice(list.indexOf(id), 1);
				localStorage.setItem('wish', JSON.stringify(list));
				fetchData();
			}
		}
	};

	if (loading) return <Loading />;

	return (
		<div className="px-12 md:px-8 pb-8 ">
			<div className="py-4 border-b border-gray-200">
				<h4 className="text-black font-medium">My Wish List</h4>
				<p className="text-sm text-black/40 font-light">{products && products.length} product in wish list</p>
			</div>

			<div className="mt-4 overflow-x-auto">
				<table className="min-w-full text-sm border border-gray-200">
					<thead className="border-b border-gray-200">
						<tr>
							<th className="py-2 px-4 font-medium text-left text-gray-900 whitespace-nowrap">
								<div className="flex items-center">Image</div>
							</th>
							<th className="py-2 px-4 font-medium text-left text-gray-900 whitespace-nowrap">
								<div className="flex items-center">Title</div>
							</th>
							<th className="py-2 px-4 font-medium text-left text-gray-900 whitespace-nowrap">
								<div className="flex items-center">Category</div>
							</th>
							<th className="py-2 px-4 font-medium text-left text-gray-900 whitespace-nowrap">
								<div className="flex items-center">Price ($)</div>
							</th>
							<th className="py-2 px-4 font-medium text-left text-gray-900 whitespace-nowrap">
								<div className="flex items-center">Status</div>
							</th>
							<th className="py-2 px-4 font-medium text-left text-gray-900 whitespace-nowrap">
								<div className="flex items-center">Actions</div>
							</th>
						</tr>
					</thead>
					<tbody className="divide-y divide-gray-100">
						{products && products.length > 0 ? (
							products.map((product) => {
								return (
									<tr key={product._id}>
										<td className="p-4 ">
											<img src={`http://localhost:3000/uploads/products/${product.images[0]}`} alt={product.name} className="w-16 h-20 border border-black/10 object-contain" />
										</td>
										<td className="p-4 text-gray-700 whitespace-nowrap">{product.title}</td>
										<td className="p-4 text-gray-700 whitespace-nowrap">{product.category.title}</td>
										<td className="p-4 text-gray-700 whitespace-nowrap">{product.price}$</td>
										<td className="p-4 text-gray-700 whitespace-nowrap">
											{layoutState.inCart !== null && layoutState.inCart.includes(product._id) ? (
												<strong onClick={() => layoutDispatch({ type: 'cartModal', payload: true })} className="bg-green-100 text-green-700 px-3 py-2 rounded text-xs font-medium cursor-pointer select-none">
													In cart
												</strong>
											) : (
												<strong className="bg-gray-200 text-black px-3 py-2 rounded text-xs font-medium cursor-pointer select-none">In stock</strong>
											)}
										</td>
										<td className="p-4 text-gray-700 whitespace-nowrap space-x-2">
											<strong onClick={() => navigate(`/product/detail/${product._id}`)} className="bg-white text-black border border-black/20 px-3 py-2 rounded text-xs font-medium cursor-pointer select-none">
												View
											</strong>
											<strong onClick={() => handleRemoveItem(product._id)} className="bg-red-500 text-white px-3 py-2 rounded text-xs font-medium cursor-pointer select-none">
												Remove
											</strong>
										</td>
									</tr>
								);
							})
						) : (
							<tr>
								<td>No product in wish list</td>
							</tr>
						)}
					</tbody>
				</table>
			</div>
		</div>
	);
};

const UserWishList = () => {
	return <DashboardLayout children={<UserWishListComponent />} />;
};

export default UserWishList;

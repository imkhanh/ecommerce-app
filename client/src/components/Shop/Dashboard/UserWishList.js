import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from './DashboardLayout';
import { getWishList } from './FetchData';
import { LayoutContext } from '../Layout/Layout';

const UserWishListComponent = () => {
	const navigate = useNavigate();
	const { data, dispatch } = useContext(LayoutContext);
	const [products, setProducts] = useState([]);

	useEffect(() => {
		fetchData();

		// eslint-disable-next-line
	}, []);

	const fetchData = async () => {
		try {
			const res = await getWishList();
			if (res && res.products) {
				setProducts(res.products);
			}
		} catch (error) {
			console.log(error);
		}
	};

	const handleDelete = (id) => {
		const list = localStorage.getItem('wish') ? JSON.parse(localStorage.getItem('wish')) : [];

		if (list.length > 0) {
			if (list.includes(id)) {
				list.splice(list.indexOf(id), 1);
				localStorage.setItem('wish', JSON.stringify(list));
				fetchData();
			}
		}
	};

	return (
		<div className="px-8 pb-8 shadow-lg rounded-bl-md rounded-br-md">
			<div className="py-4 border-b border-gray-200">
				<h4 className="text-base font-medium">My Wish List</h4>
				<p className="text-sm font-light text-black/50">{products && products.length} product in wish list</p>
			</div>

			<div className=" mt-4 overflow-x-auto">
				<table className="min-w-full text-sm divide-y divide-gray-200">
					<thead>
						<tr>
							<th className="p-4 font-medium text-left text-gray-900 whitespace-nowrap">Image</th>
							<th className="p-4 font-medium text-left text-gray-900 whitespace-nowrap">Name</th>
							<th className="p-4 font-medium text-left text-gray-900 whitespace-nowrap">Category</th>
							<th className="p-4 font-medium text-left text-gray-900 whitespace-nowrap">Price</th>
							<th className="p-4 font-medium text-left text-gray-900 whitespace-nowrap">Status</th>
							<th className="p-4 font-medium text-left text-gray-900 whitespace-nowrap">Actions</th>
						</tr>
					</thead>
					<tbody className="divide-y divide-gray-100">
						{products && products.length > 0 ? (
							products.map((product) => {
								return (
									<tr key={product._id}>
										<td className="p-4 text-gray-700 whitespace-nowrap">
											<img src={`http://localhost:3000/uploads/products/${product.images[0]}`} alt={product.name} className="w-14 h-18 object-cover" />
										</td>
										<td className="p-4 font-medium text-gray-900 whitespace-nowrap">{product.name}</td>
										<td className="p-4 text-gray-700 whitespace-nowrap">{product.category.name}</td>
										<td className="p-4 text-gray-700 whitespace-nowrap">${product.price}</td>
										<td className="p-4 text-gray-700 whitespace-nowrap">
											{data.inCart !== null && data.inCart.includes(product._id) ? (
												<strong onClick={() => dispatch({ type: 'cartModal', payload: true })} className="bg-green-100 text-green-700 px-3 py-1.5 rounded text-xs font-medium cursor-pointer select-none">
													In cart
												</strong>
											) : (
												<strong className="bg-gray-100 text-black px-3 py-1.5 rounded text-xs font-medium">In stock</strong>
											)}
										</td>
										<td className="py-4 text-gray-700 whitespace-nowrap space-x-2">
											<span onClick={() => navigate(`/product/detail/${product._id}`)} className="px-3 py-1.5 text-xs bg-gray-200 border border-gray-200 text-black rounded font-medium cursor-pointer">
												View
											</span>
											<span onClick={() => handleDelete(product._id)} className="px-3 py-1.5 text-xs bg-white border border-red-500 text-red-500 font-medium rounded cursor-pointer">
												Delete
											</span>
										</td>
									</tr>
								);
							})
						) : (
							<tr>
								<td colSpan="5" className="p-4 text-black/50 font-light italic">
									No product in wish list
								</td>
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

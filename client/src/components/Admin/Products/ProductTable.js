import React, { useContext, useEffect } from 'react';
import { deleteProduct, getAllProducts } from './FetchData';
import { ProductContext } from './Products';
import dayjs from 'dayjs';
import Loading from '../Layout/Loading.js';

const ProductTable = () => {
	const { data, dispatch } = useContext(ProductContext);
	const { products, loading } = data;

	useEffect(() => {
		fetchData();

		// eslint-disable-next-line
	}, []);

	const fetchData = async () => {
		dispatch({ type: 'loading', payload: true });

		try {
			const res = await getAllProducts();
			if (res && res.products) {
				dispatch({ type: 'products', payload: res.products });
				dispatch({ type: 'loading', payload: false });
			}
		} catch (error) {
			console.log(error);
		}
	};

	const handleDeleteProduct = async (id) => {
		try {
			const res = await deleteProduct(id);
			if (res && res.success) {
				fetchData();
			}
		} catch (error) {
			console.log(error);
		}
	};

	const handleEditProduct = (id, product) => {
		dispatch({ type: 'editProductModalOpen', payload: { id, ...product } });
	};

	if (loading) return <Loading />;

	return (
		<div>
			<div className="py-2">
				<h4 className="text-sm font-light text-black/50">{products && products.length} products</h4>
			</div>
			<div className="mt-4 overflow-x-auto shadow-md">
				<table className="min-w-full text-sm border border-gray-100 rounded">
					<thead className="border-b border-gray-200">
						<tr>
							<th className="p-4 text-left font-normal text-black whitespace-nowrap">Image</th>
							<th className="p-4 text-left font-normal text-black whitespace-nowrap">Name</th>
							<th className="p-4 text-left font-normal text-black whitespace-nowrap">Description</th>
							<th className="p-4 text-left font-normal text-black whitespace-nowrap">Category</th>
							<th className="p-4 text-left font-normal text-black whitespace-nowrap">Price</th>
							<th className="p-4 text-left font-normal text-black whitespace-nowrap">Status</th>
							<th className="p-4 text-left font-normal text-black whitespace-nowrap">Quantity</th>
							<th className="p-4 text-left font-normal text-black whitespace-nowrap">Offer</th>
							<th className="p-4 text-left font-normal text-black whitespace-nowrap">Created At</th>
							<th className="p-4 text-left font-normal text-black whitespace-nowrap">Updated At</th>
							<th className="p-4 text-left font-normal text-black whitespace-nowrap">Actions</th>
						</tr>
					</thead>
					<tbody className="divide-y divide-gray-100">
						{products && products.length > 0 ? (
							products.map((product) => {
								return (
									<tr key={product._id} className="font-light">
										<td className="p-4 text-black/80 whitespace-nowrap">
											<img src={`http://localhost:3000/uploads/products/${product.images[0]}`} alt={product.name} className="w-14 h-18 object-cover" />
										</td>
										<td className="p-4 text-gray-900 whitespace-nowrap">{product.name}</td>
										<td className="p-4 text-gray-900 whitespace-nowrap">
											{product.description.length < 20 ? product.description : product.description.slice(0, 20) + '...'}
										</td>
										<td className="p-4 text-black/80 whitespace-nowrap">{product.category.name}</td>
										<td className="p-4 text-black/80 whitespace-nowrap">${product.price}</td>
										<td className="p-4 text-black/80 whitespace-nowrap">
											<strong
												className={`${
													product.status === 'Active' ? 'bg-green-100 text-green-700' : product.status === 'New' ? 'bg-red-100 text-red-700' : 'bg-gray-200 text-black'
												}  px-3 py-1.5 rounded text-xs font-medium`}
											>
												{product.status}
											</strong>
										</td>
										<td className="p-4 text-black/80 whitespace-nowrap">{product.quantity}</td>
										<td className="p-4 text-black/80 whitespace-nowrap">{product.offer}%</td>
										<td className="p-4 text-black/80 whitespace-nowrap">{dayjs(product.createdAt).format('DD/MM/YYYY')}</td>
										<td className="p-4 text-black/80 whitespace-nowrap">{dayjs(product.updatedAt).format('DD/MM/YYYY')}</td>

										<td className="p-4 text-black/80 whitespace-nowrap space-x-2">
											<span
												onClick={() => handleEditProduct(product._id, product)}
												className="px-3 py-1.5 text-xs bg-gray-200 border border-gray-200 text-black rounded font-medium cursor-pointer"
											>
												Edit
											</span>
											<span
												onClick={() => handleDeleteProduct(product._id)}
												className="px-3 py-1.5 text-xs bg-white border border-red-500 text-red-500 font-medium rounded cursor-pointer"
											>
												Delete
											</span>
										</td>
									</tr>
								);
							})
						) : (
							<tr>
								<td colSpan="5" className="p-4 text-black/50 font-light italic">
									No product found
								</td>
							</tr>
						)}
					</tbody>
				</table>
			</div>
		</div>
	);
};

export default ProductTable;

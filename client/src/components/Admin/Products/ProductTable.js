import React, { useContext, useEffect } from 'react';
import { getAllProducts, deleteProduct } from './FetchData';
import { AdminProductContext } from './AdminProducts';
import { BsPencil, BsTrash } from 'react-icons/bs';
import Loading from '../Layout/Loading';
import dayjs from 'dayjs';

const ProductTable = () => {
	const { state, dispatch } = useContext(AdminProductContext);
	const { products, loading } = state;

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
		<div className="mt-6 p-4 bg-white shadow-md rounded-[3px]">
			<div className="mb-4 px-4 text-sm font-medium text-black/50">{products && products.length} products</div>
			<div className="overflow-x-auto">
				<table className="min-w-full text-sm">
					<thead className="border-b border-gray-200">
						<tr>
							<th className="py-3 px-4 font-medium text-left text-gray-900 whitespace-nowrap">
								<div className="flex items-center">Image</div>
							</th>
							<th className="py-3 px-4 font-medium text-left text-gray-900 whitespace-nowrap">
								<div className="flex items-center">Title</div>
							</th>
							<th className="py-3 px-4 font-medium text-left text-gray-900 whitespace-nowrap">
								<div className="flex items-center">Category</div>
							</th>
							<th className="py-3 px-4 font-medium text-left text-gray-900 whitespace-nowrap">
								<div className="flex items-center">Description</div>
							</th>
							<th className="py-3 px-4 font-medium text-left text-gray-900 whitespace-nowrap">
								<div className="flex items-center">Price ($)</div>
							</th>
							<th className="py-3 px-4 font-medium text-left text-gray-900 whitespace-nowrap">
								<div className="flex items-center">Discount (%)</div>
							</th>
							<th className="py-3 px-4 font-medium text-left text-gray-900 whitespace-nowrap">
								<div className="flex items-center">Status</div>
							</th>
							<th className="py-3 px-4 font-medium text-left text-gray-900 whitespace-nowrap">
								<div className="flex items-center">Quantity</div>
							</th>
							<th className="py-3 px-4 font-medium text-left text-gray-900 whitespace-nowrap">
								<div className="flex items-center">Created At</div>
							</th>
							<th className="py-3 px-4 font-medium text-left text-gray-900 whitespace-nowrap">
								<div className="flex items-center">Updated At</div>
							</th>
							<th className="py-3 px-4 font-medium text-left text-gray-900 whitespace-nowrap">
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
										<td className="p-4 text-gray-700 whitespace-nowrap">{product.description.length < 20 ? product.description : product.description.slice(0, 20) + '...'}</td>
										<td className="p-4 text-gray-700 whitespace-nowrap">{product.price}$</td>
										<td className={`${product.discount !== null ? 'text-green-700' : 'text-black'} p-4 whitespace-nowrap`}>{product.discount ? product.discount + '%' : 0}</td>
										<td className="p-4 text-gray-700 whitespace-nowrap">
											<strong className="bg-red-100 text-red-700 px-3 py-2 rounded text-xs font-medium cursor-pointer select-none">{product.status}</strong>
										</td>
										<td className="p-4 text-gray-700 whitespace-nowrap">x{product.quantity}</td>
										<td className="p-4 text-gray-700 whitespace-nowrap">{dayjs(product.createdAt).format('DD/MM/YYYY')}</td>
										<td className="p-4 text-gray-700 whitespace-nowrap">{dayjs(product.updatedAt).format('DD/MM/YYYY')}</td>

										<td className="mt-10 flex items-center justify-center text-gray-700 whitespace-nowrap space-x-2">
											<strong onClick={() => handleEditProduct(product._id, product)} className="bg-amber-300 text-black px-3 py-2 rounded text-xs font-medium cursor-pointer select-none">
												<BsPencil />
											</strong>
											<strong onClick={() => handleDeleteProduct(product._id)} className="bg-red-500 text-white px-3 py-2 rounded text-xs font-medium cursor-pointer select-none">
												<BsTrash />
											</strong>
										</td>
									</tr>
								);
							})
						) : (
							<tr>
								<td className="p-4 text-black/30 font-light italic">No product in wish list</td>
							</tr>
						)}
					</tbody>
				</table>
			</div>
		</div>
	);
};

export default ProductTable;

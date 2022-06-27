import React, { useContext, useEffect } from 'react';
import { getAllCategories, deleteCategory } from './FetchData';
import dayjs from 'dayjs';
import Loading from '../Layout/Loading.js';
import { CategoryContext } from './Categories';

const CategoryTable = () => {
	const { data, dispatch } = useContext(CategoryContext);
	const { categories, loading } = data;

	useEffect(() => {
		fetchData();
		// eslint-disable-next-line
	}, []);

	const fetchData = async () => {
		dispatch({ type: 'loading', payload: true });
		try {
			const res = await getAllCategories();
			if (res && res.categories) {
				dispatch({ type: 'categories', payload: res.categories });
				dispatch({ type: 'loading', payload: false });
			}
		} catch (error) {
			console.log(error);
		}
	};

	const handleDeleteCategory = async (id) => {
		try {
			const res = await deleteCategory(id);
			if (res && res.success) {
				fetchData();
			}
		} catch (error) {
			console.log(error);
		}
	};

	const handleEditCategory = (id, category) => {
		dispatch({ type: 'editCategoryModalOpen', payload: { id, ...category } });
	};

	if (loading) return <Loading />;

	return (
		<div className="mt-4">
			<div className="mb-2">
				<h4 className="text-sm font-light text-black/50">{categories && categories.length} categories</h4>
			</div>
			<div className="overflow-x-auto shadow-md">
				<table className="min-w-full text-sm border border-gray-100 rounded">
					<thead className="border-b border-gray-200">
						<tr>
							<th className="p-4 text-left font-normal text-black whitespace-nowrap">Name</th>
							<th className="p-4 text-left font-normal text-black whitespace-nowrap">Description</th>
							<th className="p-4 text-left font-normal text-black whitespace-nowrap">Status</th>
							<th className="p-4 text-left font-normal text-black whitespace-nowrap">Created At</th>
							<th className="p-4 text-left font-normal text-black whitespace-nowrap">Updated At</th>
							<th className="p-4 text-left font-normal text-black whitespace-nowrap">Actions</th>
						</tr>
					</thead>
					<tbody className="divide-y divide-gray-100">
						{categories && categories.length > 0 ? (
							categories.map((item) => {
								return (
									<tr key={item._id} className="font-light">
										<td className="p-4 text-gray-900 whitespace-nowrap">{item.name}</td>
										<td className="p-4 text-gray-900 whitespace-nowrap">{item.description.length < 50 ? item.description : item.description.slice(0, 50) + '...'}</td>
										<td className="p-4 text-black/80 whitespace-nowrap">
											<strong
												className={`${
													item.status === 'Active' ? 'bg-green-100 text-green-700' : item.status === 'New' ? 'bg-red-100 text-red-700' : 'bg-gray-200 text-black'
												}  px-3 py-1.5 rounded text-xs font-medium`}
											>
												{item.status}
											</strong>
										</td>
										<td className="p-4 text-black/80 whitespace-nowrap">{dayjs(item.createdAt).format('DD/MM/YYYY')}</td>
										<td className="p-4 text-black/80 whitespace-nowrap">{dayjs(item.updatedAt).format('DD/MM/YYYY')}</td>

										<td className="p-4 text-black/80 whitespace-nowrap space-x-2">
											<span
												onClick={() => handleEditCategory(item._id, item)}
												className="px-3 py-1.5 text-xs bg-gray-200 border border-gray-200 text-black rounded font-medium cursor-pointer select-none"
											>
												Edit
											</span>
											<span
												onClick={() => handleDeleteCategory(item._id)}
												className="px-3 py-1.5 text-xs bg-white border border-red-500 text-red-500 font-medium rounded cursor-pointer select-none"
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
									No category found
								</td>
							</tr>
						)}
					</tbody>
				</table>
			</div>
		</div>
	);
};

export default CategoryTable;

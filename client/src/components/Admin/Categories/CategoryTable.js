import React, { useContext, useEffect } from 'react';
import { AdminCategoryContext } from './AdminCategories';
import { BsPencil, BsTrash } from 'react-icons/bs';
import { deleteEditCategory, getAllCategories } from './FetchData';
import Loading from '../Layout/Loading';
import dayjs from 'dayjs';

const CategoryTable = () => {
	const { state, dispatch } = useContext(AdminCategoryContext);
	const { categories, loading } = state;

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
			const res = await deleteEditCategory(id);
			if (res && res.success) {
				fetchData();
			}
		} catch (error) {}
	};

	const handleEditCategory = async (id, item) => {
		dispatch({ type: 'editCategoryModalOpen', payload: { id, ...item } });
	};

	if (loading) return <Loading />;

	return (
		<div className="mt-6 p-4 bg-white shadow-md rounded-[3px]">
			<div className="mb-4 px-4 text-sm font-medium text-black/50">{categories && categories.length} categories</div>
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
								<div className="flex items-center">Description</div>
							</th>
							<th className="py-3 px-4 font-medium text-left text-gray-900 whitespace-nowrap">
								<div className="flex items-center">Status</div>
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
						{categories && categories.length > 0 ? (
							categories.map((item) => {
								return (
									<tr key={item._id}>
										<td className="p-4 ">
											<img src={`http://localhost:3000/uploads/categories/${item.image}`} alt={item.name} className="w-16 h-20 border border-black/10 object-contain" />
										</td>
										<td className="p-4 text-gray-700 whitespace-nowrap">{item.title}</td>
										<td className="p-4 text-gray-700 whitespace-nowrap">{item.description}</td>
										<td className="p-4 text-gray-700 whitespace-nowrap">
											<strong className="bg-red-100 text-red-700 px-3 py-2 rounded text-xs font-medium cursor-pointer select-none">{item.status}</strong>
										</td>
										<td className="p-4 text-gray-700 whitespace-nowrap">{dayjs(item.createdAt).format('DD/MM/YYYY')}</td>
										<td className="p-4 text-gray-700 whitespace-nowrap">{dayjs(item.updatedAt).format('DD/MM/YYYY')}</td>

										<td className="px-4 mt-10 flex items-center text-gray-700 whitespace-nowrap space-x-2">
											<strong onClick={() => handleEditCategory(item._id, item)} className="bg-amber-300 text-black px-3 py-2 rounded text-xs font-medium cursor-pointer select-none">
												<BsPencil />
											</strong>
											<strong onClick={() => handleDeleteCategory(item._id)} className="bg-red-500 text-white px-3 py-2 rounded text-xs font-medium cursor-pointer select-none">
												<BsTrash />
											</strong>
										</td>
									</tr>
								);
							})
						) : (
							<tr>
								<td className="p-4 text-black/30 font-light italic">No category found</td>
							</tr>
						)}
					</tbody>
				</table>
			</div>
		</div>
	);
};

export default CategoryTable;

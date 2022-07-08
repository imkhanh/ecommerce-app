import React, { useContext, useEffect } from 'react';
import { AdminUserContext } from './AdminUsers';
import { BsTrash } from 'react-icons/bs';
import { getAllUsers, deleteUser } from './FetchData';
import Loading from '../Layout/Loading';
import dayjs from 'dayjs';

const UserTable = () => {
	const { state, dispatch } = useContext(AdminUserContext);
	const { users, loading } = state;

	useEffect(() => {
		fetchData();
		// eslint-disable-next-line
	}, []);

	const fetchData = async () => {
		dispatch({ type: 'loading', payload: true });
		try {
			const res = await getAllUsers();
			if (res && res.users) {
				dispatch({ type: 'users', payload: res.users });
				dispatch({ type: 'loading', payload: false });
			}
		} catch (error) {
			console.log(error);
		}
	};

	const handleDeleteUser = async (id) => {
		try {
			const res = await deleteUser(id);
			if (res && res.success) {
				fetchData();
			}
		} catch (error) {
			console.log(error);
		}
	};

	if (loading) return <Loading />;

	return (
		<div className="mt-6 p-4 bg-white shadow-md rounded-[3px]">
			<div className="mb-4 px-4 text-sm font-medium text-black/50">{users && users.length} categories</div>
			<div className="overflow-x-auto">
				<table className="min-w-full text-sm">
					<thead className="border-b border-gray-200">
						<tr>
							<th className="py-3 px-4 font-medium text-left text-gray-900 whitespace-nowrap">
								<div className="flex items-center">Name</div>
							</th>
							<th className="py-3 px-4 font-medium text-left text-gray-900 whitespace-nowrap">
								<div className="flex items-center">Email</div>
							</th>
							<th className="py-3 px-4 font-medium text-left text-gray-900 whitespace-nowrap">
								<div className="flex items-center">Phone</div>
							</th>
							<th className="py-3 px-4 font-medium text-left text-gray-900 whitespace-nowrap">
								<div className="flex items-center">Address</div>
							</th>
							<th className="py-3 px-4 font-medium text-left text-gray-900 whitespace-nowrap">
								<div className="flex items-center">Gender</div>
							</th>
							<th className="py-3 px-4 font-medium text-left text-gray-900 whitespace-nowrap">
								<div className="flex items-center">Permission</div>
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
						{users && users.length > 0 ? (
							users.map((item) => {
								return (
									<tr key={item._id}>
										<td className="p-4 text-gray-700 whitespace-nowrap">{item.name}</td>
										<td className="p-4 text-gray-700 whitespace-nowrap">{item.email}</td>
										<td className="p-4 text-gray-700 whitespace-nowrap">{item.phone}</td>
										<td className="p-4 text-gray-700 whitespace-nowrap">{item.address}</td>
										<td className="p-4 text-gray-700 whitespace-nowrap">{item.gender}</td>
										<td className="p-4 text-gray-700">
											<strong className={`${item.role === 0 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'} px-3 py-2 rounded text-xs font-medium cursor-pointer select-none`}>{item.role === 0 ? 'Customer' : 'Admin'}</strong>
										</td>
										<td className="p-4 text-gray-700 whitespace-nowrap">{dayjs(item.createdAt).format('DD/MM/YYYY')}</td>
										<td className="p-4 text-gray-700 whitespace-nowrap">{dayjs(item.updatedAt).format('DD/MM/YYYY')}</td>

										<td className="p-4 flex items-center text-gray-700 space-x-2">
											<strong onClick={() => handleDeleteUser(item._id)} className="bg-red-500 text-white px-3 py-2 rounded text-xs font-medium cursor-pointer select-none">
												<BsTrash />
											</strong>
										</td>
									</tr>
								);
							})
						) : (
							<tr>
								<td className="p-4 text-black/30 font-light italic">No user found</td>
							</tr>
						)}
					</tbody>
				</table>
			</div>
		</div>
	);
};

export default UserTable;

import React, { useContext, useEffect } from 'react';
import dayjs from 'dayjs';
import Loading from '../Layout/Loading.js';
import { UserContext } from './Users';
import { getAllUsers, deleteUser } from './FetchData';

const UserTable = () => {
	const { data, dispatch } = useContext(UserContext);
	const { users, loading } = data;

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
		<div className="mt-4">
			<div className="mb-2">
				<h4 className="text-sm font-light text-black/50">{users && users.length} users</h4>
			</div>
			<div className="overflow-x-auto shadow-md">
				<table className="min-w-full text-sm border border-gray-100 rounded">
					<thead className="border-b border-gray-200">
						<tr>
							<th className="p-4 text-left font-normal text-black whitespace-nowrap">Full name</th>
							<th className="p-4 text-left font-normal text-black whitespace-nowrap">User name</th>
							<th className="p-4 text-left font-normal text-black whitespace-nowrap">Email</th>
							<th className="p-4 text-left font-normal text-black whitespace-nowrap">Phone</th>
							<th className="p-4 text-left font-normal text-black whitespace-nowrap">Created At</th>
							<th className="p-4 text-left font-normal text-black whitespace-nowrap">Actions</th>
						</tr>
					</thead>
					<tbody className="divide-y divide-gray-100">
						{users && users.length > 0 ? (
							users.map((user) => {
								return (
									<tr key={user._id} className="font-light">
										<td className="p-4 text-gray-900 whitespace-nowrap">{user.fullname}</td>
										<td className="p-4 text-gray-900 whitespace-nowrap">{user.username}</td>
										<td className="p-4 text-gray-900 whitespace-nowrap">{user.email}</td>
										<td className="p-4 text-gray-900 whitespace-nowrap">{user.phone}</td>
										<td className="p-4 text-black/80 whitespace-nowrap">{dayjs(user.createdAt).format('DD/MM/YYYY')}</td>

										<td className="p-4 text-black/80 whitespace-nowrap">
											<span
												onClick={() => handleDeleteUser(user._id)}
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
									No user found
								</td>
							</tr>
						)}
					</tbody>
				</table>
			</div>
		</div>
	);
};

export default UserTable;

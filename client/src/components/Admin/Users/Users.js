import React, { createContext, useReducer } from 'react';
import Layout from '../Layout/Layout';
import { userReducer, userState } from './UserContext';
import UserTable from './UserTable';

export const UserContext = createContext();

const UserComponent = () => {
	return (
		<div className="p-8">
			<UserTable />
		</div>
	);
};

const Users = () => {
	const [data, dispatch] = useReducer(userReducer, userState);

	return (
		<UserContext.Provider value={{ data, dispatch }}>
			<Layout children={<UserComponent />} />
		</UserContext.Provider>
	);
};

export default Users;

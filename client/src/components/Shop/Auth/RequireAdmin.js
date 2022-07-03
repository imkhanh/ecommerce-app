import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { isAuth, isAdmin } from './Authentication';

const RequireAdmin = () => {
	if (isAuth() && isAdmin()) {
		return <Outlet />;
	} else {
		return <Navigate to="/" />;
	}
};

export default RequireAdmin;

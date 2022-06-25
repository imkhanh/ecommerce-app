import React from 'react';
import { useLocation, Outlet, Navigate } from 'react-router-dom';
import { isAuth, isAdmin } from './Auth';

const RequireAdmin = () => {
	const location = useLocation();

	if (isAuth() && isAdmin()) {
		return <Outlet />;
	} else {
		return <Navigate to="/" state={{ from: location }} />;
	}
};

export default RequireAdmin;

import React from 'react';
import { useLocation, Outlet, Navigate } from 'react-router-dom';
import { isAuth, isAdmin } from './Auth';

const RequireAuth = () => {
	const location = useLocation();

	if (!isAuth() || isAdmin()) {
		return <Navigate to="/" state={{ from: location }} />;
	}

	return <Outlet />;
};

export default RequireAuth;

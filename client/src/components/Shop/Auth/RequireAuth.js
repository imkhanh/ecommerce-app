import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { isAuth, isAdmin } from './Authentication';

const RequireAuth = () => {
	if (!isAuth() || isAdmin()) {
		return <Navigate to="/" />;
	} else {
		return <Outlet />;
	}
};

export default RequireAuth;

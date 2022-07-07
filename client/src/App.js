import React, { useReducer, Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
//
import { LayoutContext } from './components/Shop/Layout/Layout';
import { layoutState, layoutReducer } from './components/Shop/Layout/LayoutContext';

import RequireAuth from './components/Shop/Auth/RequireAuth';
import RequireAdmin from './components/Shop/Auth/RequireAdmin';

//Shop
const Home = lazy(() => import('./components/Shop/Home/Home'));
const Products = lazy(() => import('./components/Shop/Products/Products'));
const SingleProduct = lazy(() => import('./components/Shop/SingleProduct/SingleProduct'));
const Checkout = lazy(() => import('./components/Shop/Orders/Checkout'));
const UserProfile = lazy(() => import('./components/Shop/Dashboard/UserProfile'));
const UserWishList = lazy(() => import('./components/Shop/Dashboard/UserWishList'));
const UserChangePassword = lazy(() => import('./components/Shop/Dashboard/UserChangePassword'));
const UserOrder = lazy(() => import('./components/Shop/Dashboard/UserOrder'));

//Admin
const AdminDashboard = lazy(() => import('./components/Admin/Dashboard/AdminDashboard'));
const AdminProducts = lazy(() => import('./components/Admin/Products/AdminProducts'));
const AdminCategories = lazy(() => import('./components/Admin/Categories/AdminCategories'));
const AdminUsers = lazy(() => import('./components/Admin/Users/AdminUsers'));

const App = () => {
	const [state, dispatch] = useReducer(layoutReducer, layoutState);

	return (
		<LayoutContext.Provider value={{ state, dispatch }}>
			<BrowserRouter>
				<Suspense fallback={<div>Loading.....</div>}>
					<Routes>
						<Route path="/" element={<Home />} />
						<Route path="/products" element={<Products />} />
						<Route path="/product/detail/:id" element={<SingleProduct />} />

						<Route element={<RequireAuth />}>
							<Route path="/user/profile" element={<UserProfile />} />
							<Route path="/user/wish-list" element={<UserWishList />} />
							<Route path="/user/change-password" element={<UserChangePassword />} />
							<Route path="/user/orders" element={<UserOrder />} />
							<Route path="/checkout" element={<Checkout />} />
						</Route>
						<Route element={<RequireAdmin />}>
							<Route path="/admin/dashboard" element={<AdminDashboard />} />
							<Route path="/admin/products" element={<AdminProducts />} />
							<Route path="/admin/categories" element={<AdminCategories />} />
							<Route path="/admin/users" element={<AdminUsers />} />
						</Route>
					</Routes>
				</Suspense>
			</BrowserRouter>
		</LayoutContext.Provider>
	);
};

export default App;

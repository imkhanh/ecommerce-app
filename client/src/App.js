import React, { useReducer } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
//
import { LayoutContext } from './components/Shop/Layout/Layout';
import { layoutState, layoutReducer } from './components/Shop/Layout/LayoutContext';
//Shop
import Home from './components/Shop/Home/Home';
import Products from './components/Shop/Products/Products';
import SingleProduct from './components/Shop/SingleProduct/SingleProduct';
import UserProfile from './components/Shop/Dashboard/UserProfile';
import UserWishList from './components/Shop/Dashboard/UserWishList';
import UserChangePassword from './components/Shop/Dashboard/UserChangePassword';
import RequireAuth from './components/Shop/Auth/RequireAuth';
import RequireAdmin from './components/Shop/Auth/RequireAdmin';
//Admin
import AdminDashboard from './components/Admin/Dashboard/AdminDashboard';
import AdminProducts from './components/Admin/Products/AdminProducts';
import AdminCategories from './components/Admin/Categories/AdminCategories';
import AdminUsers from './components/Admin/Users/AdminUsers';

const App = () => {
	const [state, dispatch] = useReducer(layoutReducer, layoutState);

	return (
		<LayoutContext.Provider value={{ state, dispatch }}>
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/products" element={<Products />} />
					<Route path="/product/detail/:id" element={<SingleProduct />} />

					<Route element={<RequireAuth />}>
						<Route path="/user/profile" element={<UserProfile />} />
						<Route path="/user/wish-list" element={<UserWishList />} />
						<Route path="/user/change-password" element={<UserChangePassword />} />
					</Route>
					<Route element={<RequireAdmin />}>
						<Route path="/admin/dashboard" element={<AdminDashboard />} />
						<Route path="/admin/products" element={<AdminProducts />} />
						<Route path="/admin/categories" element={<AdminCategories />} />
						<Route path="/admin/users" element={<AdminUsers />} />
					</Route>
				</Routes>
			</BrowserRouter>
		</LayoutContext.Provider>
	);
};

export default App;

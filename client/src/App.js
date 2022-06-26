import React, { useReducer } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { layoutReducer, layoutState } from './components/Shop/Layout/LayoutContext';
import { LayoutContext } from './components/Shop/Layout/Layout';

//shop
import Home from './components/Shop/Home/Home';
import Products from './components/Shop/Products/Products';
import ProductByCategory from './components/Shop/Products/ProductByCategory';
import SingleProduct from './components/Shop/SingleProduct/SingleProduct';
import UserProfile from './components/Shop/Dashboard/UserProfile';
import UserChangePassword from './components/Shop/Dashboard/UserChangePassword';
import UserWishList from './components/Shop/Dashboard/UserWishList';
import RequireAuth from './components/Shop/Auth/RequireAuth';
import RequireAdmin from './components/Shop/Auth/RequireAdmin';

//admin
import AdminDashboard from './components/Admin/Dashboard/Dashboard';
import AdminProducts from './components/Admin/Products/Products';
import AdminCategories from './components/Admin/Categories/Categories';

const App = () => {
	const [data, dispatch] = useReducer(layoutReducer, layoutState);

	return (
		<LayoutContext.Provider value={{ data, dispatch }}>
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/products" element={<Products />} />
					<Route path="/product/detail/:id" element={<SingleProduct />} />
					<Route path="/product/category/:cateId" element={<ProductByCategory />} />

					<Route element={<RequireAuth />}>
						<Route path="/user/profile" element={<UserProfile />} />
						<Route path="/user/change-password" element={<UserChangePassword />} />
						<Route path="/user/wish-list" element={<UserWishList />} />
					</Route>

					<Route element={<RequireAdmin />}>
						<Route path="/admin/dashboard" element={<AdminDashboard />} />
						<Route path="/admin/products" element={<AdminProducts />} />
						<Route path="/admin/categories" element={<AdminCategories />} />
					</Route>
				</Routes>
			</BrowserRouter>
		</LayoutContext.Provider>
	);
};

export default App;

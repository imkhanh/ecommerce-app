import React, { createContext } from 'react';
import Header from './Header';
import Footer from './Footer';
import LoginRegisterModal from '../Auth/LoginRegisterModal';
import CartProduct from './CartProduct';

export const LayoutContext = createContext();

const Layout = ({ children }) => {
	return (
		<>
			<Header />
			<LoginRegisterModal />
			<CartProduct />
			<div>{children}</div>
			<Footer />
		</>
	);
};

export default Layout;
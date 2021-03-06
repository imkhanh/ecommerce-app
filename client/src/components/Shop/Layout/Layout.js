import React, { createContext } from 'react';
import AuthModal from '../Auth/AuthModal';
import CartProduct from './CartProduct';
import Footer from './Footer';
import Header from './Header';

export const LayoutContext = createContext();

const Layout = ({ children }) => {
	return (
		<>
			<Header />
			<AuthModal />
			<CartProduct />
			<main style={{ minHeight: 'calc(100vh)' }}>{children}</main>
			<Footer />
		</>
	);
};

export default Layout;

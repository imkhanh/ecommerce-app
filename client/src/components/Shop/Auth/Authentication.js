export const isAuth = () => (localStorage.getItem('jwt') ? JSON.parse(localStorage.getItem('jwt')) : false);

export const isAdmin = () => (localStorage.getItem('jwt') ? JSON.parse(localStorage.getItem('jwt')).user.role === 1 : false);

export const logout = () => {
	localStorage.removeItem('jwt');
	localStorage.removeItem('wish');
	localStorage.removeItem('cart');
	window.location.href = '/';
};

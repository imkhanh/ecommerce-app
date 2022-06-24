export const changeSlide = (type, images, currentImg, setCurrentImg) => {
	if (type === 'next') {
		if (currentImg < images.length - 1) {
			setCurrentImg(currentImg + 1);
		} else {
			setCurrentImg(0);
		}
	} else if (type === 'prev') {
		if (currentImg === 0) {
			setCurrentImg(images.length - 1);
		} else {
			setCurrentImg(currentImg - 1);
		}
	}
};

export const updateQuantity = (type, totalQuantity, quantity, setQuantity, setAlert) => {
	if (type === 'decrease') {
		if (quantity === 1) {
			setQuantity(1);
		} else {
			setQuantity(quantity - 1);
			setAlert(false);
		}
	} else if (type === 'increase') {
		if (quantity < totalQuantity) {
			setQuantity(quantity + 1);
		} else if (quantity === totalQuantity) {
			setAlert(true);
		}
	}
};

export const totalPrice = () => {
	let total = 0;
	const cart = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : [];

	if (cart.length > 0) {
		cart.forEach((item) => {
			total += item.quantity * item.price;
		});
		return total;
	}
};
export const subTotalPrice = (id, price) => {
	let total = 0;
	const cart = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : [];

	if (cart.length > 0) {
		cart.forEach((item) => {
			if (item.id === id) {
				total = item.quantity * price;
			}
		});
		return total;
	}
};
export const totalQuantity = (id) => {
	let total = 0;
	const cart = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : [];

	if (cart.length > 0) {
		cart.forEach((item) => {
			if (item.id === id) {
				total = item.quantity;
			}
		});
		return total;
	}
};

export const cartList = () => {
	const list = [];
	const cart = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : [];

	if (cart !== null) {
		for (const c of cart) {
			list.push(c.id);
			localStorage.setItem('cart', JSON.stringify(cart));
		}
		return list;
	} else {
		return list === null;
	}
};

export const inCart = (id) => {
	if (localStorage.getItem('cart')) {
		const cartProduct = JSON.parse(localStorage.getItem('cart'));
		for (const cart of cartProduct) {
			if (cart.id === id) {
				return true;
			}
		}
	}
};

export const addToCart = (id, price, quantity, setQuantity, dispatch, fetchData) => {
	let isObj = false;
	const cart = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : [];

	if (cart.length > 0) {
		cart.forEach((item) => {
			if (item.id === id) {
				isObj = true;
			}
		});
		if (!isObj) {
			cart.push({ id, quantity, price });
			localStorage.setItem('cart', JSON.stringify(cart));
		}
	} else {
		cart.push({ id, quantity, price });
		localStorage.setItem('cart', JSON.stringify(cart));
	}

	setQuantity(1);
	dispatch({ type: 'inCart', payload: cartList() });
	fetchData();
};

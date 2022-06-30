export const changeSlide = (type, currentImage, setCurrentImage, images) => {
	if (type === 'next') {
		if (currentImage === images.length - 1) {
			setCurrentImage(0);
		} else {
			setCurrentImage(currentImage + 1);
		}
	} else if (type === 'prev') {
		if (currentImage === 0) {
			setCurrentImage(images.length - 1);
		} else {
			setCurrentImage(currentImage - 1);
		}
	}
};

export const updateQuantity = (type, totalQuantity, quantity, setQuantity, setAlert) => {
	if (type === 'increase') {
		if (quantity < totalQuantity) {
			setQuantity(quantity + 1);
		} else if (quantity === totalQuantity) {
			setAlert(true);
		}
	} else if (type === 'decrease') {
		if (quantity === 1) {
			setQuantity(1);
		} else {
			setQuantity(quantity - 1);
			setAlert(false);
		}
	}
};

export const totalPrice = () => {
	let total = 0;
	const cart = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : [];

	cart.forEach((item) => {
		total += item.price * item.quantity;
	});
	return total;
};

export const subTotalPrice = (id, price) => {
	let total = 0;
	const cart = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : [];

	cart.forEach((item) => {
		if (item.id === id) {
			total = item.quantity * price;
		}
	});
	return total;
};

export const totalQuantity = (id) => {
	let total = 0;
	const cart = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : [];

	cart.forEach((item) => {
		if (item.id === id) {
			total = item.quantity;
		}
	});
	return total;
};

export const getType = (id) => {
	let type = '';
	const cart = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : [];

	cart.forEach((item) => {
		if (item.id === id) {
			type = `Color: ${item.color}` + ' - ' + `Size: ${item.size}`;
		}
	});
	return type;
};

export const cartList = () => {
	const list = [];
	const cart = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : [];

	if (cart !== null) {
		for (const c of cart) {
			list.push(c.id);
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
			return false;
		}
	}
};

export const addToCart = (id, price, size, color, quantity, setQuantity, setSize, setColor, dispatch, fetchData) => {
	let isObj = false;
	const cart = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : [];

	if (cart) {
		cart.forEach((item) => {
			if (item.id === id) {
				isObj = true;
			}
		});

		if (!isObj) {
			cart.push({ id, price, size, color, quantity });
			localStorage.setItem('cart', JSON.stringify(cart));
		}
	} else {
		cart.push({ id, price, size, color, quantity });
		localStorage.setItem('cart', JSON.stringify(cart));
	}

	setColor('');
	setSize('');
	setQuantity(1);

	dispatch({ type: 'inCart', payload: inCart() });
	fetchData();
};

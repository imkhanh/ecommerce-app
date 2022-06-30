export const isWish = (id, wishList) => {
	if (wishList !== null && wishList.includes(id)) {
		return true;
	} else {
		return false;
	}
};

export const addWishListProduct = (id, setWishList) => {
	const list = localStorage.getItem('wish') ? JSON.parse(localStorage.getItem('wish')) : [];

	if (list.length > 0) {
		if (!list.includes(id)) {
			list.push(id);
			setWishList(list);
			localStorage.setItem('wish', JSON.stringify(list));
		}
	} else {
		list.push(id);
		setWishList(list);
		localStorage.setItem('wish', JSON.stringify(list));
	}
};

export const removeWishListProduct = (id, setWishList) => {
	const list = localStorage.getItem('wish') ? JSON.parse(localStorage.getItem('wish')) : [];

	if (list.length > 0) {
		if (list.includes(id)) {
			setWishList(list);
			list.splice(list.indexOf(id), 1);
			localStorage.setItem('wish', JSON.stringify(list));
		}
	}
};

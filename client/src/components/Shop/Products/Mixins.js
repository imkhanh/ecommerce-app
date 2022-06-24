export const isWish = (id, wList) => {
	if (wList !== null && wList.includes(id)) {
		return true;
	}
};

export const addWishList = (id, setWList) => {
	const list = localStorage.getItem('wish') ? JSON.parse(localStorage.getItem('wish')) : [];

	if (list.length > 0) {
		if (!list.includes(id)) {
			list.push(id);
			setWList(list);
			localStorage.setItem('wish', JSON.stringify(list));
		}
	} else {
		list.push(id);
		setWList(list);
		localStorage.setItem('wish', JSON.stringify(list));
	}
};

export const removeWishList = (id, setWList) => {
	const list = localStorage.getItem('wish') ? JSON.parse(localStorage.getItem('wish')) : [];

	if (list.length > 0) {
		if (list.includes(id)) {
			list.splice(list.indexOf(id), 1);
			setWList(list);
			localStorage.setItem('wish', JSON.stringify(list));
		}
	}
};

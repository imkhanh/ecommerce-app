import React, { useContext, useEffect, useState } from 'react';
import { getAllCategories, getAllProduct, getProductByPrice, searchByName } from './FetchData';
import { useNavigate } from 'react-router-dom';
import { ProductContext } from './Products';
import { BsSearch } from 'react-icons/bs';

const SearchDropdown = () => {
	const { data, dispatch } = useContext(ProductContext);
	const [query, setQuery] = useState('');

	const handleChange = (e) => {
		setQuery(e.target.value);
	};

	useEffect(() => {
		fetchData();
		// eslint-disable-next-line
	}, [query]);

	const fetchData = async () => {
		if (!query) {
			try {
				const res = await getAllProduct();
				dispatch({ type: 'products', payload: res.products });
			} catch (error) {
				console.log(error);
			}
		} else {
			dispatch({ type: 'loading', payload: true });

			try {
				const res = await searchByName(query);
				dispatch({ type: 'products', payload: res.products });
				dispatch({ type: 'loading', payload: false });
			} catch (error) {
				console.log(error);
			}
		}
	};

	const handleClose = () => {
		setQuery('');
		dispatch({ type: 'searchDropdown', payload: false });
	};

	return (
		<div className={`${data.searchDropdown ? 'h-28 opacity-100 pointer-events-auto border-gray-200' : 'h-0 opacity-0 pointer-events-none border-white'} border-t transition-all duration-300 ease-in-out`}>
			<div className="py-4 flex items-start justify-between">
				<span className="block text-sm font-medium">Filter by search</span>
				<span onClick={handleClose} className="text-sm font-light text-black/50 underline cursor-pointer">
					Close
				</span>
			</div>
			<div className="relative">
				<span className="absolute top-1/2 left-2 transform -translate-y-1/2 text-black/50">
					<BsSearch />
				</span>
				<input type="text" placeholder="Search" value={query} onChange={handleChange} className="pl-10 text-sm w-full h-11 border-b border-black outline-none  focus:border-black/50 transition-colors" />
			</div>
		</div>
	);
};

const CategoryDropdown = () => {
	const { data, dispatch } = useContext(ProductContext);
	const [categories, setCategories] = useState([]);
	const navigate = useNavigate();

	useEffect(() => {
		const fetchData = async () => {
			try {
				const res = await getAllCategories();
				setCategories(res.categories);
			} catch (error) {
				console.log(error);
			}
		};

		fetchData();
		// eslint-disable-next-line
	}, []);

	const handleClose = () => {
		dispatch({ type: 'categoryDropdown', payload: false });
	};

	return (
		<div className={`${data.categoryDropdown ? 'h-28 opacity-100 pointer-events-auto border-gray-200' : 'h-0 opacity-0 pointer-events-none border-white'} border-t transition-all duration-300 ease-in-out`}>
			<div className="py-4 flex items-start justify-between">
				<span className="text-sm font-medium">Filter by category</span>
				<span onClick={handleClose} className="text-sm font-light text-black/50 underline cursor-pointer">
					Close
				</span>
			</div>
			<div className="flex flex-wrap  overflow-x-auto">
				{categories.length > 0 ? (
					categories.map((item) => {
						return (
							<span onClick={() => navigate(`/product/category/${item._id}`)} key={item._id} className="px-4 py-[6px] rounded-full bg-gray-50 text-sm text-black border border-gray-200 hover:bg-black hover:text-white cursor-pointer transition-colors">
								{item.name}
							</span>
						);
					})
				) : (
					<div>No category found</div>
				)}
			</div>
		</div>
	);
};

const PriceDropdown = () => {
	const { data, dispatch } = useContext(ProductContext);
	const [range, setRange] = useState(0);

	const handleChange = (e) => {
		setRange(e.target.value);
		fetchData(e.target.value);
	};

	const fetchData = async (price) => {
		if (price === 'all') {
			try {
				const res = await getAllProduct();
				dispatch({ type: 'products', payload: res.products });
			} catch (error) {
				console.log(error);
			}
		} else {
			dispatch({ type: 'loading', payload: true });

			try {
				const res = await getProductByPrice(price);
				console.log(res);
				dispatch({ type: 'products', payload: res.products });
				dispatch({ type: 'loading', payload: false });
			} catch (error) {
				console.log(error);
			}
		}
	};

	const handleClose = () => {
		fetchData('all');
		setRange(0);
		dispatch({ type: 'priceDropdown', payload: false });
	};

	return (
		<div className={`${data.priceDropdown ? 'h-28 opacity-100 pointer-events-auto border-gray-200' : 'h-0 opacity-0 pointer-events-none border-white'} border-t transition-all duration-300 ease-in-out`}>
			<div className="py-4 flex items-start justify-between">
				<div>
					<span className="block text-sm font-medium">Filter by price</span>
					<span className="block text-sm text-black/50 font-light">Price (between 0 and 10$) : ${range}.00</span>
				</div>
				<span onClick={handleClose} className="text-sm font-light text-black/50 underline cursor-pointer">
					Close
				</span>
			</div>

			<input type="range" name="range" value={range} className="w-full cursor-pointer" min="0" max="1000" step="1" onChange={handleChange} />
		</div>
	);
};

const ProductMenuDropdown = () => {
	return (
		<>
			<SearchDropdown />
			<CategoryDropdown />
			<PriceDropdown />
		</>
	);
};

export default ProductMenuDropdown;

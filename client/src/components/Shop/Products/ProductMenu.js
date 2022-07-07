import React, { useContext, useEffect } from 'react';
import { BsChevronRight, BsSearch } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import { getAllCategories } from './FetchData';
import { ProductContext } from './Products';

const ProductMenu = ({ category, setCategory, search, setSearch, sort, setSort }) => {
	const { state, dispatch } = useContext(ProductContext);
	const { categories } = state;

	useEffect(() => {
		const fetchData = async () => {
			try {
				const res = await getAllCategories();
				dispatch({ type: 'categories', payload: res.categories });
			} catch (error) {}
		};

		fetchData();
		// eslint-disable-next-line
	}, []);

	const handleChangeCategory = (e) => {
		setCategory(e.target.value);
		setSearch('');
	};

	return (
		<div className="mb-8 h-16 sticky top-14 bg-white border-b border-black/10 grid grid-cols-2 z-10">
			<div className="md:hidden col-span-1  flex items-center space-x-2">
				<Link to="/" className="text-sm font-light text-black/50">
					Home
				</Link>
				<span className="text-sm text-black/50">
					<BsChevronRight />
				</span>
				<span className="text-sm text-black cursor-pointer">Have {state.products && state.products.length} products</span>
			</div>

			<div className="col-span-1 md:col-span-2 grid grid-cols-3 items-center gap-4">
				<div className="relative">
					<span className="absolute top-1/2 left-2 transform -translate-y-1/2">
						<BsSearch />
					</span>
					<input type="text" name="title" value={search} onChange={(e) => setSearch(e.target.value)} className="pl-10 w-full h-8 text-sm border-b border-black outline-none" placeholder="Search" />
				</div>
				<select value={category} onChange={handleChangeCategory} className="w-full h-8 text-sm border-b border-black outline-none">
					<option value="">Categoreis</option>
					{categories &&
						categories.map((item) => {
							return (
								<option key={item._id} value={'category=' + item._id}>
									{item.title}
								</option>
							);
						})}
				</select>
				<select value={sort} onChange={(e) => setSort(e.target.value)} className="w-full h-8 text-sm border-b border-black outline-none">
					<option value="">Sort by</option>
					<option value="sort=oldest">Oldest</option>
					<option value="sort=-sold">Best sales</option>
					<option value="sort=-price">Price: Hight-Low</option>
					<option value="sort=price">Price: Low-Hight</option>
				</select>
			</div>
		</div>
	);
};

export default ProductMenu;

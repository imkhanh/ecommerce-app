import React, { useContext, useEffect, useState } from 'react';
import { getAllCategories, postAddProduct } from './FetchData';
import { ProductContext } from './Products';

const AddProductModal = () => {
	const { data, dispatch } = useContext(ProductContext);
	const [categories, setCategories] = useState([]);
	const [state, setState] = useState({ name: '', description: '', category: '', price: 0, quantity: 0, offer: '', status: 'Active', images: null, error: '', success: '' });

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

	const alert = (type, msg) => {
		return <div className={`p-3 text-sm bg-${type}-50 text-${type}-500 rounded-sm`}>{msg}</div>;
	};

	if (state.error || state.success) {
		setTimeout(() => {
			setState({ ...state, name: '', description: '', category: '', price: 0, quantity: 0, offer: '', status: '', images: null, success: false, error: false });
		}, 2000);
	}

	const handleChange = (e) => {
		const { name, value } = e.target;
		setState({ ...state, [name]: value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		e.target.reset();

		try {
			const res = await postAddProduct(state);
			if (res && res.success) {
				setState({ ...state, name: '', description: '', category: '', price: 0, quantity: 0, offer: '', status: '', images: null, success: res.success, error: false });
			} else {
				setState({ ...state, name: '', description: '', category: '', price: 0, quantity: 0, offer: '', status: '', images: null, success: false, error: res.error });
			}
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<div>
			<div
				onClick={() => dispatch({ type: 'addProductModal', payload: false })}
				className={`${data.addProductModal ? '' : 'hidden'} fixed inset-0 bg-black opacity-30 z-10`}
			></div>
			<div className={`${data.addProductModal ? '' : 'hidden'} fixed top-16 left-1/2 transform -translate-x-1/2 bg-white max-w-md w-full rounded-sm shadow-lg z-30`}>
				<div className="h-16 flex items-center justify-center">
					<h4 className="uppercase font-bold text-lg text-black">Add Product</h4>
				</div>

				<form onSubmit={handleSubmit} className="p-8 space-y-4">
					{state.error && alert('red', state.error)}
					{state.success && alert('green', state.success)}

					<div>
						<label className="mb-1 block text-sm">Name</label>
						<input
							type="text"
							name="name"
							value={state.name}
							onChange={handleChange}
							className="text-sm px-3 w-full h-10 outline-none border border-gray-200 rounded-sm focus:border-black"
						/>
					</div>
					<div>
						<label className="mb-1 block text-sm">Description</label>
						<textarea
							type="text"
							name="description"
							value={state.description}
							onChange={handleChange}
							rows={4}
							className="text-sm pt-2 px-3 w-full outline-none border border-gray-200 rounded-sm focus:border-black"
						/>
					</div>
					<div>
						<label className="mb-1 block text-sm">Categories</label>
						<select
							name="category"
							value={state.category}
							onChange={handleChange}
							className="text-sm px-3 w-full h-10 bg-white outline-none border border-gray-200 rounded-sm focus:border-black"
						>
							<option>Categories</option>
							{categories.map((item) => {
								return (
									<option key={item._id} value={item._id}>
										{item.name}
									</option>
								);
							})}
						</select>
					</div>
					<div className="grid grid-cols-2 gap-3">
						<div className="col-span-1">
							<label className="mb-1 block text-sm">Price ($)</label>
							<input
								type="text"
								name="price"
								value={state.price}
								onChange={handleChange}
								className="text-sm px-3 w-full h-10 outline-none border border-gray-200 rounded-sm focus:border-black"
							/>
						</div>
						<div className="col-span-1">
							<label className="mb-1 block text-sm">Offer (%)</label>
							<input
								type="text"
								name="offer"
								value={state.offer}
								onChange={handleChange}
								className="text-sm px-3 w-full h-10 outline-none border border-gray-200 rounded-sm focus:border-black"
							/>
						</div>
					</div>
					<div className="grid grid-cols-2 gap-3">
						<div className="col-span-1">
							<label className="mb-1 block text-sm">Quantity</label>
							<input
								type="text"
								name="quantity"
								value={state.quantity}
								onChange={handleChange}
								className="text-sm px-3 w-full h-10 outline-none border border-gray-200 rounded-sm focus:border-black"
							/>
						</div>
						<div className="col-span-1">
							<label className="mb-1 block text-sm">Status</label>
							<input
								type="text"
								name="status"
								value={state.status}
								onChange={handleChange}
								className="text-sm px-3 w-full h-10 outline-none border border-gray-200 rounded-sm focus:border-black"
							/>
						</div>
					</div>
					<div>
						<label className="mb-1 block text-sm">Images</label>
						<input
							type="file"
							onChange={(e) => setState({ ...state, images: [...e.target.files] })}
							className="text-sm px-3 w-full h-10 outline-none border border-gray-200 rounded-sm focus:border-black"
						/>
					</div>
					<button type="submit" className="w-full h-10 bg-black text-white rounded-sm">
						Add
					</button>
				</form>
			</div>
		</div>
	);
};

export default AddProductModal;

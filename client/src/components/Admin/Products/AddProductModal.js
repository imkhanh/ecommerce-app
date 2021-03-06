import React, { useState, useContext, useEffect } from 'react';
import { AdminProductContext } from './AdminProducts';
import { postAddProduct, getAllCategories } from './FetchData';

const AddProductModal = () => {
	const { state, dispatch } = useContext(AdminProductContext);
	const [form, setForm] = useState({ title: '', description: '', category: '', status: 'New', quantity: '', discount: '', price: '', images: null, success: '', error: '' });
	const [categories, setCategories] = useState([]);

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
	}, []);

	const alert = (color, msg) => {
		return <div className={`px-4 h-10 flex items-center text-sm border-l-2 border-${color}-700 bg-${color}-100 text-${color}-700`}>{msg}</div>;
	};

	if (form.success || form.error) {
		setTimeout(() => {
			setForm({ ...form, title: '', description: '', category: '', status: 'New', quantity: '', discount: '', price: '', images: null, success: false, error: false });
		}, 2000);
	}

	const handleChange = (e) => {
		const { name, value } = e.target;
		setForm({ ...form, [name]: value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		if (form.images < 1) {
			setForm({ ...form, title: '', description: '', category: '', status: 'New', quantity: '', discount: '', price: '', images: null, success: false, error: 'Must need to provide 2 images' });
		}

		try {
			const res = await postAddProduct(form);
			console.log(res);
			if (res && res.success) {
				setForm({ ...form, title: '', description: '', category: '', status: 'New', quantity: '', discount: '', price: '', images: null, success: res.success, error: false });
			} else {
				setForm({ ...form, title: '', description: '', category: '', status: 'New', quantity: '', discount: '', price: '', images: null, success: false, error: res.error });
			}
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<div>
			<div onClick={() => dispatch({ type: 'addProductModal', payload: false })} className={`${state.addProductModal ? '' : 'hidden'} fixed inset-0 bg-black opacity-50 z-20`}></div>
			<div className={`${state.addProductModal ? '' : 'hidden'} fixed top-10 left-1/2 max-w-lg w-full h-auto bg-white rounded-[3px] shadow-lg transform -translate-x-1/2 z-30`}>
				<div className="py-6 flex items-center justify-center">
					<h1 className="text-black font-bold uppercase">Add Product</h1>
				</div>

				<form onSubmit={handleSubmit} className="pb-8 px-8 space-y-4">
					{form.error && alert('red', form.error)}
					{form.success && alert('green', form.success)}

					<div>
						<label className="block mb-1 text-sm">Title</label>
						<input type="text" name="title" value={form.title} onChange={handleChange} className="px-4 text-sm w-full h-10 outline-none border border-gray-200 focus:border-black rounded-[3px]" />
					</div>
					<div>
						<label className="block mb-1 text-sm">Description</label>
						<textarea type="text" name="description" rows={5} value={form.description} onChange={handleChange} className="py-2 px-4 text-sm w-full h-auto outline-none border border-gray-200 focus:border-black rounded-[3px]" />
					</div>
					<div>
						<label className="block mb-1 text-sm">Category</label>
						<select type="text" name="category" value={form.category} onChange={handleChange} className="px-4 text-sm w-full h-10 outline-none border border-gray-200 focus:border-black rounded-[3px]">
							<option disabled value="">
								Select a category
							</option>
							{categories.map((item) => {
								return (
									<option key={item._id} value={item._id}>
										{item.title}
									</option>
								);
							})}
						</select>
					</div>
					<div className="grid grid-cols-2 gap-x-3">
						<div>
							<label className="block mb-1 text-sm">Price ($)</label>
							<input type="text" name="price" value={form.price} onChange={handleChange} className="px-4 text-sm w-full h-10 outline-none border border-gray-200 focus:border-black rounded-[3px]" />
						</div>
						<div>
							<label className="block mb-1 text-sm">Discount (%)</label>
							<input type="text" name="discount" value={form.discount} onChange={handleChange} className="px-4 text-sm w-full h-10 outline-none border border-gray-200 focus:border-black rounded-[3px]" />
						</div>
					</div>
					<div className="grid grid-cols-2 gap-x-3">
						<div>
							<label className="block mb-1 text-sm">Quantity</label>
							<input type="text" name="quantity" value={form.quantity} onChange={handleChange} className="px-4 text-sm w-full h-10 outline-none border border-gray-200 focus:border-black rounded-[3px]" />
						</div>
						<div>
							<label className="block mb-1 text-sm">Status</label>
							<input type="text" name="status" value={form.status} onChange={handleChange} className="px-4 text-sm w-full h-10 outline-none border border-gray-200 focus:border-black rounded-[3px]" />
						</div>
					</div>
					<div>
						<label className="block mb-1 text-sm">Images</label>
						<input type="file" multiple onChange={(e) => setForm({ ...form, images: [...e.target.files] })} className="px-4 text-sm w-full h-10 outline-none border border-gray-200 focus:border-black rounded-[3px]" />
					</div>
					<button type="submit" className="w-full h-10 bg-black text-white text-sm font-medium rounded-[3px]">
						Add
					</button>
				</form>
			</div>
		</div>
	);
};

export default AddProductModal;

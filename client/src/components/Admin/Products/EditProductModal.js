import React, { useState, useContext, useEffect, Fragment } from 'react';
import { AdminProductContext } from './AdminProducts';
import { getAllCategories, patchEditProduct } from './FetchData';

const EditProductModal = () => {
	const { state, dispatch } = useContext(AdminProductContext);
	const [form, setForm] = useState({ id: '', title: '', description: '', category: '', status: 'New', quantity: '', discount: '', price: '', images: null, editImages: null, success: '', error: '' });
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

	useEffect(() => {
		setForm({
			...form,
			id: state.editProductModal.id,
			title: state.editProductModal.title,
			description: state.editProductModal.description,
			category: state.editProductModal.category,
			status: state.editProductModal.status,
			price: state.editProductModal.price,
			quantity: state.editProductModal.quantity,
			discount: state.editProductModal.discount || '',
			images: state.editProductModal.images,
		});

		// eslint-disable-next-line
	}, [state.editProductModal]);

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

		if (form.editImages < 1) {
			setForm({ ...form, title: '', description: '', category: '', status: 'New', quantity: '', discount: '', price: '', images: null, success: false, error: 'Must need to provide 2 images' });
		}

		try {
			const res = await patchEditProduct(form);
			if (res && res.success) {
				setForm({ ...form, title: '', description: '', category: '', status: 'New', quantity: '', discount: '', price: '', images: null, editImages: null, success: res.success, error: false });
			} else {
				setForm({ ...form, success: false, error: res.error });
			}
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<div>
			<div onClick={() => dispatch({ type: 'editProductModalClose', payload: false })} className={`${state.editProductModal.modal ? '' : 'hidden'} fixed inset-0 bg-black opacity-50 z-20`}></div>
			<div className={`${state.editProductModal.modal ? '' : 'hidden'} fixed top-8 left-1/2 max-w-lg w-full h-auto bg-white rounded-[3px] shadow-lg transform -translate-x-1/2 z-30`}>
				<div className="py-6 flex items-center justify-center">
					<h1 className="text-black font-bold uppercase">Edit Product</h1>
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
									<Fragment key={item._id}>
										{form.category._id && form.category._id === item._id ? (
											<option key={item._id} value={item._id}>
												{item.title}
											</option>
										) : (
											<option key={item._id} value={item._id}>
												{item.title}
											</option>
										)}
									</Fragment>
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
						<div className="mb-3 flex space-x-2 overflow-x-auto">
							{form.images &&
								form.images.map((img, index) => {
									return <img key={index} src={`http://localhost:3000/uploads/products/${img}`} alt={index} className="w-14 h-14 object-contain border border-black/10 rounded-[3px]" />;
								})}
						</div>
						<input type="file" multiple onChange={(e) => setForm({ ...form, editImages: [...e.target.files] })} className="px-4 text-sm w-full h-10 outline-none border border-gray-200 focus:border-black rounded-[3px]" />
					</div>
					<button type="submit" className="w-full h-10 bg-black text-white text-sm font-medium rounded-[3px]">
						Edit
					</button>
				</form>
			</div>
		</div>
	);
};

export default EditProductModal;

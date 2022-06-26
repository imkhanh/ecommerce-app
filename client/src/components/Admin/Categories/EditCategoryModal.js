import React, { useContext, useState } from 'react';
import { CategoryContext } from './Categories';
import { postAddCategory } from './FetchData';

const EditCategoryModal = () => {
	const { data, dispatch } = useContext(CategoryContext);
	const [state, setState] = useState({ name: '', description: '', status: 'Active', error: '', success: '' });

	const alert = (type, msg) => {
		return <div className={`p-3 text-sm bg-${type}-50 text-${type}-500 rounded-sm`}>{msg}</div>;
	};

	if (state.error || state.success) {
		setTimeout(() => {
			setState({ ...state, name: '', description: '', status: '', success: false, error: false });
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
			const res = await postAddCategory(state);

			if (res && res.success) {
				setState({ ...state, name: '', description: '', status: '', success: res.success, error: false });
				dispatch({ type: 'addCategoryModal', payload: false });
			} else {
				setState({ ...state, name: '', description: '', status: '', success: false, error: res.success });
			}
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<div>
			<div
				onClick={() => dispatch({ type: 'addCategoryModal', payload: false })}
				className={`${data.addCategoryModal ? '' : 'hidden'} fixed inset-0 bg-black opacity-30 z-10`}
			></div>
			<div className={`${data.addCategoryModal ? '' : 'hidden'} fixed top-16 left-1/2 transform -translate-x-1/2 bg-white max-w-md w-full rounded-sm shadow-lg z-30`}>
				<div className="h-16 flex items-center justify-center">
					<h4 className="uppercase font-bold text-lg text-black">Edit Category</h4>
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
						<label className="mb-1 block text-sm">Status</label>
						<input
							type="text"
							name="status"
							value={state.status}
							onChange={handleChange}
							className="text-sm px-3 w-full h-10 outline-none border border-gray-200 rounded-sm focus:border-black"
						/>
					</div>

					<button type="submit" className="w-full h-10 bg-black text-white rounded-sm">
						Edit
					</button>
				</form>
			</div>
		</div>
	);
};

export default EditCategoryModal;

import React, { useContext } from 'react';
import { BsPlusCircleDotted } from 'react-icons/bs';
import AddCategoryModal from './AddCategoryModal';
// import EditCategoryModal from './EditCategoryModal';
import { CategoryContext } from './Categories';

const CategoryMenu = () => {
	const { dispatch } = useContext(CategoryContext);

	return (
		<div className="py-2">
			<button onClick={() => dispatch({ type: 'addCategoryModal', payload: true })} className="px-4 py-2 bg-black text-white rounded-full flex items-center">
				<BsPlusCircleDotted />
				<span className="ml-3 text-sm">Add Category</span>
			</button>

			<AddCategoryModal />
			{/* <EditCategoryModal /> */}
		</div>
	);
};

export default CategoryMenu;

import React, { useContext } from 'react';
import { BsPlusCircleDotted } from 'react-icons/bs';
import AddCategoryModal from './AddCategoryModal';
import EditCategoryModal from './EditCategoryModal';
import { AdminCategoryContext } from './AdminCategories';

const ProductHeader = () => {
	const { dispatch } = useContext(AdminCategoryContext);

	return (
		<div>
			<button onClick={() => dispatch({ type: 'addCategoryModal', payload: true })} className="py-2 px-4 rounded-full flex items-center justify-center bg-black text-white">
				<BsPlusCircleDotted className="text-xl" />
				<span className="ml-2 text-sm">Add category</span>
			</button>
			<AddCategoryModal />
			<EditCategoryModal />
		</div>
	);
};

export default ProductHeader;

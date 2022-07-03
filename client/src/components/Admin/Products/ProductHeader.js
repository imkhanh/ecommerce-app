import React, { useContext } from 'react';
import { BsPlusCircleDotted } from 'react-icons/bs';
import { AdminProductContext } from './AdminProducts';
import AddProductModal from './AddProductModal';
import EditProductModal from './EditProductModal';

const ProductHeader = () => {
	const { dispatch } = useContext(AdminProductContext);

	return (
		<div>
			<button onClick={() => dispatch({ type: 'addProductModal', payload: true })} className="py-2 px-4 rounded-full flex items-center justify-center bg-black text-white">
				<BsPlusCircleDotted className="text-xl" />
				<span className="ml-2 text-sm">Add product</span>
			</button>

			<AddProductModal />
			<EditProductModal />
		</div>
	);
};

export default ProductHeader;

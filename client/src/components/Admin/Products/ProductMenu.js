import React, { useContext } from 'react';
import { BsPlusCircleDotted } from 'react-icons/bs';
import { ProductContext } from './Products';
import AddProductModal from './AddProductModal';
import EditProductModal from './EditProductModal';

const ProductMenu = () => {
	const { dispatch } = useContext(ProductContext);

	return (
		<div className="py-2">
			<button onClick={() => dispatch({ type: 'addProductModal', payload: true })} className="px-4 py-2 bg-black text-white rounded-full flex items-center">
				<BsPlusCircleDotted />
				<span className="ml-3 text-sm">Add Product</span>
			</button>

			<AddProductModal />
			<EditProductModal />
		</div>
	);
};

export default ProductMenu;

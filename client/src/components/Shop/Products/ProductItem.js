import React from 'react';
import { Link } from 'react-router-dom';

const ProductItem = ({ product }) => {
	return (
		<div className="bg-white relative">
			<figure>
				<Link to={`/product/detail/${product._id}`}>
					<img src={`http://localhost:3000/uploads/products/${product.images[0]}`} alt={product.name} className="w-full h-[340px] object-cover" />
				</Link>
			</figure>
			<div className="pt-4 text-center">
				<Link to={`/product/detail/${product._id}`} className="text-black">
					{product.name}
				</Link>
				<p className="mt-2 text-black/50">{product.category.name}</p>
				<p className="text-black">$ {product.price}</p>
			</div>
		</div>
	);
};

export default ProductItem;

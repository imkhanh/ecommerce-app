import React from 'react';
import { useNavigate } from 'react-router-dom';
import { subTotalPrice, totalPrice, totalQuantity } from '../SingleProduct/Minxins';

const CheckoutProducts = ({ products }) => {
	const navigate = useNavigate();

	return (
		<div>
			<div className="mb-4">
				<ul className="divide-y divide-gray-200">
					{products && products.length > 0 ? (
						products.map((product) => {
							return (
								<li key={product._id} className="py-4 flex justify-between">
									<div className="flex items-start">
										<img
											onClick={() => navigate(`/product/detail/${product._id}`)}
											className="flex-shrink-0 object-cover w-24 h-28 rounded-[3px] cursor-pointer border border-black/10"
											src={`http://localhost:3000/uploads/products/${product.images[0]}`}
											alt={product.name}
										/>
										<div className="ml-4">
											<p className="text-sm font-medium">{product.title}</p>
											<div className="mt-1 flex flex-col space-y-1 text-sm text-gray-500">
												<p>Category: {product.category.title}</p>
												<p>Price: ${product.price_discount !== null ? product.price_discount : product.price}</p>
												<p>Quantity: {totalQuantity(product._id)}</p>
											</div>
										</div>
									</div>
									<div>
										<p className="font-semibold">$ {subTotalPrice(product._id, product.price_discount)}</p>
									</div>
								</li>
							);
						})
					) : (
						<li>
							<div>No product found for checkout</div>
						</li>
					)}
				</ul>
			</div>
			<div className="py-4 border-t border-gray-200 flex items-center justify-between">
				<p className="text-black/50">Total price</p>
				<p className="text-xl font-semibold tracking-tight">$ {totalPrice()}</p>
			</div>
		</div>
	);
};

export default CheckoutProducts;

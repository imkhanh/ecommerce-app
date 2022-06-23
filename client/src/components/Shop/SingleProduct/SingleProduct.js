import React, { useContext, useEffect } from 'react';
import Layout, { LayoutContext } from '../Layout/Layout';
import { useParams } from 'react-router-dom';
import { getSingleProduct } from './FetchData';

const SingleProductComponent = () => {
	const { id } = useParams();
	const { data, dispatch } = useContext(LayoutContext);

	const product = data.singleProduct;

	useEffect(() => {
		fetchData();

		// eslint-disable-next-line
	}, []);

	const fetchData = async () => {
		try {
			const res = await getSingleProduct(id);
			if (res && res.product) {
				dispatch({ type: 'singleProduct', payload: res.product });
			}
		} catch (error) {
			console.log(error);
		}
	};

	if (data.loading) {
		return <div>Loading</div>;
	} else if (!product) {
		return <div>No product found</div>;
	}

	return (
		<section className="px-8 md:px-4 py-12 md:py-8 max-w-[70rem] mx-auto w-full">
			<div>
				<div>1</div>
				<div>1</div>
			</div>
		</section>
	);
};

const SingleProduct = () => {
	return <Layout children={<SingleProductComponent />} />;
};

export default SingleProduct;

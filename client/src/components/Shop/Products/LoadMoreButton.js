import React from 'react';

const LoadMoreButton = ({ products, page, setPage }) => {
	return (
		<div className="my-24 flex items-center justify-center">
			{products && products.length < page * 6 ? (
				''
			) : (
				<button onClick={() => setPage(page + 1)} className="px-4 py-2 border border-black text-sm">
					Load more
				</button>
			)}
		</div>
	);
};

export default LoadMoreButton;

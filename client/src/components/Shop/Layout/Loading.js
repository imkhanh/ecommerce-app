import React from 'react';
import './style.css';

const Loading = () => {
	return (
		<div className="fixed inset-0 w-full h-full bg-white z-30">
			<div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
				<div className="lds-spinner">
					<div></div>
					<div></div>
					<div></div>
					<div></div>
					<div></div>
					<div></div>
					<div></div>
					<div></div>
					<div></div>
					<div></div>
					<div></div>
					<div></div>
				</div>
			</div>
		</div>
	);
};

export default Loading;

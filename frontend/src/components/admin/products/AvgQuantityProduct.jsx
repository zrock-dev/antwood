'use client';

import { useRef, useState } from 'react';

const AvgQuantityProduct = ({ sneakerId }) => {
	const cardQuantity = useRef(null);
	const [quantityInfo, setQuantityInfo] = useState(null);

	const loadData = () => {
		if (
			cardQuantity &&
			cardQuantity.current.style.display !== 'none' &&
			!quantityInfo
		) {
			console.log(`loading sneaker ${sneakerId}`);
			setQuantityInfo(['some data for now']);
		}
	};

	return (
		<div
			ref={cardQuantity}
			onMouseOver={loadData}
			className="product-card-quantity-info"
		>
			{quantityInfo ? (
				<div></div>
			) : (
				<div className="loader-container">
					<div className="loader white"></div>
				</div>
			)}
		</div>
	);
};

export default AvgQuantityProduct;

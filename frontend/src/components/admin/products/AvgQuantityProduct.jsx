'use client';
import { getSneakerQuantityInformation } from '@/requests/SneakersRequest';
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
			getSneakerQuantityInformation(sneakerId)
				.then((data) => {
					setQuantityInfo(data);
				})
				.catch((e) => {
					console.log(e);
				});
		}
	};

	return (
		<div
			ref={cardQuantity}
			onMouseOver={loadData}
			className="product-card-quantity-main-container"
		>
			{quantityInfo ? (
				<div className="product-card-quantity-info-container">
					<div className="products-card-quantity-info">
						<b>
							<b>Color</b>
							<b>Name</b>
						</b>
						<b>
							<b>Average</b>
							<b>Quantity</b>
						</b>
					</div>
					<span className="horizontal-separator"></span>
					{quantityInfo.map((quantity, index) => (
						<div className="products-card-quantity-info" key={index}>
							<span>{quantity.color}</span>
							<span>{parseInt(quantity.avgQuantity)}</span>
						</div>
					))}
				</div>
			) : (
				<div className="loader-container">
					<div className="loader white"></div>
				</div>
			)}
		</div>
	);
};

export default AvgQuantityProduct;

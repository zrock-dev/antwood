import ChevronDown from '@/icons/ChevronDown';

const QuantityRenderer = ({ quantity, amount, onChange }) => {
	let sizes = [];

	for (let index = 1; index < quantity + 1; index++) {
		sizes.push(index);
	}

	return (
		<button className="cart-sneaker-amount">
			<div className="cart-sneaker-amount-sizes">
				{sizes.map((size, index) => (
					<button
						className="sneaker-size to-sizes"
						key={index}
						onClick={() => onChange(size)}
					>
						{size}
					</button>
				))}
			</div>
			{amount} <ChevronDown />
		</button>
	);
};

export default QuantityRenderer;

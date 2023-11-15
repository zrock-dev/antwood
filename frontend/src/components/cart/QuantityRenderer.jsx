import ChevronDown from '@/icons/ChevronDown';
import { useState, useRef, useEffect } from 'react';

const QuantityRenderer = ({ quantity, amount, onChange }) => {
	const [isOpen, setOpen] = useState(false);
	const quantityButton = useRef();

	let sizes = [];
	for (let index = 1; index < quantity + 1; index++) {
		sizes.push(index);
	}

	const setAmount = (size) => {
		onChange(size);
		setOpen(false);
	};

	useEffect(() => {
		if (isOpen) {
			document.body.style.overflow = 'hidden';
		} else {
			document.body.style.overflow = 'auto';
		}
	}, [isOpen]);

	useEffect(() => {
		let onClickHandler = (e) => {
			if (
				quantityButton.current &&
				!quantityButton.current.contains(e.target)
			) {
				setOpen(false);
			}
		};

		document.addEventListener('mousedown', onClickHandler);
		return () => {
			document.removeEventListener('mousedown', onClickHandler);
		};
	}, []);

	return (
		<button
			name="quantity-button"
			className="cart-sneaker-amount"
			onClick={() => setOpen(!isOpen)}
			ref={quantityButton}
		>
			{isOpen && (
				<div className="cart-sneaker-amount-sizes">
					{sizes.map((size, index) => (
						<button
							className="sneaker-size to-sizes"
							key={index}
							onClick={() => setAmount(size)}
						>
							{size}
						</button>
					))}
				</div>
			)}
			{amount} <ChevronDown />
		</button>
	);
};

export default QuantityRenderer;

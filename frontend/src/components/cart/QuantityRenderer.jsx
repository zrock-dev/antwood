import ChevronDown from '@/icons/ChevronDown';
import { useState, useRef, useEffect } from 'react';

const QuantityRenderer = ({
	text = '',
	quantityAvailable,
	amount,
	onChange,
	style = 'cart-sneaker-amount'
}) => {
	const [isOpen, setOpen] = useState(false);
	const quantityButton = useRef();
	const quantity = quantityAvailable > 10 ? 10 : quantityAvailable;

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
			quantityButton?.current.classList.add('active');
		} else {
			quantityButton?.current.classList.remove('active');
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
		<div
			name="quantity-button"
			className={style}
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
			{text} {amount} <ChevronDown />
		</div>
	);
};

export default QuantityRenderer;

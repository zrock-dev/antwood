'use client';
import Modal from '@/components/Modal';
import Link from 'next/link';
import { useState } from 'react';
import DeleteSneakerConfirmation from '../deletion_confirmation/DeleteSneakerConfirmation';

const AdminProductCard = ({ product }) => {
	const [isOpen, setOpen] = useState(false);

	return (
		<div className="product-card-container space">
			<div className="product-card-image">
				{product.colors.length > 0 ? (
					<img src={product.types[0].images[0].url} alt="" />
				) : (
					<b>
						<b>Without</b>
						<b>colors</b>
					</b>
				)}
			</div>
			<span className="product-card-name margin-top-15">{product.name}</span>
			<div className="product-card-buttons margin-top-15">
				<Link
					href={`/admin/product/${product._id}`}
					className="product-card-button general-button white"
				>
					Edit
				</Link>
				<button
					onClick={() => setOpen(true)}
					className="product-card-button general-button gray"
				>
					Delete
				</button>
				<Modal isModalOpen={isOpen} setModalOpen={setOpen}>
					<DeleteSneakerConfirmation
						id={product.id}
						sneakerName={product.name}
						closeConfirmation={() => setOpen(false)}
					/>
				</Modal>
			</div>
		</div>
	);
};

export default AdminProductCard;

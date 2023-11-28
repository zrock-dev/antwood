'use client';
import Modal from '@/components/Modal';
import Link from 'next/link';
import { useState } from 'react';
import DeleteSneakerConfirmation from '../confirmations/DeleteSneakerConfirmation';
import AvgQuantityProduct from './AvgQuantityProduct';

const AdminProductCard = ({ product }) => {
	const [isOpen, setOpen] = useState(false);

	return (
    <div className="product-card-container space admin">
      <div className="product-card-image">
        {product.colors.length > 0 &&
        product.types &&
        product.types[0].images &&
        product.types[0].images.length > 0 ? (
          <div className="position-relative">
            <img src={product.types[0].images[0].url} alt="" />
            <AvgQuantityProduct sneakerId={product._id} />
          </div>
        ) : (
          <div className="product-card-no-colors">
            <b>Without</b>
            <b>colors</b>
          </div>
        )}
      </div>
      <span className="product-card-name">{product.name}</span>
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
            id={product._id}
            sneakerName={product.name}
            closeConfirmation={() => setOpen(false)}
          />
        </Modal>
      </div>
    </div>
  );
};

export default AdminProductCard;

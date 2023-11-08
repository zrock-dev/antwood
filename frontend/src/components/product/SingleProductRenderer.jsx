'use client';

import { useContext, useEffect, useState } from 'react';
import ProductDetails from './ProductDetails';
import { getSneakerById } from '@/requests/SneakersRequest';

import '../../styles/product/product_details.css';
import { useRouter } from 'next/navigation';
import { AlertContext } from '@/context/AlertProvider';

const SingleProductRenderer = ({ id }) => {
	const { setDangerAlert } = useContext(AlertContext);
	const router = useRouter();
	const [product, setProduct] = useState(null);

	useEffect(() => {
		getSneakerById(id)
			.then((response) => {
				setProduct(response);
			})
			.catch((e) => {
				setDangerAlert('Invalid sneaker id');
				router.push('/');
			});
	}, [id, router]);

	return product ? (
		<ProductDetails product={product} />
	) : (
		<div className="loader-container">
			<span className="loader"></span>
		</div>
	);
};

export default SingleProductRenderer;

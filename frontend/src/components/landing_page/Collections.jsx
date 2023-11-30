'use client';
import { useContext } from 'react';
import '../../styles/landing_page/collections.css';
import { ProductResultsContext } from '@/context/ProductResultsContext';

const Collections = () => {
	const { addTag } = useContext(ProductResultsContext);

	return (
		<div className="landing-collections-main-container">
			<button
				className="langin-collection-container"
				onClick={() => addTag('men')}
			>
				<img
					className="langin-collection-image"
					src="https://res.cloudinary.com/dex16gvvy/image/upload/v1701348624/solestyle/maqxnlwkfmhsmma1otuw.jpg"
					alt=""
				/>
				<h3 className="langin-collection-title">MEN</h3>
			</button>
			<button
				className="langin-collection-container"
				onClick={() => addTag('women')}
			>
				<img
					className="langin-collection-image"
					src="https://res.cloudinary.com/dex16gvvy/image/upload/v1701348624/solestyle/kef5mxgc1vj843hbg5hj.jpg"
					alt=""
				/>
				<h3 className="langin-collection-title">WOMEN</h3>
			</button>
			<button
				className="langin-collection-container"
				onClick={() => addTag('kids')}
			>
				<img
					className="langin-collection-image"
					src="https://res.cloudinary.com/dex16gvvy/image/upload/v1701348624/solestyle/gx4s1gz6xatskz1khdx5.jpg"
					alt=""
				/>
				<h3 className="langin-collection-title">KIDS</h3>
			</button>
		</div>
	);
};

export default Collections;

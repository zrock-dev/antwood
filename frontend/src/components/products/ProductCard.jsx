import moment from 'moment';
import Link from 'next/link';

const ProductCard = ({ product }) => {
	const getTag = () => {
		if (product.salesQuantity >= 50) {
			return <span className="product-card-tag normal">best seller</span>;
		} else if (moment().diff(moment(product.lastDate), 'days') < 14) {
			return <span className="product-card-tag new">new sneaker</span>;
		}
	};

	return (
		<Link href={`/products/${product._id}`} className="product-card-container">
			<img
				className="product-card-image"
				src={product.types[0].images[0].url}
				alt=""
			/>
			<span className="text-extra-bold m-top-20">{product.name}</span>
			<span>{product.price} $</span>
			{getTag()}
		</Link>
	);
};

export default ProductCard;

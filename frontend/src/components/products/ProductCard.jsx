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
		product.colors.length > 0 &&
		product.types &&
		product.types[0].images &&
		product.types[0].images.length > 0 && (
			<Link
				href={`/products/${product._id}`}
				className="product-card-container"
			>
				<div className="product-card-image">
					<img src={product.types[0].images[0].url} alt=""/>
				</div>
				<span className="product-card-name margin-top-15">{product.name}</span>
				<span className="product-card-price">{product.price} $</span>
				{getTag()}
			</Link>
		)
	);
};

export default ProductCard;

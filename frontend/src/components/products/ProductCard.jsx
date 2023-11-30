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
			<div className="product-card-container">
			<i className='fa-regular fa-heart product-card-heart'/>
			<Link
				href={`/products/${product._id}`}
				>

				<div className="product-card-image">
					<img src={product.types[0].images[0].url} alt=""/>
				</div>
				<span className="product-card-name margin-top-15">{product.name} <br/></span>
				<span className="product-card-price">{product.price} $</span>
				{getTag()}
			</Link>
			</div>			
		)
	);
};

export default ProductCard;

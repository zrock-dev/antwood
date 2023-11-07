import Link from "next/link";

const ProductCard = ({ product }) => {
	return (
		<Link href={`/products/${product._id}`} className="product-card-container">
			<img
				className="product-card-image"
				src={product.types[0].images[0].url}
				alt=""
			/>
			<span className="text-extra-bold m-top-20">{product.name}</span>
			<span>{product.price} $</span>
			{/* <span>{product.salesQuantity}</span>
			<span>{product.lastDate.toString()}</span> */}
		</Link>
	);
};

export default ProductCard;

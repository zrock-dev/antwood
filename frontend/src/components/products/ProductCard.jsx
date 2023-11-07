const ProductCard = ({ product }) => {
	return (
		<div>
			<img src={product.types[0].images[0].url} alt="" />
			<span>{product.name}</span>
			<span>{product.price}$</span>
			<span>{product.salesQuantity}</span>
			<span>{product.lastDate.toString()}</span>
		</div>
	);
};

export default ProductCard;

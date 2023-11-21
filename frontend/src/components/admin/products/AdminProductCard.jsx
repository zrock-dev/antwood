import Link from 'next/link';

const AdminProductCard = ({ product }) => {
	return (
		<Link
			href={`/admin/product/${product._id}`}
			className="product-card-container space"
		>
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
				<button className="general-button white">Edit</button>
				<button className="general-button gray">Delete</button>
			</div>
		</Link>
	);
};

export default AdminProductCard;

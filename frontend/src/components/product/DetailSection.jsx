const DetailSection = ({ title, description = null, children }) => {
	return (
		<div className="product-details-secction-container">
			<h4 className="product-details-secction-title">{title}</h4>
			{description && (
				<p className="product-details-secction-description">{description}</p>
			)}
			{children}
		</div>
	);
};

export default DetailSection;

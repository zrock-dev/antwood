const AdminProduct = ({ id }) => {
	return id ? (
		<div>admin for product with id {id}</div>
	) : (
		<div>empty admin</div>
	);
};

export default AdminProduct;

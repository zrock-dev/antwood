import '../../styles/landing_page/collections.css';

const Collections = () => {
	return (
		<div className="landing-collections-main-container">
			<button className="langin-collection-container">
				<img
					className="langin-collection-image"
					src="https://res.cloudinary.com/dex16gvvy/image/upload/v1701348624/solestyle/maqxnlwkfmhsmma1otuw.jpg"
					alt=""
				/>
				<h3 className="langin-collection-title">MEN</h3>
			</button>
			<button className="langin-collection-container">
				<img
					className="langin-collection-image"
					src="https://res.cloudinary.com/dex16gvvy/image/upload/v1701348624/solestyle/kef5mxgc1vj843hbg5hj.jpg"
					alt=""
				/>
				<h3 className="langin-collection-title">WOMEN</h3>
			</button>
			<button className="langin-collection-container">
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

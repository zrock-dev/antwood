import Start from '@/icons/Start';
import '../../styles/landing_page/frontPage.css';

const FrontPage = () => {
	return (
		<div className="front-page-main-container">
			<img
				src="https://res.cloudinary.com/dex16gvvy/image/upload/v1701348614/solestyle/hk7pgexxkvue4l4nwkdk.png"
				alt=""
			/>
			<h1 className="front-page-logo-name">
				SoleStyle <Start />
			</h1>
		</div>
	);
};

export default FrontPage;

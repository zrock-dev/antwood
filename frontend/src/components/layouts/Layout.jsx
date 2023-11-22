import '../../styles/elemens/general.css';
import '../../styles/elemens/customizable.css';
import '../../styles/elemens/animations.css';
import '../../styles/elemens/loader.css';
import '../../styles/navbar/navbar.css';

const Layout = ({ children }) => {
	return (
		<div>
			<div id="overlay"></div>
			{children}
		</div>
	);
};

export default Layout;

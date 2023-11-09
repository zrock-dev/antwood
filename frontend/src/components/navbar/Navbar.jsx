import Button from "../Button";
import { useAuth } from "@/context/AuthContext";
const Navbar = () => {

	const {openAuthModal} = useAuth();
	return <div className="navbar-main-container">
		<Button onClick={openAuthModal}>
			Signin
		</Button>
	</div>;
};

export default Navbar;

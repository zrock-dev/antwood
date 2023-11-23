'use client';
import Button from '@/components/Button';
import useAuthHandler from '@/hooks/AuthOperations';
import { AuthProvider, useAuth } from '@/context/AuthContext';
import CartModalRenderer from '../cart/CartModalRenderer';
import Searcher from '../search/Searcher';
import NavLogo from './NavLogo';

const Navbar = () => {
	const { setShowModalAuth, updateUser, setIsAuthenticated, isAuthenticated } =
		useAuth();
	const { signoutUser } = useAuthHandler();

	return (
		<div className="navbar-main-container">
			<div className="navbar-sub-container left">
				<NavLogo style="logo hover" />
			</div>
			<div className="navbar-sub-container right">
				{!isAuthenticated ? (
					<Button className="rm-padding" onClick={() => setShowModalAuth(true)}>
						log in
					</Button>
				) : (
					<Button className="rm-padding" onClick={signoutUser}>
						log out
					</Button>
				)}
				<CartModalRenderer />
				<Searcher />
			</div>
		</div>
	);
};

export default Navbar;

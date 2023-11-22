'use client';
import Button from '@/components/Button';
import useAuthHandler from '@/hooks/AuthOperations';
import { AuthProvider, useAuth } from '@/context/AuthContext';
import CartModalRenderer from '../cart/CartModalRenderer';
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
					<Button onClick={() => setShowModalAuth(true)}>log in</Button>
				) : (
					<Button onClick={signoutUser}>log out</Button>
				)}
				<CartModalRenderer />
			</div>
		</div>
	);
};

export default Navbar;

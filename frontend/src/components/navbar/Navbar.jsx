'use client';
import Button from '@/components/Button';
import useAuthHandler from '@/hooks/AuthOperations';
import { AuthProvider, useAuth } from '@/context/AuthContext';
import CartModalRenderer from '../cart/CartModalRenderer';
import Searcher from '../search/Searcher';

const Navbar = () => {
	const { setShowModalAuth, updateUser, setIsAuthenticated, isAuthenticated } =
		useAuth();
	const { signoutUser } = useAuthHandler();

	return (
		<div className="navbar-main-container">
			{!isAuthenticated ? (
				<Button onClick={() => setShowModalAuth(true)}>log in</Button>
			) : (
				<Button onClick={signoutUser}>log out</Button>
			)}
			<CartModalRenderer />
			<Searcher />
		</div>
	);
};

export default Navbar;

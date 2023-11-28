'use client';
import Button from '@/components/Button';
import useAuthHandler from '@/hooks/AuthOperations';
import { AuthProvider, useAuth } from '@/context/AuthContext';
import CartModalRenderer from '../cart/CartModalRenderer';
import Searcher from '../search/Searcher';
import NavLogo from './NavLogo';
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';

const Navbar = () => {
	const { setShowModalAuth, updateUser, setIsAuthenticated, isAuthenticated } =
		useAuth();
	const { signoutUser } = useAuthHandler();
	const pathname = usePathname();
	const searchParams = useSearchParams();

	return (
		<div className="navbar-main-container">
			<div className="navbar-sub-container left">
				<NavLogo style="logo hover" />
				<Link
					className={`navbar-option space-left-15 ${
						pathname === '/' && 'selected'
					}`}
					href="/"
				>
					Home
				</Link>
				<Link
					className={`navbar-option ${
						(pathname.includes('/products/search') ||
							pathname === '/products') &&
						'selected'
					}`}
					href="/products"
				>
					All
				</Link>
				<Link
					className={`navbar-option ${
						searchParams.get('tags')?.split(',').includes('men') && 'selected'
					}`}
					href="/products/filter?tags=men"
				>
					Men
				</Link>
				<Link
					className={`navbar-option ${
						searchParams.get('tags')?.split(',').includes('women') && 'selected'
					}`}
					href="/products/filter?tags=women"
				>
					Women
				</Link>
				<Link
					className={`navbar-option ${
						searchParams.get('tags')?.includes('kids') && 'selected'
					}`}
					href="/products/filter?tags=kids"
				>
					Kids
				</Link>
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

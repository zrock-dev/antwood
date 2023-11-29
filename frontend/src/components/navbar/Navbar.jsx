'use client';
import Button from '@/components/Button';
import useAuthHandler from '@/hooks/AuthOperations';
import { AuthProvider, useAuth } from '@/context/AuthContext';
import CartModalRenderer from '../cart/CartModalRenderer';
import Searcher from '../search/Searcher';
import NavLogo from './NavLogo';
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import { useContext } from 'react';
import { ProductResultsContext } from '@/context/ProductResultsContext';

const Navbar = () => {
	const { setShowModalAuth, updateUser, setIsAuthenticated, isAuthenticated } =
		useAuth();
	const { signoutUser } = useAuthHandler();
	const pathname = usePathname();
	const searchParams = useSearchParams();
	const { filters, addTag } = useContext(ProductResultsContext);

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
				<button
					className={`navbar-option ${
						pathname.includes('filter') &&
						filters &&
						filters.tags.includes('men') &&
						'selected'
					}`}
					onClick={() => addTag('men')}
				>
					Men
				</button>
				<button
					className={`navbar-option ${
						pathname.includes('filter') &&
						filters &&
						filters.tags.includes('women') &&
						'selected'
					}`}
					onClick={() => addTag('women')}
				>
					Women
				</button>
				<button
					className={`navbar-option ${
						pathname.includes('filter') &&
						filters &&
						filters.tags.includes('kids') &&
						'selected'
					}`}
					onClick={() => addTag('kids')}
				>
					Kids
				</button>
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

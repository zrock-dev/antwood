'use client';
import Button from '@/components/Button';
import useAuthHandler from '@/hooks/AuthOperations';
import { AuthProvider, useAuth } from '@/context/AuthContext';
import CartModalRenderer from '../cart/CartModalRenderer';
import Searcher from '../search/Searcher';
import NavLogo from './NavLogo';
import { usePathname } from 'next/navigation';
import { useContext, useEffect, useRef, useState } from 'react';
import { ProductResultsContext } from '@/context/ProductResultsContext';

const Navbar = () => {
	const navbar = useRef(null);
	const { setShowModalAuth, updateUser, setIsAuthenticated, isAuthenticated } =
		useAuth();
	const { signoutUser } = useAuthHandler();
	const pathname = usePathname();
	const { filters, addTag, clearFiltersAndRedirect } = useContext(
		ProductResultsContext
	);

	useEffect(() => {
		if (navbar && navbar.current) {
			window.addEventListener('scroll', () => {
				if (navbar && navbar.current && window.scrollY > 50) {
					navbar.current.classList.add('fixed');
				} else if (navbar && navbar.current) {
					navbar.current.classList.remove('fixed');
				}
			});
		}
	}, []);

	return (
		<div className={`navbar-main-container`} ref={navbar}>
			<div className="navbar-sub-container left">
				<NavLogo style="logo hover" />
				<button
					className={`navbar-option space-left-15 ${
						pathname === '/' && 'selected'
					}`}
					onClick={() => clearFiltersAndRedirect('/')}
				>
					Home
				</button>
				<button
					className={`navbar-option ${
						(pathname.includes('/products/search') ||
							pathname === '/products' ||
							(filters &&
								!filters.tags.includes('men') &&
								!filters.tags.includes('women') &&
								!filters.tags.includes('kids') &&
								pathname === '/products/filter')) &&
						'selected'
					}`}
					onClick={() => clearFiltersAndRedirect('/products')}
				>
					All
				</button>
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

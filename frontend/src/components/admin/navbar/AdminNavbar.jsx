'use client';
import NavLogo from '@/components/navbar/NavLogo';
import Database from '@/icons/Database';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const AdminNavbar = () => {
	const pathname = usePathname();

	return (
		<div className="navbar-main-container">
			<div className="navbar-sub-container left">
				<NavLogo homeDirecction="/admin" style="logo hover" />
			</div>
			<div className="navbar-sub-container right">
				<Link
					href="/admin/product/"
					className={`navbar-option ${
						pathname.includes('/admin/product') && 'selected'
					}`}
				>
					<Database /> Admin Panel
				</Link>
			</div>
		</div>
	);
};

export default AdminNavbar;

'use client';
import Database from '@/icons/Database';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const AdminNavbar = () => {
	const pathname = usePathname();

	return (
		<div className="navbar-main-container">
			<Link
				href="/admin/product/"
				className={`navbar-option ${
					pathname.includes('/admin/product') && 'selected'
				}`}
			>
				<Database /> Admin Panel
			</Link>
		</div>
	);
};

export default AdminNavbar;

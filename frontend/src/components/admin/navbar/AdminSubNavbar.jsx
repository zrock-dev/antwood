import Plus from '@/icons/Plus';
import Link from 'next/link';

const AdminSubNavbar = () => {
	return (
		<div className="subnavbar-main-container">
			<b>ALL</b>
			<Link href={'/admin/product'} className="general-button auto narrow">
				Add new sneaker
				<Plus />
			</Link>
		</div>
	);
};

export default AdminSubNavbar;

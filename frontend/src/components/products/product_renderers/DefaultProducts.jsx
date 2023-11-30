'use client';
import { getAllProductsByPagination } from '@/requests/SneakersRequest';
import ProductRenderer from '../ProductRenderer';
import FilterRenderer from '@/components/filters/FilterRenderer';
import SubNavbar from '@/components/navbar/SubNavbar';

const DefaultProducts = () => {
	return (
		<div className="layout-filter-horizontal">
			<FilterRenderer />
			<div className="layout-filter-vertical">
				<SubNavbar />
				<ProductRenderer
					fetchMethod={(page, sorter) =>
						getAllProductsByPagination(page, 3, sorter)
					}
					style="products-container width-100"
				/>
			</div>
		</div>
	);
};

export default DefaultProducts;

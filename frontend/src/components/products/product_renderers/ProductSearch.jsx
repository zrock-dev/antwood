'use client';
import { getSearchByPagination } from '@/requests/SneakersRequest';
import ProductRenderer from '../ProductRenderer';
import FilterRenderer from '@/components/filters/FilterRenderer';
import SubNavbar from '@/components/navbar/SubNavbar';

const ProductSearch = ({ input }) => {
	return (
		<div className="layout-filter-horizontal">
			<FilterRenderer />
			<div className="layout-filter-vertical">
				<SubNavbar />
				<ProductRenderer
					fetchMethod={(page, sorter) =>
						getSearchByPagination(input, page, sorter)
					}
					style="products-container width-100"
				/>
			</div>
		</div>
	);
};

export default ProductSearch;

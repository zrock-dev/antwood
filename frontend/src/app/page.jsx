'use client';
import ProductSuggestions from '@/components/products/product_renderers/ProductSuggestions';
import '../styles/landing_page/page.css';
import NormalLayout from '@/components/layouts/NormalLayout';
import FrontPage from '@/components/landing_page/FrontPage';

export default function LandingPage() {
	return (
		<NormalLayout>
			<main className="landing-page-main-container">
				<FrontPage />
				<span className="vertical-separator"></span>
				<span className="subtitle">Our suggestions for you</span>
				<ProductSuggestions />
			</main>
		</NormalLayout>
	);
}

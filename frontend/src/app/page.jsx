"use client"
import Layout from '@/components/Layout';
import ProductSuggestions from '@/components/products/product_renderers/ProductSuggestions';
import '../styles/landing_page/page.css';

export default function LandingPage() {

	return (
		<Layout>
			<main className="landing-page-main-container">
				<span className="vertical-separator"></span>
				<span className="subtitle">Our suggestions for you</span>
				<ProductSuggestions />
			</main>
		</Layout>
	);
}

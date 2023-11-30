'use client';
import Facebook from '@/icons/Footer/Facebook';
import Twitter from '@/icons/Footer/Twitter';
import Instagram from '@/icons/Footer/Instagram';
import Youtube from '@/icons/Footer/Youtube';
import Link from 'next/link';
import Pointer from '@/icons/Footer/Pointer';

const Footer = () => {
	return (
		<div className="footer-main-container">
			<div className="footer-social-network-container">
				<Link
					href="https://www.facebook.com/tu-pagina-de-facebook"
					target="_blank"
					rel="noopener noreferrer"
				>
					<Facebook />
				</Link>

				<Link
					href="https://twitter.com/tu-cuenta-de-twitter"
					target="_blank"
					rel="noopener noreferrer"
				>
					<Twitter />
				</Link>

				<Link
					href="https://www.instagram.com/tu-cuenta-de-instagram"
					target="_blank"
					rel="noopener noreferrer"
				>
					<Instagram />
				</Link>

				<Link
					href="https://www.youtube.com/tu-canal-de-youtube"
					target="_blank"
					rel="noopener noreferrer"
				>
					<Youtube />
				</Link>
			</div>

			<div className="footer-location-container">
				<Pointer />
				<p> Bolivia</p>
			</div>

			<span className="footer-copyright">
				&copy; {new Date().getFullYear()} Solestyle , All Right Reserved
			</span>
		</div>
	);
};

export default Footer;

'use client';
import Button from '@/components/Button';
import CartModalRenderer from '../cart/CartModalRenderer';
import Facebook from '@/icons/footer/Facebook';
import Twitter from '@/icons/footer/Twitter';
import Instagram from '@/icons/footer/Instagram';
import Youtube from '@/icons/footer/Youtube';
import Pointer from '@/icons/footer/Pointer';
import Link from 'next/link';


const Footer = () => {
    const añoActual = new Date().getFullYear();

	return (
		<div className="footer-main-container">
			<div className="social-network-container">
            <Link href="https://www.facebook.com/tu-pagina-de-facebook" target="_blank" rel="noopener noreferrer">
                <Facebook />
            </Link>

            <Link href="https://twitter.com/tu-cuenta-de-twitter" target="_blank" rel="noopener noreferrer">
                <Twitter />
            </Link>

            <Link href="https://www.instagram.com/tu-cuenta-de-instagram" target="_blank" rel="noopener noreferrer">
                <Instagram />
            </Link>

            <Link href="https://www.youtube.com/tu-canal-de-youtube" target="_blank" rel="noopener noreferrer">
                <Youtube />
            </Link>
			</div>
            
            <div className='location-container'>
                <pointer/>
                <p> Bolivia</p>
            </div>
            
            <div className='copyright-container'> 
                &copy; {añoActual} Solestyle , All Right Reserved
            </div>
		</div>
	);
};

export default Footer;

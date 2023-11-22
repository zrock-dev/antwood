import Start from '@/icons/Start';
import Link from 'next/link';

const Logo = ({ homeDirecction = '/', style = 'logo' }) => {
	return (
		<Link href={homeDirecction} className={style}>
			SoleStyle
			<Start />
		</Link>
	);
};

export default Logo;

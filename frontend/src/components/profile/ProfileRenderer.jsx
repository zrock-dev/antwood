'use client';
import '@/styles/profile/profile.css';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getUser } from '@/requests/AuthRequest';
import useAuthHandler from '@/hooks/AuthOperations';
import RightFromBracket from '@/icons/RightFromBracket';

const ProfileRenderer = ({ children }) => {
	const { user } = useAuth();
	const router = useRouter();
	const { signoutUser } = useAuthHandler();

	const verifyUserToken = async () => {
		const data = await getUser();
		if (data.error) {
			router.push('/');
			return;
		}
	};

	useEffect(() => {
		verifyUserToken();
	}, [user]);

	return (
		<div className="profile-container">
			<div className="profile-account-section">
				<h2>
					@{user?.username}{' '}
					<button
						className="profile-log-out-button-option"
						onClick={signoutUser}
            title='Log out'
					>
						<RightFromBracket />
					</button>
				</h2>
				<span>{user?.email}</span>
			</div>
			<div className="profile-preferences-section"></div>
			<div className="profile-record-section">
				<ul className="nav-records">
					<li>
						<Link href="/profile">Favorites</Link>
					</li>
					<li>
						<Link href={'/profile/order'}>Orders</Link>
					</li>
				</ul>
				{children}
			</div>
		</div>
	);
};

export default ProfileRenderer;

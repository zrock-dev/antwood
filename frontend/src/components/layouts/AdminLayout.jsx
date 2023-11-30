'use client'
import AdminNavbar from '../admin/navbar/AdminNavbar';
import Layout from './Layout';
import { useAuth } from '@/context/AuthContext';
import { useEffect, useRef } from 'react';
import { toast } from "sonner";
import { useRouter } from 'next/navigation';
import { getUser } from "@/requests/AuthRequest";

const AdminLayout = ({ children }) => {
	const router = useRouter()
	const {user} = useAuth()

	const verifyUserToken  = async()=>{
	    const data = await getUser()
		if (data.error || data.role !== "admin") {
			toast.error('You do not have permissions')
			router.push('/')
			return 
		}
	}
	
	useEffect(() => {
		verifyUserToken()
	},[])

	return (
		<Layout>
			<AdminNavbar />
			{children}
		</Layout>
	);
};

export default AdminLayout;

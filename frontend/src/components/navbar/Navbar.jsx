"use client";
import Button from "@/components/Button";
import {AuthProvider, useAuth } from "@/context/AuthContext";


const Navbar = () => {
	const { setShowModalAuth} = useAuth();

	return (
    <div className="navbar-main-container">
      <Button onClick={() => setShowModalAuth(true)}>login</Button>
    </div>
  );
};

export default Navbar;

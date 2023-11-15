"use client";
import Button from "@/components/Button";
import useAuthHandler from "@/hooks/AuthOperations";
import {AuthProvider, useAuth } from "@/context/AuthContext";
import CartButton from "./CartButton"; 
import '../../styles/navbar/navbar.css'; 


const Navbar = () => {
	const { setShowModalAuth,updateUser,setIsAuthenticated,isAuthenticated} = useAuth();
const {signoutUser} = useAuthHandler();

	return (
    <div className="navbar-main-container">
      {!isAuthenticated ? (
        <Button onClick={() => setShowModalAuth(true)}>log in</Button>
      ) : (
        <Button   onClick={signoutUser}>
          log out
        </Button>
      )}

      <div className="Button_container">
        <CartButton />
      </div>    


      <div className="Button_container">
        <button >fav</button>
      </div>
      <div className="Button_container">
        <button >acount</button>
      </div>
      <div className="find_bar_container">
        <button >find bar</button>
      </div>
    </div>
  );
};

export default Navbar;

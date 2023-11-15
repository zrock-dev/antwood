"use client";
import Button from "@/components/Button";
import useAuthHandler from "@/hooks/AuthOperations";
import {AuthProvider, useAuth } from "@/context/AuthContext";
import CartButton from "./CartButton"; 
import '../../styles/navbar/navbar.css'; 


const Navbar = ({ openPopup }) => {
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
        <CartButton openPopup={openPopup} />
      </div>   


      <div className="Button_container">
        
      </div>
      <div className="Button_container">
        
      </div>
      <div className="find_bar_container">
        
      </div>
    </div>
  );
};

export default Navbar;

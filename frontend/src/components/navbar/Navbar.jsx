"use client";
import Button from "@/components/Button";
import useAuthHandler from "@/hooks/AuthOperations";
import {AuthProvider, useAuth } from "@/context/AuthContext";
import SideModal from '../SideModal'


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

      <button onClick={() => SideModal.openModal()}>Abrir Modal</button>
    </div>
  );
};

export default Navbar;

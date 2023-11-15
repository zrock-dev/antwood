"use client";
import Button from "@/components/Button";
import useAuthHandler from "@/hooks/AuthOperations";
import {AuthProvider, useAuth } from "@/context/AuthContext";
import usePayment from "@/hooks/usePayment";

const Navbar = () => {
	const { setShowModalAuth,updateUser,setIsAuthenticated,isAuthenticated} = useAuth();
  const {initPayment} = usePayment();
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

      <Button
      onClick={() => {
          initPayment("HJH9z@example.com");
      }}
      >
        Pay Card
        </Button>
    </div>
  );
};

export default Navbar;

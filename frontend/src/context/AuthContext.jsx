"use client";
import { createContext, useContext, useEffect, useState } from "react";
import Modal from "@/components/Modal";
import AuthFormWrapper from "@/components/auth/AuthFormWrapper";
import { getUser } from "@/requests/AuthRequest";
export const AuthContext = createContext(null);

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isModalOpen, setShowModal] = useState(false);

  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflowY = "hidden";
    } else {
      document.body.style.overflowY = "auto";
    }
  }, [isModalOpen]);

  useEffect(() => {
    const checkAuth = async () => {
      try{
      const data= await getUser();
        if (!data.error) {
        setUser(data);
        setIsAuthenticated(true);
        return 
        }
         setUser(null);
         setIsAuthenticated(false);
      }catch(error){
        console.log(error)
        return
      }
    };
    checkAuth();
  }, []);

  const updateUser = (user) => {
    setUser(user);
  };

  const setShowModalAuth = (modalState) => {
    setShowModal(modalState);
  };





  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        updateUser,
        setShowModalAuth,
        isModalOpen,
        setIsAuthenticated,
      }}
    >
      {children}
      <Modal isModalOpen={isModalOpen} setModalOpen={setShowModal}>
        <AuthFormWrapper isModalOpen={isModalOpen} />
      </Modal>
    </AuthContext.Provider>
  );
};

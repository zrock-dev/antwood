"use client";
import { createContext, useContext, useState } from "react";
import Modal from "@/components/Modal";
import AuthFormWrapper from "@/components/auth/AuthFormWrapper";
import useModal from "@/hooks/useModal";
import { loginUser, registerUser, getUserByEmail } from "@/request/AuthRequest";
import { toast } from "sonner";
export const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isModalOpen, openModal, closeModal] = useModal(false);

  const openAuthModal = () => {
    openModal();
  };

  const updateUser = (user) => {
    setUser(user);
  };

  const closeAuthModal = () => {
    closeModal();
  };

  const onAuthSignin = async (user, provider) => {
    return await loginUser(user, provider)
      .then((res) => {
        const data = res.data;
        if(data.error){
               toast.error("bad credentials");
               return { success: false, message: "bad credentials" };
        }
        updateUser(data);
        setIsAuthenticated(true)
        closeAuthModal();
        toast.success("success signin ");
        return { success: true, message: "success signin" };
      })
      .catch((err) => {
        toast.error("bad credentials");
        return { success: false, message: err };
      });
  };

  const verifyUserExists = async (email) => {
    return  await getUserByEmail(email)
      .then((res) => {
          if(res.data.email!==""){
             toast.error("there is already an account using that email");
            return true;
            }
        return false;
      })
      .catch((error) => {
        console.log(error)
        return false;
      });
  };

  const onAuthSignup = async (user, provider) => {
    return await registerUser(user, provider)
      .then((res) => {
        const data = res.data;
        updateUser(data);
        setIsAuthenticated(true);
        closeAuthModal();
        toast.success("success signup ");
        return { sucess: true, message: "success signup" };
      })
      .catch((err) => {
        toast.error("Signup Error");
        return { sucess: false, message: "Signup Error" };
      });
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        updateUser,
        openAuthModal,
        closeAuthModal,
        onAuthSignin,
        onAuthSignup,
        verifyUserExists,
      }}
    >
      {children}
      <Modal isModalOpen={isModalOpen} onCloseModal={closeModal}>
        <AuthFormWrapper />
      </Modal>
    </AuthContext.Provider>
  );
};

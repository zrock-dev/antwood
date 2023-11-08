"use client";
import { createContext, useContext, useEffect, useState } from "react";
import Modal from "@/components/Modal";
import AuthFormWrapper from "@/components/auth/AuthFormWrapper";
import useModal from "@/hooks/useModal";
import { loginUser, registerUser } from "@/request/AuthRequest";
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
    try {
      const res = await loginUser(user, provider);
      const data = await res.data;
      updateUser(data);
      closeAuthModal();
    } catch (err) {
      console.log(err);
    }
  };

  const onAuthSignup = async (user, provider) => {
    try {
      const res = await registerUser(user, provider);
      const data = await res.data;
      updateUser(data);
      closeAuthModal();
    } catch (err) {
      console.log(err);
    }
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
        onAuthSignup
      }}
    >
      {children}
      <Modal isModalOpen={isModalOpen} onCloseModal={closeModal}>
        <AuthFormWrapper />
      </Modal>
    </AuthContext.Provider>
  );
};

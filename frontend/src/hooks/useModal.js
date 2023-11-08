"use client";
import { useState } from "react";

function useModal(initialState) {
  const [isModalOpen, setShowModal] = useState(initialState);
  const closeModal = () => {
    setShowModal(false);
  };

  const openModal = () => {
    setShowModal(true);
  };

  return [isModalOpen, openModal, closeModal];
}

export default useModal;

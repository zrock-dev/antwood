"use client";
import { useState } from "react";

function useModal(initialState) {
  const [isModalOpen, setShowModal] = useState(initialState);
  const closeModal = () => {
    setShowModal(false);
     document.body.style.overflowY = "auto";
  };

  const openModal = () => {
    setShowModal(true);
     document.body.style.overflowY = "hidden";
  };

  return [isModalOpen, openModal, closeModal];
}

export default useModal;

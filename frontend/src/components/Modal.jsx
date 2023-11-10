"use client";

import modalStyle from '@/styles/modal.module.css'
import { useEffect, useRef } from "react";

function Modal({
  children,
  isModalOpen,
  setModalOpen
}) {

  useEffect(()=>{
    if(isModalOpen){
      document.body.style.overflowY = "hidden";
    }else{
      document.body.style.overflowY = "auto";
    }
  },[isModalOpen])

    const modalRef = useRef();

    useEffect(() => {
        let onClickHandler = (e) => {
          if (modalRef.current && !modalRef.current.contains(e.target)) {
            setModalOpen(false)
          }
        };

      document.addEventListener("mousedown", onClickHandler);
      return () => {
        document.removeEventListener("mousedown", onClickHandler);
      };
    },[]);


  return (
    isModalOpen && (
      <div className={modalStyle.modal_ctn}>
        <div ref={modalRef}>
          {children}
        </div>
      </div>
    )
  );
}

export default Modal
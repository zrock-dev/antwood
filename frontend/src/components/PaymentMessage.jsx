"use client"
import { useEffect, useState, useContext } from "react";
import Modal from "@/components/Modal";
import "@/styles/message.css";
import { verifyOrderStatus } from "@/requests/OrderRequest";


const PaymentMessage = ({resetCartState}) => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [badRequest , setBadRequest] = useState(false);

  useEffect(() => {
    let timer;
    if (isModalOpen) {
      setModalOpen(true);
      timer = setTimeout(() => {
        setModalOpen(false);
      }, 4000);
    } else {
      setModalOpen(false);
      clearTimeout(timer);
    }
    return () => clearTimeout(timer);
  }, [isModalOpen]);


  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const paymentIntent = params.get("payment_intent");
    const clientSecret = params.get("payment_intent_client_secret");
    const redirectStatus = params.get("redirect_status");

    if (paymentIntent && clientSecret && redirectStatus) {
      (async () => {
        const data = await verifyOrderStatus(paymentIntent, redirectStatus);
        if (data.status === 200 ) {
             setBadRequest(false);
             resetCartState();
             setModalOpen(true);
        }else if (data.status === 400) {
          setBadRequest(true);
             setModalOpen(true);
        }
          const newUrl = window.location.origin + window.location.pathname;
          window.history.replaceState({}, document.title, newUrl);
          
      })();
    }
  });

  return (
    <Modal isModalOpen={isModalOpen} setModalOpen={setModalOpen}>
      <div className={`message-ctn  ${badRequest ? "bad-request" : "ok-request"}`}>
        <i
          className={
            badRequest ? "fa-solid fa-triangle-exclamation" : "fa-solid fa-circle-check"
          }
        ></i>
        <h3>{badRequest ? "Payment Failed" : "Payment Successful!"}</h3>
      </div>
    </Modal>
  );
};

export default PaymentMessage;

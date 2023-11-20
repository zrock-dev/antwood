"use client"
import { useEffect, useState, useContext } from "react";
import Modal from "@/components/Modal";
import "@/styles/message.css";
import { verifyOrderStatus } from "@/requests/OrderRequest";


const PaymentMessage = ({resetCartState}) => {
  const [isModalOpen, setModalOpen] = useState(false);

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
          const newUrl = window.location.origin + window.location.pathname;
          window.history.replaceState({}, document.title, newUrl);
          setModalOpen(true);
          resetCartState();
        }
      })();
    }
  });

  return (
    <Modal isModalOpen={isModalOpen} setModalOpen={setModalOpen}>
      <div className="message-ctn">
        <i className="fa-regular fa-circle-check"></i>
        <h3>Payment Successful!</h3>
      </div>
    </Modal>
  );
};

export default PaymentMessage;

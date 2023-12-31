"use client";
import { useEffect, useState, useContext, useRef } from "react";
import Modal from "@/components/Modal";
import "@/styles/message.css";
import { verifyOrderStatus } from "@/requests/OrderRequest";
import { CartContext } from "@/context/CartContext";

const PaymentMessage = ({promise}) => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [badRequest, setBadRequest] = useState(false);

  const firstUpdate = useRef(true);

  const { resetCartState } = useContext(CartContext);

  useEffect(() => {
    let timer;
    if (isModalOpen) {
       if (promise) {
         promise();
       }
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
    if (firstUpdate.current) {
      firstUpdate.current = false;
         const params = new URLSearchParams(window.location.search);
         const paymentIntent = params.get("payment_intent");
         const clientSecret = params.get("payment_intent_client_secret");
         const redirectStatus = params.get("redirect_status");

         if (paymentIntent && clientSecret && redirectStatus) {
           
           (async () => {
             const data = await verifyOrderStatus(
               paymentIntent,
               redirectStatus
             );
             if (data.status === 200) {
               resetCartState();
               setBadRequest(false);
               setModalOpen(true);
             } else if (data.status === 400) {
               setBadRequest(true);
               setModalOpen(true);
             }
             const newUrl = window.location.origin + window.location.pathname;
             window.history.replaceState({}, document.title, newUrl);
           })();
         }
    }
 
  }, []);

  return (
    <Modal isModalOpen={isModalOpen} setModalOpen={setModalOpen}>
      <div
        className={`message-ctn  ${badRequest ? "bad-request" : "ok-request"}`}
      >
        <i
          className={
            badRequest
              ? "fa-solid fa-triangle-exclamation"
              : "fa-solid fa-circle-check"
          }
        ></i>
        <h3>{badRequest ? "Payment Failed" : "Payment Successful!"}</h3>
      </div>
    </Modal>
  );
};

export default PaymentMessage;

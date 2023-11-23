"use client";
import OrderRenderer from "@/components/order/OrderRenderer";
import PaymentMessage from "@/components/PaymentMessage";
import { CartContext } from "@/context/CartContext";
import { useContext } from "react";
const Order = () => {
  const { resetCartState } = useContext(CartContext);
  return (
    <>
      <PaymentMessage resetCartState={resetCartState} />
      <OrderRenderer />
    </>
  );
};

export default Order;

"use client"
import OrderRenderer from "@/components/order/OrderRenderer";
import PaymentMessage from "@/components/PaymentMessage";
const Order = () => {
  return (
    <>
      <PaymentMessage />
      <OrderRenderer />
    </>
  );
};

export default Order;

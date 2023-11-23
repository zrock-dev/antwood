import React, { useEffect, useState, useContext } from "react";
import {
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import Button from "../Button";
import { toast } from "sonner";
import { CartContext } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import { confirmAvailableSizes } from "@/requests/SneakersRequest";
export default function CheckoutForm({ clientSecret }) {
  const { products } = useContext(CartContext);
  const stripe = useStripe();
  const elements = useElements();
  const { isAuthenticated } = useAuth();
  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (products.length < 1) {
      toast.error("Cart is empty");
      return;
    }
      if (!stripe || !elements) {
      return;
    }

    const result = await elements.submit();

    if (result.error) {
      return;
    }

    const res = await confirmAvailableSizes(products);
    if (!res.areAvailable) {
      toast.error("Sneakers in Stock");
      window.history.back();
      return;
    }


    setIsLoading(true);

    const { error } = await stripe.confirmPayment({
      elements,
      clientSecret,
      confirmParams: {
        return_url: `http://test-solestyle.westus3.cloudapp.azure.com/${
          isAuthenticated ? "/profile/order" : ""
        }`,
      },
    });

    if (error.type === "card_error" || error.type === "validation_error") {
      setMessage(error.message);
    } else {
      setMessage("An unexpected error occurred.");
    }
    setIsLoading(false);
  };

  const paymentElementOptions = {
    layout: "tabs",
  };

  return (
    <form className="checkout-form-section">
      <h3>Payment</h3>
      <PaymentElement id="payment-element" options={paymentElementOptions} />

      <div className="checkout-pay-btn-ctn">
        <Button
          className="checkout-pay-btn"
          disabled={isLoading || !stripe || !elements}
          onClick={handleSubmit}
        >
          <span id="button-text">{isLoading ? "Loading... " : "Pay now"}</span>
        </Button>
      </div>
      {message && <div id="payment-message">{message}</div>}
    </form>
  );
}

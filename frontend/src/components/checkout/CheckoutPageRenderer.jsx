"use client";
import { Elements } from "@stripe/react-stripe-js";
import "@/styles/checkout/checkout.css";
import { CartContext } from "@/context/CartContext";
import { loadStripe } from "@stripe/stripe-js";
import {
  AddressElement,
  LinkAuthenticationElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";
import { useEffect, useState ,useContext} from "react";

import CheckoutItems from "./CheckoutItems";
const stripePromise = loadStripe(
  "pk_test_51OCWLLAx0MjRmRXcn4ofEveLqem47L1fcirumWu8Aa1zxyPWwKF6Z4YaR9r3ulMQECx98r2wE0A2uG1gTUzHDTuZ005KwB00DQ"
);

const CheckoutPageRenderer = () => {
  const [clientSecret, setClientSecret] = useState();
    const { cartState, products } = useContext(CartContext);
    const tax = 100;
  useEffect(() => {
    fetch("http://localhost:5000/api/payment/create-payment-intent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ total: 120.123 }),
    })
      .then((res) => res.json())
      .then((data) => {
        let cs = data.clientSecret;
        console.log(cs);
        setClientSecret(cs);
      });
  }, []);

  const appearance = {
    theme: "stripe",
    variables: {
      fontSizeBase: "16px",
      spacingUnit: "5px",
      fontWeightMedium: "bolder",
      fontFamily: `'Lato', sans-serif`,
    },
  };
  const options = {
    mode: "payment",
    clientSecret,
    appearance,
    amount: 120,
    currency: "usd",
    paymentMethodTypes: ["card"]
    ,locale: 'en',
  };

  return (
    <Elements stripe={stripePromise} options={options}>
      <div className="checkout-page">
        <div className="checkout-page-header">
          <h2>CHECKOUT</h2>
          <p>{`(${cartState?.totalItems} items) $${cartState?.total}`}</p>
        </div>

        <div className="checkout-ctn">
          <div className="checkout-form">
            <div>
              <h3>Contact</h3>
              <LinkAuthenticationElement />
            </div>
            <div>
              <h3>Address</h3>
              <AddressElement options={{ mode: "shipping" }} />
            </div>
           <CheckoutForm clientSecret={clientSecret}/>
          </div>

          <div className="checkout-summary-ctn">
            <div className="checkout-summary">
              <h3>Your Order</h3>
              <ul className="checkout-summary-order">
                <li>
                  <span>Original price</span>{" "}
                  <span>{`$${cartState?.subTotal}`}</span>
                </li>
                <li>
                  <span>Sales Tax</span> <span>${tax}</span>
                </li>
                <li>
                  <span>Total Price</span> <span>${cartState?.total}</span>
                </li>
              </ul>
            </div>
            <hr />
            <div className="checkout-summary-items">
              <CheckoutItems />
            </div>
          </div>
        </div>
      </div>
    </Elements>
  );
};

export default CheckoutPageRenderer;

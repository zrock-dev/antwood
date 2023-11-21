"use client";
import { Elements } from "@stripe/react-stripe-js";
import "@/styles/checkout/checkout.css";
import { CartContext } from "@/context/CartContext";
import { loadStripe } from "@stripe/stripe-js";
import {
  LinkAuthenticationElement,
} from "@stripe/react-stripe-js";
import ContactForm from "./ContactForm";
import CheckoutForm from "./CheckoutForm";
import { useEffect, useState, useContext } from "react";
import AddressForm from "./AddressForm";
import CheckoutItems from "./CheckoutItems";
import { useAuth } from "@/context/AuthContext";
import { toast } from "sonner";
import { getPaymentIntent } from "@/requests/OrderRequest";
const stripePromise = loadStripe(
  "pk_test_51OCWLLAx0MjRmRXcn4ofEveLqem47L1fcirumWu8Aa1zxyPWwKF6Z4YaR9r3ulMQECx98r2wE0A2uG1gTUzHDTuZ005KwB00DQ"
);
const CheckoutPageRenderer = () => {
  const [clientSecret, setClientSecret] = useState(undefined);
    const { products } = useContext(CartContext);
  const { user, isAuthenticated } = useAuth();
  const [email, setEmail] = useState("");
  const [emailSaved, setEmailSaved] = useState(false);
  const [addresConfirmed, setAddresConfirmed] = useState(false);


  const [address, setAddress] = useState({
    name: "",
    address: {
      line1: "",
      line2: "",
      city: "",
      postal_code: "",
    },
  });
  const { cartState, setCartState } = useContext(CartContext);
  const tax = 100;

  useEffect(() => {
    if (addresConfirmed) {
      let cart  = {...cartState}
      cart.shipping = address;
      getPaymentIntent(email, JSON.stringify(cart))
        .then((res) => res.json())
        .then((data) => {
          let cs = data.clientSecret;
          if (cartState?.id === null) {
            setCartState({
              ...cartState,
              id: data.orderId,
            });
          }
          setClientSecret(cs);
        });
    }
  }, [addresConfirmed]);

  const verifyAvailableOrder = () => {
    let isAvailable = products.length > 0;
    if (!isAvailable) {
      toast.error("Cart is empty");
      return false;
    }
    return true;
  }

  useEffect(() => {
    if (isAuthenticated) {
      setEmail(user?.email);
      setEmailSaved(true);
    }else{
      setEmail("");
      setEmailSaved(false);
      setAddresConfirmed(false);
    }
  
  }, [isAuthenticated]);

  const appearance = {
    theme: "stripe",
    variables: {
      fontSizeBase: "16px",
      spacingUnit: "5px",
      fontWeightMedium: "bolder",
      fontFamily: `'Lato', sans-serif`,
    },
  };


  return (
    <Elements stripe={stripePromise} options={{
    mode: "payment",
    clientSecret : clientSecret,
    appearance,
    amount: 120,
    currency: "usd",
    paymentMethodTypes: ["card"],
    locale: "en",
  }}>
      <div className="checkout-page">
        <div className="checkout-page-header">
          <h2>CHECKOUT</h2>
          <p>{`(${cartState?.totalItems} items) $${cartState?.total}`}</p>
        </div>

        <div className="checkout-ctn">
          <div className="checkout-form">
            <ContactForm
              emailSaved={emailSaved}
              email={email}
              setEmailSaved={setEmailSaved}
              setEmail={setEmail}
            />
            {emailSaved  && verifyAvailableOrder() && (
              <>
                <div className="hidden-email-element">
                  <LinkAuthenticationElement
                    options={{
                      defaultValues: {
                        email: email,
                      },
                      value: email,
                    }}
                    onChange={(event) => {
                      if (event.value && event.value.email) {
                        setEmail(event.value.email);
                      }
                    }}
                  />
                </div>
                <AddressForm
                  addresConfirmed={addresConfirmed}
                  setAddresConfirmed={setAddresConfirmed}
                  address={address}
                  setAddress={setAddress}
                />
                {addresConfirmed && (
                  <CheckoutForm clientSecret={clientSecret} />
                )}
              </>
            )}
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

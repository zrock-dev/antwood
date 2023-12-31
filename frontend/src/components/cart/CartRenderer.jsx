"use client";

import { CartContext } from "@/context/CartContext";
import { useContext, useEffect, useState, useRef } from "react";
import TrashCan from "@/icons/TrashCan";
import RemovedProductsModal from "../checkout/RemovedProductsModal";
import "../../styles/cart/cart.css";
import "../../styles/cart/cartPage.css";
import QuantityRenderer from "./QuantityRenderer";
import Link from "next/link";
import { useRouter } from "next/navigation";

const CartRenderer = () => {
  const {
    cartState,
    products,
    updateProduct,
    removeProduct,
    removedProducts
  } = useContext(CartContext);
  const router = useRouter();
  const [hasProducts, setHasProducts] = useState(false);


  useEffect(() => {
    if (cartState) {
      setHasProducts(products.length > 0);
    }
  }, [cartState]);

  return (
    <>
      {removedProducts && <RemovedProductsModal/>}
      {cartState ? (
        <>
          <div className="cart-page-main-container">
            {hasProducts ? (
              <div>
                <h2 className="cart-page-title">YOUR CART</h2>
                <div className="cart-page-products-container margin-top-15">
                  {products.map((product, index) => (
                    <div className="cart-page-product-container" key={index}>
                      <img src={product.image} alt="" />
                      <div className="cart-page-product-info-container">
                        <div className="column-container">
                          <div className="cart-page-product-details">
                            <h4>{product.name}</h4>
                            <button
                              onClick={() => {
                                removeProduct({
                                  sneakerId: product.sneakerId,
                                  sneakerColorId: product.sneakerColorId,
                                  size: product.size,
                                  subTotal: product.subTotal,
                                });
                              }}
                            >
                              <TrashCan />
                            </button>
                          </div>
                          <span>Price: {product.price} $</span>
                          <span>Subtotal: {product.subTotal} $</span>
                        </div>
                        <div className="cart-page-product-details">
                          <h3 className="cart-page-amount">
                            Size {product.size}
                          </h3>
                          <QuantityRenderer
                            text="Quantity"
                            amount={
                              product.quantity < product.amount
                                ? product.quantity
                                : product.amount
                            }
                            quantityAvailable={product.quantity}
                            onChange={(amount) => {
                              updateProduct({
                                sneakerId: product.sneakerId,
                                sneakerColorId: product.sneakerColorId,
                                size: product.size,
                                amount: amount,
                                price: product.price,
                                quantity: product.quantity,
                              });
                            }}
                            style="cart-sneaker-amount cart-page-amount amount-button small"
                          />
                        </div>
                      </div>
                      {product.quantity < 10 && (
                        <span className="out-of-stock-card">{`Last ${product.quantity} in stock`}</span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="cart-empty">
                <span className="cart-page-title">
                  You do not have any sneakers in your cart.
                </span>
                <p>
                  Discover your unique style in our virtual store! In every
                  corner of our catalog, you will find a wide range of products
                  that adapt to your personality and highlight your essence.
                </p>
                <Link href="/products">
                  <h4 className="general-button">GO TO SNEAKERS</h4>
                </Link>
              </div>
            )}

            <div className="cart-page-info-container">
              <h2 className="cart-page-title">SUMMARY</h2>
              <b>Subtotal: {cartState.subTotal} $</b>
              <b>Shipping & Handling: {hasProducts ? cartState.extra : 0} $</b>
              <span className="horizontal-separator"></span>
              <b>TOTAL {hasProducts ? cartState.total : 0} $</b>
              <span className="horizontal-separator"></span>

              <p className="description">
                You can choose from these payment options to purchase.
              </p>
              <img
                src="https://res.cloudinary.com/dex16gvvy/image/upload/v1700097392/solestyle/ggbomtfumdkoggc5gjqk.png"
                alt=""
              />

              <button
                className={`general-button margin-top-15 ${
                  !hasProducts && "disabled"
                }`}
                disabled={!hasProducts}
                onClick={() => {
                  router.push("/checkout");
                }}
              >
                CHECKOUT CART
              </button>
            </div>
          </div>
        </>
      ) : (
        <div className="loader-container">
          <span className="loader"></span>
        </div>
      )}
    </>
  );
};

export default CartRenderer;

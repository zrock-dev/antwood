import { CartContext } from "@/context/CartContext";
import { useContext } from "react";
import "@/styles/checkout/checkout_items.css";
import Image from "next/image";
const CheckoutItems = () => {
    const { cartState, products} =  useContext(CartContext);

  return <>
    {products &&
        products.map((product, index) => {
            return (
              <div key={index} className="checkout-item">
                <img src={product.image} className="checkout-item-image" />
                <div>
                  <div className="checkout-item-details">
                    <h5>{product.name}</h5>
                    <p>${product.price}</p>
                  </div>
                  <ul>
                    <li>{`Size : ${product.size} / Quantity : ${product.amount}`}</li>
                   
                  </ul>
                </div>
              </div>
            );
        })
    }
  </>;
};

export default CheckoutItems;

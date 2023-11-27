"use client";
import { stringToJson } from "@/utils/Parser";
import { getItem, saveItem } from "@/utils/StorageManagement";
import { createContext, useEffect, useState, useRef } from "react";
import { getSneakerQuantities } from "@/requests/SneakersRequest";
import { packCurrentQuantityQuery } from "@/utils/Packer";

export const CartContext = createContext();

export const EMPTY_CART = {
  id: null,
  products: [],
  totalItems: 0,
  subTotal: 0,
  extra: 100,
  total: 100,
};

const CartProvider = ({ children }) => {
  const [cartState, setCartState] = useState(null);
  const firstUpdate = useRef(true);

  const updateProducts = (products) => {
    const subTotal = calculateSubTotal(products);
    const totalItems = calculateTotalItems(products);
    setCartState({
      ...cartState,
      products,
      totalItems: totalItems,
      subTotal,
      total: subTotal + cartState.extra,
    });
  };

  const addSneaker = (
    sneakerId,
    sneakerColorId,
    amount,
    size,
    price,
    quantity,
    image,
    name
  ) => {
    const snakerSubTotal = price * amount;
    cartState.products.push({
      sneakerId,
      sneakerColorId,
      size,
      amount,
      subTotal: snakerSubTotal,
      quantity,
      price,
      image,
      name,
    });

    updateProducts(cartState.products);
  };

  const calculateTotalItems = (products) => {
    let totalItems = 0;
    if (products && products.length > 0) {
      products.map((product) => {
        totalItems += product.amount;
      });
    }
    return totalItems;
  };

  const removeProduct = (product) => {
    const products = cartState.products.filter(
      (productCart) => !equalsProduct(productCart, product)
    );

    updateProducts(products);
  };

  const updateProduct = (product) => {
    const products = cartState.products;
    for (let index = 0; index < products.length; index++) {
      if (equalsProduct(cartState.products[index], product)) {
        products[index].amount = product.amount;
        products[index].subTotal = product.amount * product.price;
        products[index].quantity = product.quantity;
      }
    }

    updateProducts(products);
  };

  const calculateSubTotal = (products) => {
    let subTotal = 0;
    if (cartState) {
      products.map((product) => {
        subTotal += product.subTotal;
      });
    }
    return subTotal;
  };

  const equalsProduct = (product1, product2) => {
    return (
      product1.sneakerId === product2.sneakerId &&
      product1.sneakerColorId === product2.sneakerColorId &&
      product1.size === product2.size
    );
  };

  const findProduct = (product) => {
    cartState.products.map((productCart) => {
      if (equalsProduct(productCart, product)) {
        return productCart;
      }
    });
  };

  useEffect(() => {
    if (cartState) {
      saveItem(
        "cart",
        JSON.stringify({
          ...cartState,
        })
      );
    }

    if (cartState?.products && firstUpdate.current) {
      firstUpdate.current = false;
      let dataRequest = packCurrentQuantityQuery(cartState.products);
      getCurrentSneakerQuantities(dataRequest);
    }
  }, [cartState]);

  useEffect(() => {
    const cart = getItem("cart");
    if (cart) {
      setCartState(stringToJson(cart));
    } else {
      setCartState(EMPTY_CART);
    }
  }, []);

  const resetCartState = () => {
    setCartState(EMPTY_CART);
  };

  const getCurrentSneakerQuantities = async (dataRequest) => {
    let dataResult = await getSneakerQuantities(dataRequest);

    let availableProducts = [];
    for (let i = 0; i < cartState.products.length; i++) {
      if (dataResult[i].quantity > 0) {
        cartState.products[i].quantity = dataResult[i].quantity;
        cartState.products[i].name = dataResult[i].name;
        cartState.products[i].image = dataResult[i].image;
        cartState.products[i].price = dataResult[i].price;
        let amount = cartState.products[i].amount;
        cartState.products[i].subTotal = dataResult[i].price * amount;
        availableProducts.push(cartState.products[i]);
      }
    }

    


    updateProducts(availableProducts);
  };

  return (
    <CartContext.Provider
      value={{
        cartState: cartState,
        products: cartState?.products,
        subTotal: cartState?.subTotal,
        addSneaker,
        removeProduct,
        updateProduct,
        findProduct,
        equalsProduct,
        setCartState,
        resetCartState,
        calculateSubTotal,
        calculateTotalItems,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;

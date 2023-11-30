"use client";
import "@/styles/checkout/removed_products_modal.css";
import { useEffect, useState, useRef, useContext } from "react";
import { getItem, saveItem, deleteItem } from "@/utils/StorageManagement";
import { stringToArray } from "@/utils/Parser";
import Button from "../Button";
import Modal from "../Modal";
const RemovedProductsModal = () => {
  const [removedProducts, setRemovedProducts] = useState([]);
  const [isModalOpen, setModalOpen] = useState(false);
  const [unavailableProducts, setUnavailableProducts] = useState([]);
  const firstUpdate = useRef(false);

  useEffect(() => {
    if (firstUpdate.current) return;
    firstUpdate.current = true;

    let products = getItem("removedProducts");
    if (products && products !== "undefined") {
      stringToArray(products).forEach((sneakerRemoved) => {
        if (!sneakerRemoved.price) {
          setUnavailableProducts((prev) => [...prev, sneakerRemoved]);
        } else {
          setRemovedProducts((prev) => [...prev, sneakerRemoved]);
        }
      });
      deleteItem("removedProducts");
      setModalOpen(true);
    }
  }, []);

  const handleModalVisibility = (isVisible) => {
    if (!isVisible) {
      setRemovedProducts([]);
      setUnavailableProducts([]);
    }
    setModalOpen(isVisible);
  };

  return (
    <>
      <Modal isModalOpen={isModalOpen} setModalOpen={handleModalVisibility}>
        <div className="removed-products-ctn">
          {removedProducts && removedProducts.length > 0 && (
            <div>
              <div className="removed-products-header">
                <h4>Sold Out Products</h4>
                <p>
                  This products are being removed from your cart because they
                  are sold out
                </p>
              </div>
              <div className="removed-products">
                <div className="removed-product-header">
                  <span className="product-header-image">Image</span>
                  <span className="product-card-name-modal">Product Name</span>
                  <span className="product-card-size">Size</span>
                </div>
                {removedProducts.map((product) => {
                  return (
                    <div className="removed-product" key={product.sneakerId}>
                      <img src={product.image} alt="" />
                      <span className="product-card-name-modal">{product.name}</span>
                      <span>{product.size}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
          {unavailableProducts && unavailableProducts.length > 0 && (
            <div>
              <div className="unavailable-products-header">
                <h4>Unavailable Products</h4>
                <p>
                  This products are being removed from your cart because they
                  are not available in the store
                </p>
              </div>
              <div className="removed-products">
                <div className="removed-product-header">
                  <span className="product-card-name-modal">Product Name</span>
                  <span className="product-card-size">Size</span>
                </div>
                {unavailableProducts.map((product) => {
                  return (
                    <>
                      <div className="removed-product" key={product.sneakerId}>
                        <span className="product-card-name-modal">
                          {product.name}
                        </span>
                        <span>{product.size}</span>
                      </div>
                    </>
                  );
                })}
              </div>
            </div>
          )}
          <Button
            onClick={() => {
              handleModalVisibility(false);
            }}
            btnStyle=""
            className={`${
              removedProducts.length === 0
                ? "close-removed-products-modal-unavailable"
                : "close-removed-products-modal-sold-out"
            }`}
          >
            <i className="fa-solid fa-x"></i>
          </Button>
        </div>
      </Modal>
    </>
  );
};

export default RemovedProductsModal;

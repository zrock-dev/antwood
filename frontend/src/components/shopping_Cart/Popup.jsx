"use client";
import React from 'react';
import { Close } from '@mui/icons-material';
import styled from 'styled-components'; 
import '../../styles/shopping_cart/Popup.css';

const PopupMain = styled.section`
  position: fixed;
  background: black;
  color: white;
  width: 440px;
  height: 100%;
  top: 0;
  right: ${props => props.rightPosition};
  transition: right 0.3s ease-in-out;
  padding: 20px;
  border-radius: 5px;
  z-index: 2;
`;

const Popup = ({ handleClose, show, children }) => {
  const rightPosition = show ? '0' : '-440px';

  return (
    <div className={`popup ${show ? 'display-block' : 'display-none'}`}>
      <div className="overlay" onClick={handleClose}></div>
      <PopupMain rightPosition={rightPosition} show={show}>
        <div className="popup-header">
          <h2>Your Cart</h2>
          <button className="close-button" onClick={handleClose}>
            <Close />
          </button>
        </div>
        <div className="popup-content">
          {children}
        </div>
        <div className="popup-footer">
            <Link href="/ShoppingCart/page">
                <button className="checkout-button" onClick={handleClose}>
                Checkout
                </button>
            </Link>
        </div>
      </PopupMain>
    </div>
  );
};

export default Popup;
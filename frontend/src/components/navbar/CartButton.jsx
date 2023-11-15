import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import SideModal from '../shopping_Cart/Shopping_Cart_Modal'; 

const CartButton = () => {
  const showPopup = () => {
    SideModal.openModal(); 
  };

  return (
    <IconButton color="inherit" aria-label="Shopping Cart" onClick={showPopup}>
      <ShoppingCartIcon />
    </IconButton>
  );
};

export default CartButton;
import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';

const CartButton = ({ openPopup }) => {
  return (
    <IconButton color="inherit" aria-label="Shopping Cart" onClick={openPopup}>
      <ShoppingCartIcon />
    </IconButton>
  );
};

export default CartButton;
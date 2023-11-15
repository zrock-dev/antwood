import React, { useState } from 'react';
import Popup from './shopping_Cart/Popup'; 
import '../styles/elemens/general.css';
import '../styles/elemens/customizable.css';
import '../styles/elemens/animations.css';
import '../styles/elemens/loader.css';
import '../styles/navbar/navbar.css';
import Navbar from './navbar/Navbar';

const Layout = ({ children }) => {
  const [showPopup, setShowPopup] = useState(false);

  const togglePopup = () => {
    setShowPopup(!showPopup);
  };

  return (
    <div>
      <Navbar openPopup={togglePopup} />
      {children}
      <Popup show={showPopup} handleClose={togglePopup}> </Popup>
    </div>
  );
};

export default Layout;

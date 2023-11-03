import Layout from "../../components/Layout";
import Link from "next/link";
import styles from "./adminpanel.module.css";
import Button from "../../components/Button";
import Inventory from "../../components/admin_panel/Inventory";
import AddShoeForm from "../../components/admin_panel/AddShoeForm";
import { useState } from "react";

function admin() {
  const [showInventory, setShowInventory] = useState(true);
  const [shoe, setShoe] = useState(null);
  const [brand, setBrand] = useState(null);
  const displayInventory = () => {
    setShowInventory(true);
  };

  const hideInventory = () => {
    setShowInventory(false);
  };

  const onEdit = (s) => {
    setShoe(s.Shoe);
    const inputString = s.Sneakercolor.images[0].id;
    const parts = inputString.split("solestyle/product_images/");

    if (parts.length === 2) {
      const secondPart = parts[1];
      const result = secondPart.split("/")[0];
      setBrand(result);
    } else {
      console.log("The input string was not in the expected format.");
    }
    setShowInventory(false);
  };

  return (
    <div className={styles.admin_panel}>
      <ul className={styles.admin_panel_menu}>
        <li>
          <Button
            className={`${styles.menu_btns} ${
              showInventory && styles.selected
            }`}
            onClick={displayInventory}
          >
            Inventory
          </Button>
        </li>
        <li>
          <Button
            className={`${styles.menu_btns} ${
              showInventory == false && styles.selected
            }`}
            onClick={hideInventory}
          >
            Add New Shoe
          </Button>
        </li>
      </ul>
      {showInventory ? (
        <Inventory onEdit={onEdit} />
      ) : !shoe ? (
        <AddShoeForm />
      ) : (
        <AddShoeForm shoeParams={shoe} selectedbrand={brand} />
      )}
    </div>
  );
}

export default admin;

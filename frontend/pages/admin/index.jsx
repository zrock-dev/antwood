import Layout from "../../components/Layout";
import Link from "next/link";
import styles from "./adminpanel.module.css";
import Button from "../../components/Button";
import Inventory from "../../components/admin_panel/Inventory";
import AddShoeForm from "../../components/admin_panel/AddShoeForm";
import { useState } from "react";

function admin() {
  const [showInventory, setShowInventory] = useState(true);

  const displayInventory = () => {
    setShowInventory(true);
  };

  const hideInventory = () => {
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
      {showInventory ? <Inventory /> : <AddShoeForm />}
    </div>
  );
}

export default admin;

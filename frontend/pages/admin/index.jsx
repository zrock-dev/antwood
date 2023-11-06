import Layout from "../../components/Layout";
import Link from "next/link";
import styles from "styles/adminpanel.module.css";
import Button from "../../components/Button";
import Inventory from "../../components/admin_panel/Inventory";
import AddShoeForm from "../../components/admin_panel/AddShoeForm";
import { useState } from "react";
import { Toaster, toast } from "sonner";

function Admin() {
  const [showInventory, setShowInventory] = useState(true);
  const [shoe, setShoe] = useState(null);
  const displayInventory = () => {
    setShowInventory(true);
  };

  const hideInventory = () => {
    setShoe(null);
    setShowInventory(false);
  };

  const onEdit = (s) => {
    setShoe(s.sneaker);
    setShowInventory(false);
  };

  const selectSide = () => {
    if (showInventory) {
      return <Inventory onEdit={onEdit} />;
    } else {
      return !shoe ? <AddShoeForm /> : <AddShoeForm shoeParams={shoe} />;
    }
  };

  return (
    <div className={styles.admin_panel}>
      <Toaster richColors expanded={true} />
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
      {selectSide()}
    </div>
  );
}

export default Admin;

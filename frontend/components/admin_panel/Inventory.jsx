import styles from "./inventory.module.css";
import InventoryCard from "../InventoryCard";
import Button from "../Button";
function Inventory() {
  return (
    <div className={styles.admin_panel_inventary}>
      <div className={styles.inventary_handle}>
        <Button
          btnStyle="second_btn"
          className={`${styles.inventary_handle_btns}`}
          onClick={() => {}}
        >
          <i className="fa-solid fa-table-cells-large"></i>
        </Button>
        <Button
          btnStyle="second_btn"
          className={`${styles.inventary_handle_btns}`}
          onClick={() => {}}
        >
          <i className="fa-solid fa-list"></i>
        </Button>
      </div>
      <div className={styles.inventary_ctn}>
        <div className={styles.inventary_grid}>
          <InventoryCard />
          <InventoryCard />
          <InventoryCard />
          <InventoryCard />
          <InventoryCard />
          <InventoryCard />
          <InventoryCard />
          <InventoryCard />
          <InventoryCard />
          <InventoryCard />
          <InventoryCard />
          <InventoryCard />
          <InventoryCard />
          <InventoryCard />
          <InventoryCard />
          <InventoryCard />
          <InventoryCard />
        </div>
      </div>
    </div>
  );
}

export default Inventory;

import styles from "styles/stylecomponents/adminPanel/inventory.module.css";
import InventoryCard from "../InventoryCard";
import Button from "../Button";
import { getAllShoes, deleteShoe } from "../../request/shoes";
import { useEffect, useState } from "react";
import { toast } from "sonner";
function Inventory({ onEdit }) {
  const [shoes, setShoes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    requestAllData();
  }, []);

  const requestAllData = () => {
    setLoading(true);
    getAllShoes()
      .then((res) => {
        console.log(res.data);
        if (res.data !== null) setShoes(res.data);
        toast.success("Inventory loaded successfully");
      })
      .catch((error) => {
        toast.error(error.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const onDeleteShoe = (id) => {
    toast.promise(deleteShoe(id), {
      loading: "Deleting...",
      success: (result) => {
        setShoes((prev) => prev.filter((shoe) => shoe.sneaker.id != id));
        return "Deleted!";
      },
      error: (err) => {
        console.log(err);
        return "Delete Failed!";
      },
    });
  };

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
          {shoes.map((shoe) => (
            <InventoryCard
              shoe={shoe}
              key={shoe.sneaker.id}
              onEdit={onEdit}
              onDelete={onDeleteShoe}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Inventory;

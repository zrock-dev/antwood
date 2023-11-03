import styles from "./inventory.module.css";
import InventoryCard from "../InventoryCard";
import Button from "../Button";
import { getAllShoes } from "../../request/shoes";
import { useEffect, useState } from "react";

function Inventory({onEdit}) {
  const [shoes, setShoes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    requestAllData();
  }, []);

  const requestAllData = () => {
    setLoading(true);
    getAllShoes()
      .then((res) => {
        if ((res.data !== null)) {
          setShoes(res.data);
        }
        console.log(res.data)
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
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
            <InventoryCard shoe={shoe} key={shoe.id} onEdit={onEdit} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Inventory;

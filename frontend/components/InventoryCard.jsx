import inventoryStyle from "./style_compontens/inventory_card.module.css";
import Button from "./Button";
function InventoryCard() {
  return (
    <div className={inventoryStyle.inventory_card}>
      <div>
        <img
        className={inventoryStyle.shoe_img}
          src="https://images.pexels.com/photos/1055271/pexels-photo-1055271.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          alt="shoe"
        />
        <h4>Shoe Name</h4>
      </div>
      <div className={inventoryStyle.inventory_card_btns}>
        <Button>Edit</Button>
        <Button>Remove</Button>
      </div>
    </div>
  );
}

export default InventoryCard;

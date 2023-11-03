import inventoryStyle from "./style_compontens/inventory_card.module.css";
import Button from "./Button";


function InventoryCard({ shoe, onEdit }) {
  return (
    <div className={inventoryStyle.inventory_card}>
      <div>
        <img
          className={inventoryStyle.shoe_img}
          src={shoe.Sneakercolor.images[0].url}
          alt="shoe"
        />
        <h4>{shoe.Shoe.name}</h4>
      </div>
      <div className={inventoryStyle.inventory_card_btns}>
        <Button onClick={()=>onEdit(shoe)}>Edit</Button>
        <Button>Remove</Button>
      </div>
    </div>
  );
}

export default InventoryCard;

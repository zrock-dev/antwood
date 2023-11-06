import inventoryStyle from "styles/stylecomponents/inventory_card.module.css";
import Button from "./Button";



function InventoryCard({ shoe, onEdit, onDelete }) {
  const verifyImages = (shoe)=>{
    let path =
      "default-image.png"; 
    if(shoe.sneakercolor.images!=null){
      path =  shoe.sneakercolor.images[0].url
    }
    console.log("PATH", path)
    return path;
  }

  return (
    <div className={inventoryStyle.inventory_card}>
      <div>
        <img
          className={inventoryStyle.shoe_img}
          src={verifyImages(shoe)}
          alt="shoe"
        />
        <h4>{shoe.sneaker.name}</h4>
      </div>
      <div className={inventoryStyle.inventory_card_btns}>
        <Button onClick={() => onEdit(shoe)}>Edit</Button>
        <Button
          onClick={() => {
            onDelete(shoe.sneaker.id);
          }}
        >
          Remove
        </Button>
      </div>
    </div>
  );
}

export default InventoryCard;

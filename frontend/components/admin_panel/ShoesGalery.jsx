import imgStyle from "styles/stylecomponents/adminPanel/shoes_image_form.module.css";
import { focusedImageStyle } from "utils/ImageFormUtils";
import Button from "../Button";
import { v4 as uuidv4 } from "uuid";
const ShoesGalery = ({
  imageProducts,
  newImages,
  onRemoveNewImage,
  onRemoveProductImage,
  addImage,
}) => {
  return (
    <div className={imgStyle.available_images}>
      <div className={imgStyle.shoe_image_add_btn}>
        <label htmlFor="file-upload" className={imgStyle.first_btn}>
          <i className="fa fa-cloud-upload"></i> Upload Image
        </label>
        <input
          type="file"
          accept="image/*"
          id="file-upload"
          onChange={(e) => addImage(e)}
          multiple
        />
      </div>
      {imageProducts.map((q, index) => (
        <div
          key={uuidv4()}
          className={imgStyle.image_item}
          style={focusedImageStyle(q.url)}
        >
          <Button onClick={(e) => onRemoveProductImage(e, index)}>
            <i className="fa fa-x"></i>
          </Button>
        </div>
      ))}

      {newImages.map((q, i) => (
        <div
          key={uuidv4()}
          className={imgStyle.image_item}
          style={focusedImageStyle(q.url)}
        >
          <Button onClick={(e) => onRemoveNewImage(e, i)}>
            <i className="fa fa-x"></i>
          </Button>
        </div>
      ))}
    </div>
  );
};
export default ShoesGalery;

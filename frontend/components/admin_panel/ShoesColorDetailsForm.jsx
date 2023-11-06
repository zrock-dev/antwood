import imgStyle from "styles/stylecomponents/adminPanel/shoes_image_form.module.css";
import Button from "../Button";
import Tag from "./Tag";
const ShoesColorDetailsForm = ({
  colorForm,
  colorSelected,
  isSaved,
  handleChange,
  onSubmitShoeColor,
  onAddSizes,
  onRemoveSize,
  onDeleteShoeColor,
}) => {
  const verifyTagInput = (value) => {
    if (value > 100 || value < 0 || isNaN(value)) {
      return false;
    } else {
      return true;
    }
  };
  return (
    <div className={imgStyle.shoe_configure}>
      <div className={imgStyle.shoe_shoe_configure_ctn}>
        <div className={imgStyle.shoe_configure_item}>
          <label>Color</label>
          <div
            className={imgStyle.shoe_configure_color}
            style={{ backgroundColor: colorSelected.color }}
          ></div>
        </div>
        <div
          className={`${imgStyle.shoe_configure_item} ${imgStyle.shoe_form_inputs} ${imgStyle.number_ctn}`}
        >
          <label>Quantity</label>
          <input
            type="number"
            name="quantity"
            value={colorForm.quantity}
            onChange={handleChange}
          />
        </div>
        <div className={imgStyle.shoe_configure_item}>
          <Button onClick={onDeleteShoeColor}>
            {isSaved ? "Delete" : "Cancel"}
          </Button>
          <Button onClick={onSubmitShoeColor}>
            {isSaved ? "Update" : "Save"}
          </Button>
        </div>
      </div>

      <Tag
        className={`${imgStyle.shoe_form_inputs}`}
        prompt="Size"
        tagParams={colorForm.sizes}
        onAddTag={onAddSizes}
        onRemove={onRemoveSize}
        verifyInput={verifyTagInput}
      />
    </div>
  );
};

export default ShoesColorDetailsForm;

import formStyle from "./shoes_form.module.css";
import Button from "../Button";
import ImageForm from "./ImageForm";
import ColorPicker from "./ColorPicker";
import Tag from "./Tag";
function AddShoeForm() {
  return (
    <div className={formStyle.section}>
      <form className={formStyle.shoe_form_ctn}>
        <div className={formStyle.shoe_form}>
          <div className={formStyle.shoe_form_inputs}>
            <label htmlFor="product_name">Product Name</label>
            <input
              type="text"
              id="product_name"
              placeholder="Insert Name of Shoe"
            />
          </div>
          <div className={formStyle.shoe_form_inputs}>
            <label htmlFor="product_description">Description</label>
            <textarea
              name="description"
              id="product_description"
              cols="50"
              rows="10"
            ></textarea>
          </div>
          <div className={`${formStyle.shoe_form_inputs}`}>
            <label htmlFor="">Price</label>
            <input type="number" />
          </div>

          <ColorPicker className={`${formStyle.shoe_form_inputs}`} />
          <Tag className={`${formStyle.shoe_form_inputs}`} />
          <div
            className={`${formStyle.shoe_form_inputs} ${formStyle.btns_ctn}`}
          >
            <Button>Save</Button>
            <Button>Clean Fields</Button>
          </div>
        </div>
        <ImageForm className={formStyle.shoe_form_images} />

        <div className={formStyle.shoe_configure}>
          <div className={formStyle.shoe_shoe_configure_ctn}>
            <div className={formStyle.shoe_configure_item}>
              <label>Color</label>
              <div className={formStyle.shoe_configure_color}></div>
            </div>
            <div
              className={`${formStyle.shoe_configure_item} ${formStyle.shoe_form_inputs} ${formStyle.number_ctn}`}
            >
              <label>Quantity</label>
              <input type="number" />
            </div>
            <div className={formStyle.shoe_configure_item}>
              <Button>
                <i className="fa-solid fa-trash"></i>
              </Button>
            </div>
          </div>

          <Tag className={`${formStyle.shoe_form_inputs}`} prompt="Size" />
        </div>
      </form>
    </div>
  );
}

export default AddShoeForm;

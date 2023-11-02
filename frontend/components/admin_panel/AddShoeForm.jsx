import formStyle from "./shoes_form.module.css";
import Button from "../Button";
import ImageForm from "./ImageForm";
import SizeCell from "./SizeCell";
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
            <input
              type="longtext"
              id="product_description"
              placeholder="Insert A description about the shoe"
            />
          </div>
          <div
            className={`${formStyle.shoe_form_inputs} ${formStyle.price_input_ctn}`}
          >
            <label htmlFor="">Price</label>
            <input type="number" />
          </div>
          <div
            className={`${formStyle.shoe_form_inputs} ${formStyle.color_input_ctn}`}
          >
            <div>
              <label htmlFor="">Color</label>
              <Button btnStyle="second_btn">
                <i className="fa-solid fa-plus"></i>
              </Button>
            </div>
            <div>
              <div></div>
            </div>
          </div>
          <div className={formStyle.shoe_form_inputs}>
            <div>
              <label htmlFor="">Tags</label>
              <Button btnStyle="second_btn">
                <i className="fa-solid fa-plus"></i>
              </Button>
            </div>
            <div>
              <div></div>
            </div>
          </div>

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
            <div className={formStyle.shoe_configure_item}>
              <label>Quantity</label>
              <input type="number" />
            </div>
            <div className={formStyle.shoe_configure_item}>
              <Button>
                <i className="fa-solid fa-trash"></i>
              </Button>
            </div>
          </div>
          <div className={formStyle.shoe_configure_item}>
            <label>Sizes</label>
            <SizeCell />
          </div>
        </div>
      </form>
    </div>
  );
}

export default AddShoeForm;

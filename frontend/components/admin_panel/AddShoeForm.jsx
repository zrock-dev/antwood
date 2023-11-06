import formStyle from "styles/stylecomponents/adminPanel/shoes_form.module.css";
import Button from "../Button";
import ShoeColorForm from "./ShoeColorForm";
import ColorPicker from "./ColorPicker";
import Tag from "./Tag";
import { useState } from "react";
import { Toaster, toast } from "sonner";
import useShoeForm from "../../hooks/useShoeForm";

function AddShoeForm(params) {
  const {
    isSaved,
    colorSelected,
    shoeForm,
    handleSelctedColor,
    handleChange,
    addTag,
    removeTag,
    addColor,
    resetShoeForm,
    saveShoes,
    resetColorSelection,
  } = useShoeForm(params);

  const verifyTagInput = (value) => {
    if (value.length > 15) {
      return false;
    } else {
      return true;
    }
  };

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
              value={shoeForm.name}
              onChange={handleChange}
              name="name"
            />
          </div>
          <div className={formStyle.shoe_form_inputs}>
            <label htmlFor="product_description">Description</label>
            <textarea
              id="product_description"
              placeholder="Write a description to your Shoe"
              cols="50"
              rows="8"
              value={shoeForm.description}
              name="description"
              onChange={handleChange}
            ></textarea>
          </div>
          <div className={`${formStyle.shoe_form_inputs} ${formStyle.pair}`}>
            <label htmlFor="">Price</label>
            <input
              type="number"
              value={shoeForm.price}
              onChange={handleChange}
              min={0}
              name="price"
            />
            <label htmlFor="brand">
              {isSaved ? "Brand" : "Select the Shoe Brand"}
            </label>
            {isSaved ? (
              shoeForm.brand
            ) : (
              <select
                id="brand"
                name="brand"
                onChange={handleChange}
                value={shoeForm.brand}
              >
                <option value="nike">Nike</option>
                <option value="adidas">Adidas</option>
                <option value="converse">Converse</option>
                <option value="jordan">Jordan</option>
                <option value="vans">Vans</option>
              </select>
            )}
          </div>
          <Tag
            className={`${formStyle.shoe_form_inputs}`}
            tagParams={shoeForm.tags}
            onAddTag={addTag}
            onRemove={removeTag}
            verifyInput={verifyTagInput}
          />

          <div
            className={`${formStyle.shoe_form_inputs} ${formStyle.btns_ctn}`}
          >
            <Button onClick={saveShoes}>{isSaved ? "Update" : "Save"}</Button>
            <Button onClick={resetShoeForm}>New Shoe</Button>
          </div>

          <ColorPicker
            className={`${formStyle.shoe_form_inputs} ${
              !isSaved && formStyle.disable
            }`}
            colors={shoeForm.colors}
            onSelectColor={handleSelctedColor}
          />
        </div>
        <div className={formStyle.image_form}>
          {colorSelected ? (
            <>
              <ShoeColorForm
                className={formStyle.shoe_form_images}
                colorSelected={colorSelected}
                idShoe={shoeForm.id}
                brand={shoeForm.brand}
                addColor={addColor}
                resetColorSelection={resetColorSelection}
              />
            </>
          ) : (
            <div className={formStyle.select_image}></div>
          )}
        </div>
      </form>
    </div>
  );
}

export default AddShoeForm;

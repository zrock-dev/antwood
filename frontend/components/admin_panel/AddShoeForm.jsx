import formStyle from "styles/stylecomponents/adminPanel/shoes_form.module.css";
import Button from "../Button";
import ImageForm from "./ImageForm";
import ColorPicker from "./ColorPicker";
import Tag from "./Tag";
import { useState } from "react";
import { Toaster, toast } from "sonner";
import FormManager from "../../service/ManageForm";

function AddShoeForm({ shoeParams, selectedbrand }) {
  const {
    isSaved,
    colorSelected,
    shoeForm,
    brand,
    handleSelctedColor,
    handleChange,
    addTag,
    removeTag,
    addColor,
    resetShoeForm,
    onAssignBrand,
    saveShoes,
  } = FormManager({
    shoeParams,
    selectedbrand,
  });

  return (
    <div className={formStyle.section}>
      <Toaster richColors />
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
              name="price"
            />
            <label for="brand">
              {isSaved ? "Brand" : "Select the Shoe Brand"}
            </label>
            {isSaved ? (
              brand
            ) : (
              <select
                id="brand"
                name="brand"
                onChange={onAssignBrand}
                value={brand}
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
          />

          <div
            className={`${formStyle.shoe_form_inputs} ${formStyle.btns_ctn}`}
          >
            <Button onClick={saveShoes}>{isSaved ? "Update" : "Save"}</Button>
            <Button onClick={resetShoeForm}>Clean Fields</Button>
          </div>


          <ColorPicker
            className={`${formStyle.shoe_form_inputs} ${!isSaved && formStyle.disable}`}
            colors={shoeForm.colors}
            onSelectColor={handleSelctedColor}
          />
        </div>
        <div className={formStyle.image_form}>
          {colorSelected ? (
            <>
              <ImageForm
                className={formStyle.shoe_form_images}
                colorSelected={colorSelected}
                idShoe={shoeForm.id}
                brand={brand}
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

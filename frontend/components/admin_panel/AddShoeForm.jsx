import formStyle from "./shoes_form.module.css";
import Button from "../Button";
import ImageForm from "./ImageForm";
import ColorPicker from "./ColorPicker";
import Tag from "./Tag";
import { useState } from "react";
import { saveShoe, updateShoe } from "../../request/shoes";
import { Toaster, toast } from "sonner";

const shoe = {
  id: "",
  name: "",
  description: "",
  price: 0,
  colors: [],
  tags: [],
};

function AddShoeForm({ shoeParams = shoe, selectedbrand }) {
  const [isSaved, setIsSaved] = useState(shoeParams.id ? true : false);

  const [colorSelected, setUserSelected] = useState("");
  const [shoeForm, setShoeForm] = useState(shoeParams);
  const [brand, setBrand] = useState(selectedbrand ? selectedbrand : "");
  const [availableBrand, setAvailableBrand] = useState(
    selectedbrand ? true : false
  );

  const handleSelctedColor = (color) => {
    setUserSelected(color);
  };

  const handleChange = (e) => {
    setShoeForm({
      ...shoeForm,
      [e.target.name]: e.target.value,
    });
  };

  const addTag = (tag) => {
    console.log(shoeForm.tags);
    setShoeForm({
      ...shoeForm,
      tags: [...shoeForm.tags, tag],
    });
  };
  const removeTag = (tag) => {
    const index = shoeForm.tags.indexOf(tag);
    if (index > -1) {
      shoeForm.tags.splice(index, 1);
      setShoeForm({
        ...shoeForm,
        tags: [...shoeForm.tags],
      });
    }
  };

  const addColor = (color) => {
    setShoeForm({
      ...shoeForm,
      colors: [...shoeForm.colors, color],
    });
  };

  const resetShoeForm = () => {
    setShoeForm(shoe);
  };

  const onAssignBrand = (e) => {
    setBrand(e.target.value);
  };
  const saveShoes = () => {
    if (isSaved) {
      updateShoesInformation();
    } else {
      shoeForm.price = parseFloat(shoeForm.price);
      saveShoe(shoeForm)
        .then((result) => {
          toast.success("Shoe saved successfully");
          shoeForm.id = result.data.id;
          setIsSaved(true);
        })
        .catch((err) => {
          toast.error("Shoe not saved");
          console.log(console.log(err));
        });
    }
  };

  const updateShoesInformation = () => {
    console.log(shoeForm);
    updateShoe(shoeForm)
      .then((result) => {
        toast.success("Shoe updated successfully");
      })
      .catch((err) => {
        console.log(err);
        toast.error("Shoe not updated");
      });
  };

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
            className={`${formStyle.shoe_form_inputs} ${
              !isSaved && formStyle.disable
            }`}
            colors={shoeForm.colors}
            onSelectColor={handleSelctedColor}
            addColor={addColor}
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

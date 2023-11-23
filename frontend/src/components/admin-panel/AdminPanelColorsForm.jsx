"use client"
import "@/styles/admin_panel/admin_panel_colors_form.css";
import ColorPicker from "./ColorPicker";
import Button from "../Button";
import { useState } from "react";
import { toast } from "sonner";
import { focusedImageStyle } from "@/utils/ImageFormUtils";
import { insertSneakerColor } from "@/requests/SneakersRequest";
import uuid4 from "uuid4";
const SIZE = {
  value: 0,
  quantity: 0,
};

const IMAGE = {
  url: "",
  id: "",
};

const SNEAKER_COLOR = {
  id: "",
  images: [
    {
      url: "https://res.cloudinary.com/dex16gvvy/image/upload/v1698842196/solestyle/product_images/Converse/rywp5fkxnzazalbe7gun.webp",
      id: "solestyle/product_images/Converse/rywp5fkxnzazalbe7gun",
    },
  ],
  sizes: [
    {
      value: 12,
      quantity: 12,
    },
  ],
};

const COLOR = {
  name: "",
  id: "",
};

const AdminPanelColorsForm = ({ sneaker, sneakerColors, setSneakerColors }) => {
  const [openSizeDropdown, setOpenSizeDropdown] = useState(false);
  const [openImageDropdown, setOpenImageDropdown] = useState(false);
  const [currSize, setCurrSize] = useState(SIZE);
  const [form, setForm] = useState(SNEAKER_COLOR);
  const [deletedImages, setDeletedImages] = useState([]);
  const [imageAdded, setImageAdded] = useState([]);
  const [colorSelected, setColorSelected] = useState(COLOR);

  const toggleSizeDropdown = () => {
    setOpenSizeDropdown(!openSizeDropdown);
  };

  const toggleImageDropdown = () => {
    setOpenImageDropdown(!openImageDropdown);
  };

  const onHandleSizeChange = (e) => {
    const { name, value } = e.target;

    if (name == "value" && (value > 15 || value < 0)) {
      return;
    }

    if (name == "quantity" && (value > 15 || value < 0)) {
      return;
    }

    setCurrSize({
      ...currSize,
      [name]: value,
    });
  };

  const onAddSize = () => {
    if (!currSize.value || !currSize.quantity) return;
    setForm({
      ...form,
      sizes: [...form.sizes, currSize],
    });
    setCurrSize(SIZE);
  };

  const onRemoveSize = (value) => {
    setForm({
      ...form,
      sizes: form.sizes.filter((s) => s.value != value),
    });
  };

  const onDeleteImage = (imageIdToDelete) => {
    setForm({
      ...form,
      images: form.images.filter((i) => i.id != imageIdToDelete),
    });
    setDeletedImages([...deletedImages, imageIdToDelete]);
  };

  const addImage = (e) => {
    const files = e.target.files;

    for (const file of files) {
      if (file.size > 1000000) {
        toast.error("File must be less than 1MB");
        return;
      }
      if (form.images.length + imageAdded.length + files.length >= 15) {
        toast.error("Cannot add more than 15 images");
        return;
      }

      const reader = new FileReader();
      const image = {
        file: file,
        url: "",
      };
      reader.onload = function (e) {
        image.url = e.target.result;
        setImageAdded((prevImages) => [...prevImages, image]);
      };
      reader.readAsDataURL(file);
    }
  };

  const onDeleteUploadedImage = (i) => {
    setImageAdded(imageAdded.filter((q, index) => index !== i));
  };

  const onSelectColor = (color) => {
    setColorSelected(color);
  };

  const onSubmitSneakerColor = async () => {
    const data = new FormData();
    console.log(data);
    console.log(colorSelected)

    data.append("color",1234);
    console.log(data);
     console.log(colorSelected.name);

    form.sizes.forEach((s) => {
      data.append("sizes[]", s.value);
      data.append("values[]", s.quantity);
    });

    deletedImages.forEach((d) => {
      data.append("deleted_images[]", d);
    });
    imageAdded.forEach((newImage) => {
      data.append("images[]", newImage.file);
    });
    data.append("brand", sneaker.brand);

    handleUploadColor(data);
  };

  const handleUploadColor = (data) => {
    console.log(data);
    console.log(form)
    toast.promise(insertSneakerColor(data, sneaker.id), {
      loading: "Adding Color",
      success: (result) => {
        form.id = result.id;
        colorSelected.id = result.id;
        setSneakerColors([...sneakerColors, colorSelected]);
        return "Color added successfully";
      },
      error: (w)=>{
        console.log(w)
        return "Error when adding color."
      },
    });
  };

  return (
    <div className="admin-panel-colors-ctn">
      <h3 className="admin-panel-form-title">SNEAKER COLORS</h3>
      <div className="admin-panel-colors-form">
        <div className="admin-panel-colors-form-item">
          <ColorPicker colors={sneakerColors} onSelectColor={onSelectColor} />
        </div>
        <div className="admin-panel-colors-form-droopdown-ctn">
          <div className="admin-panel-colors-form-droopdown">
            {!openSizeDropdown ? (
              <span>Sizes</span>
            ) : (
              <div className="admin-panel-colors-form-droopdown-inputs">
                <input
                  type="number"
                  value={currSize.value}
                  name="value"
                  onChange={onHandleSizeChange}
                />
                <input
                  type="number"
                  value={currSize.quantity}
                  name="quantity"
                  onChange={onHandleSizeChange}
                />
                <i className="fa-solid fa-plus" onClick={onAddSize}></i>
              </div>
            )}
            <i
              onClick={toggleSizeDropdown}
              className={`fa-solid fa-chevron-down ${
                openSizeDropdown ? "fa-rotate-180" : ""
              }`}
            ></i>
          </div>
          {openSizeDropdown && (
            <ul className="admin-panel-colors-droopdown-list">
              {form.sizes.map((size) => (
                <li
                  key={size.value}
                  className="admin-panel-colors-droopdown-size-item"
                >
                  <span>{size.value}</span>
                  <span>{size.quantity}</span>
                  <i
                    className="fa-solid fa-x"
                    onClick={() => onRemoveSize(size.value)}
                  ></i>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="admin-panel-colors-form-droopdown-ctn">
          <div className="admin-panel-colors-form-droopdown">
            {!openImageDropdown ? (
              <span>Images</span>
            ) : (
              <div className="admin-panel-colors-form-uploaded-button">
                <label htmlFor="file-upload">
                  <i className="fa-solid fa-upload"></i>
                </label>
                <input
                  type="file"
                  accept="image/*"
                  name="image"
                  id="file-upload"
                  onChange={addImage}
                  multiple
                />
              </div>
            )}
            <i
              onClick={toggleImageDropdown}
              className={`fa-solid fa-chevron-down ${
                openImageDropdown ? "fa-rotate-180" : ""
              }`}
            ></i>
          </div>
          {openImageDropdown && (
            <ul className="admin-panel-colors-droopdown-list">
              {form.images.map((image) => {
                return (
                  <li
                    key={image.id}
                    className="admin-panel-colors-droopdown-image-item"
                    style={focusedImageStyle(image.url)}
                  >
                    <i
                      className="fa-solid fa-x"
                      onClick={() => onDeleteImage(image.id)}
                    ></i>
                  </li>
                );
              })}
              {imageAdded.map((image, i) => {
                return (
                  <li
                    key={uuid4()}
                    className="admin-panel-colors-droopdown-image-item"
                    style={focusedImageStyle(image.url)}
                  >
                    <i
                      className="fa-solid fa-x"
                      onClick={() => onDeleteUploadedImage(i)}
                    ></i>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
        <div className="admin-panel-colors-form-btns">
          <Button onClick={onSubmitSneakerColor}>ADD COLOR</Button>
        </div>
      </div>
    </div>
  );
};

export default AdminPanelColorsForm;

import "@/styles/admin_panel/admin_panel_colors_form.css";
import ColorPicker from "./ColorPicker";
import Button from "../Button";
import { useState } from "react";
import { toast } from "sonner";
import { focusedImageStyle } from "@/utils/ImageFormUtils";
import uuid4 from "uuid4";
const SIZE = {
  value: 0,
  quantity: 0,
};

const IMAGE = {
  url: "",
  id: "",
}


const SNEAKER_COLOR = {
  name: "",
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

const AdminPanelColorsForm = () => {
  const [openSizeDropdown, setOpenSizeDropdown] = useState(false);
  const [openImageDropdown, setOpenImageDropdown] = useState(false);
  const [currSize, setCurrSize] = useState(SIZE);
  const [form, setForm] = useState(SNEAKER_COLOR);
  const [deletedImages, setDeletedImages] = useState([]);
  const [imageAdded, setImageAdded] = useState([]);

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
  }

  const onAddSize = () => {
    if (!currSize.value || !currSize.quantity) return;
    setForm({
       ...form,
      sizes: [...form.sizes, currSize]
    });
    setCurrSize(SIZE);
  };

  const onRemoveSize = (value) => {
    setForm({
      ...form,
      sizes: form.sizes.filter((s) => s.value != value),
    })
  }

  const onDeleteImage = (imageIdToDelete)=>{
    setForm({
      ...form,
      images: form.images.filter((i) => i.id != imageIdToDelete),
    })
    setDeletedImages([...deletedImages, imageIdToDelete])

  }

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

    const onDeleteUploadedImage = (i)=>{
       setImageAdded(imageAdded.filter((q, index) => index !== i));
    }




  return (
    <div className="admin-panel-colors-ctn">
      <h3 className="admin-panel-form-title">SNEAKER COLORS</h3>
      <div className="admin-panel-colors-form">
        <div className="admin-panel-colors-form-item">
          <ColorPicker />
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
          <Button>ADD COLOR</Button>
        </div>
      </div>
    </div>
  );
};

export default AdminPanelColorsForm;

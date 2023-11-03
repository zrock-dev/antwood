import imgStyle from "./shoes_image_form.module.css";
import Button from "../Button";
import Tag from "./Tag";
import { useState } from "react";
import { v4 as uuidv4, validate as uuidValidate } from "uuid";

import {
  addColorShoe,
  uploadShoeToStorageService,
  deleteImage,
  updateShoeColor,
} from "../../request/shoes";
import { Toaster, toast } from "sonner";

const focusedImageStyle = (url) => {
  return {
    backgroundImage: `url(${url})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
  };
};

const imageShoe = {
  id: "",
  color: "blue",
  quantity: 0,
  sizes: [],
  images: [],
};

function ImageForm({ className, colorSelected, idShoe, brand }) {
  imageShoe.color = colorSelected;

  const [imageForm, setImageForm] = useState(imageShoe);
  const [isSaved, setIsSaved] = useState(imageForm.id ? true : false);

  const handleChange = (e) => {
    setImageForm({
      ...imageForm,
      [e.target.name]: e.target.value,
    });
  };

  const onAddSizes = (size) => {
    const parsedSize = parseFloat(size);

    if (!isNaN(parsedSize)) {
      setImageForm({
        ...imageForm,
        sizes: [...imageForm.sizes, parsedSize],
      });
    } else {
      console.log("Invalid size");
    }
  };
  const uploadImage = async (e) => {
    const file = e.target.files[0];
    if (!file) {
      console.error("No file selected");
      return;
    }

    const formData = new FormData();
    formData.append("image", file);

    uploadShoeToStorageService(formData, idShoe, brand)
      .then((result) => {
        toast.success("Image uploaded successfully");
        console.log(result.data);
        setImageForm({
          ...imageForm,
          images: [...imageForm.images, result.data],
        });
      })
      .catch((err) => {
        toast.error("Error when uploading image.");
      });
  };

  const onRemoveProductImage = (e, id) => {
    deleteImage(id).then((result) => {
      let index = imageForm.images.findIndex((image) => image.id === id);
      imageForm.images.splice(index, 1);
      setImageForm({
        ...imageForm,
        images: [...imageForm.images],
      });
      toast.success("Image deleted successfully");
    });
  };

  const onRemoveSize = (size) => {
      imageForm.quantity = parseInt(imageForm.quantity);
    const index = imageForm.sizes.indexOf(size);
    if (index > -1) {
      imageForm.sizes.splice(index, 1);
      setImageForm({
        ...imageForm,
        sizes: [...imageForm.sizes],
      });
    }
  };

  const handleUploadColor = () => {
      imageForm.quantity = parseInt(imageForm.quantity);
    addColorShoe(imageForm, idShoe)
      .then((result) => {
        toast.success("Color added successfully");
        imageForm.id = result.data.id;
        setIsSaved(true);
      })
      .catch((err) => {
        toast.error("Error when adding color.");
      });
  };

  const onUpdateShoueColor = () => {
      imageForm.quantity = parseInt(imageForm.quantity);
    updateShoeColor(imageForm)
      .then((result) => {
        toast.success("Color updated successfully");
      })
      .catch((err) => {
        toast.error("Error when updating color.");
      });
  };

  return (
    <>
      <div className={`${imgStyle.img_form_ctn} ${className}`}>
        <div
          className={imgStyle.shoe_form_images}
          style={focusedImageStyle("default-image.png")}
        ></div>
        <ImagesProducts
          imageProducts={imageForm.images}
          onRemoveProductImage={onRemoveProductImage}
          uploadImage={uploadImage}
        />
      </div>
      <div className={imgStyle.shoe_configure}>
        <div className={imgStyle.shoe_shoe_configure_ctn}>
          <div className={imgStyle.shoe_configure_item}>
            <label>Color</label>
            <div
              className={imgStyle.shoe_configure_color}
              style={{ backgroundColor: colorSelected }}
            ></div>
          </div>
          <div
            className={`${imgStyle.shoe_configure_item} ${imgStyle.shoe_form_inputs} ${imgStyle.number_ctn}`}
          >
            <label>Quantity</label>
            <input
              type="number"
              name="quantity"
              value={imageForm.quantity}
              onChange={handleChange}
            />
          </div>
          <div className={imgStyle.shoe_configure_item}>
            <Button>
              <i className="fa-solid fa-trash"></i>
            </Button>
            <Button
              onClick={() => {
              
                if (isSaved) {
                  onUpdateShoueColor();
                } else {
                  handleUploadColor();
                }
              }}
            >
              {isSaved ? "Update" : "Save"}
            </Button>
          </div>
        </div>

        <Tag
          className={`${imgStyle.shoe_form_inputs}`}
          prompt="Size"
          tagParams={imageForm.sizes}
          onAddTag={onAddSizes}
          onRemove={onRemoveSize}
        />
      </div>
    </>
  );
}

const ImagesProducts = ({
  imageProducts,
  onRemoveProductImage,
  uploadImage,
}) => {
  return (
    <div className={imgStyle.available_images}>
      <div className={imgStyle.shoe_image_add_btn}>
        <label htmlFor="file-upload" className={imgStyle.first_btn}>
          <i className="fa fa-cloud-upload"></i> Upload Image
        </label>
        <input type="file" id="file-upload" onChange={(e) => uploadImage(e)} />
      </div>
      {console.log(imageProducts)}
      {imageProducts.map((q) => (
        <div
          key={uuidv4()}
          className={imgStyle.image_item}
          style={focusedImageStyle(q.url)}
        >
          <Button onClick={(e) => onRemoveProductImage(e, q.id)}>
            <i className="fa fa-x"></i>
          </Button>
        </div>
      ))}
    </div>
  );
};

export default ImageForm;

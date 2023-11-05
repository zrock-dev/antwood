import imgStyle from "styles/stylecomponents/adminPanel/shoes_image_form.module.css";
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
  const [newImages, setNewImages] = useState([]);
  const deletedImages = [];

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
      toast.error("Size must be a number");
    }
  };
  const addImage = (e) => {
    const files = e.target.files;

    for (const file of files) {
      const reader = new FileReader();
      const image = {
        file: file,
        url: "",
      };
      reader.onload = function (e) {
        image.url = e.target.result;
        setNewImages((prevImages) => [...prevImages, image]);
      };
      reader.readAsDataURL(file);
    }
  };

  const onRemoveProductImage = (e, index) => {
    deletedImages.push(imageForm.images[index].id);
    imageForm.images.splice(index, 1);
    setImageForm({
      ...imageForm,
      images: [...imageForm.images],
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

  const handleUploadColor = (form) => {
    toast.promise(addColorShoe(form, idShoe), {
      loading: "Adding Color",
      success: (result) => {
        imageForm.id = result.data.id;
        setIsSaved(true);
        return "Color added successfully";
      },
      error: "Error when adding color.",
    });
  };

  const onUpdateShoueColor = (form) => {
    toast.promise(updateShoeColor(form, imageForm.id), {
      loading: "Updating...",
      success: "Color updated successfully",
      error: (error)=>{
        console.log(error);
        return "Error when updating color.";
      },
    });
  };

  const onSubmitShoeColor = () => {
    const form = new FormData();
    imageForm.quantity = parseInt(imageForm.quantity);

    form.append("color", imageForm.color);
    form.append("quantity", imageForm.quantity);
    imageForm.sizes.forEach((s) => {
      form.append("sizes[]", s);
    });
    deletedImages.forEach((d) => {
      form.append("deleted_images[]", d.id);
    });
    newImages.forEach((newImage) => {
      form.append("images[]", newImage.file);
    });
    form.append("brand", brand);
    console.log(imageForm.sizes);
    console.log(newImages);

    if (isSaved) {
      onUpdateShoueColor(form);
    } else {
      handleUploadColor(form);
    }
  };

  const onRemoveNewImage = (e, i) => {
    setNewImages(newImages.filter((q, index) => index !== i));
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
          newImages={newImages}
          onRemoveNewImage={onRemoveNewImage}
          onRemoveProductImage={onRemoveProductImage}
          addImage={addImage}
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
            <Button onClick={onSubmitShoeColor}>
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

export default ImageForm;

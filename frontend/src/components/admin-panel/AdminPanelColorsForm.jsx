"use client";
import "@/styles/admin_panel/admin_panel_colors_form.css";
import ColorPicker from "./ColorPicker";
import Button from "../Button";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import {
  insertSneakerColor,
  getSneakerColorById,
  updateSneakerColorById,
} from "@/requests/SneakersRequest";
import Modal from "../Modal";
import SizeSelector from "./SizeSelectorForm";
import ImageSelector from "./ImageSelector";
import DeleteSneakerColorConfirmation from "@/components/admin/confirmations/DeleteSneakerColorConfirmation";
const SNEAKER_COLOR = {
  id: "",
  images: [],
  sizes: [],
};

const COLOR = {
  color: "",
  _id: "",
};

const AdminPanelColorsForm = ({
  editable,
  sneaker,
  sneakerColors,
  setSneakerColors,
}) => {
  const [openSizeDropdown, setOpenSizeDropdown] = useState(false);
  const [openImageDropdown, setOpenImageDropdown] = useState(false);
  const [form, setForm] = useState(SNEAKER_COLOR);
  const [deletedImages, setDeletedImages] = useState([]);
  const [imageAdded, setImageAdded] = useState([]);
  const [colorSelected, setColorSelected] = useState(COLOR);
  const [deleteModal, setDeleteModal] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false);

  const toggleSizeDropdown = () => {
    setOpenSizeDropdown(!openSizeDropdown);
  };

  const toggleImageDropdown = () => {
    setOpenImageDropdown(!openImageDropdown);
  };

  const onHandleColorChange = async () => {
    const res = await getSneakerColorById(colorSelected._id);
    setForm(res);
  };

  useEffect(() => {
    if (colorSelected._id !== "") {
      onHandleColorChange();
    } else {
      setForm(SNEAKER_COLOR);
      setOpenImageDropdown(false);
      setOpenSizeDropdown(false);
    }
     setImageAdded([]);
     setDeletedImages([]);
  }, [colorSelected]);

  useEffect(() => {
    if (sneaker._id === "") {
      setOpenImageDropdown(false);
      setOpenSizeDropdown(false);
      setForm(SNEAKER_COLOR);
      setColorSelected(COLOR);
    }
  }, [sneaker]);

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
      if (form.images.length + imageAdded.length + files.length >= 10) {
        toast.error("Cannot add more than 10 images");
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
    e.target.value = "";
  };

  const updateSneakerColor = async() => {
    if (!validateSneakerColor()) {
      return;
    }
    setIsProcessing(true);
    const data =  onSubmitSneakerColor();
    toast.promise(updateSneakerColorById(data, colorSelected._id), {
      loading: "Updating Color",
      success: (result) => {
        setDeletedImages([]);
        setImageAdded([]);
         setIsProcessing(false);
        onSelectColor(colorSelected)
           return "Color updated successfully";
      },
      error: ()=>{
         setIsProcessing(false);
    return  "Error when updating color."
      }
    });
  }
  const onDeleteUploadedImage = (i) => {
    setImageAdded(imageAdded.filter((q, index) => index !== i));

  };

  const onSelectColor = (color) => {
      if (colorSelected._id !== "" && (color._id === colorSelected._id)) {
        onHandleColorChange();
      }else{
        setColorSelected(color);
      }
  };

const validateSneakerColor = () => {
  if (form.sizes.length == 0 || (form.images.length == 0 && imageAdded.length == 0)) {
    toast.error("At least one Image and sizes are required.");
    return false;
  }
  return true;
}

  const onSubmitSneakerColor =  () => {
    const data = new FormData();
    data.append("color", colorSelected.color);

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

    return data;
  };

  const uploadSneakerColor = async () => {
    if (!validateSneakerColor()) {
      return;
    }
    setIsProcessing(true);
    const data =  onSubmitSneakerColor();
    
    toast.promise(insertSneakerColor(data, sneaker._id), {
      loading: "Adding Color",
      success: (result) => {
        setDeletedImages([]);
        setImageAdded([]);
        colorSelected._id = result.id
        onSelectColor(colorSelected)
        setSneakerColors([...sneakerColors, colorSelected]);
        setIsProcessing(false);
        return "Color added successfully";
      },
      error: (w) => {
         setIsProcessing(false);
        return "Error when adding color.";
      },
    });
  };

  const deleteSneakerColor =  () => {
    setDeleteModal(true)
  }

  const closeDeleteModal = () => {
    setDeleteModal(false)
  }


  return (
    <div
      className={`admin-panel-colors-ctn ${
        !editable ? "admin-panel-disabled" : ""
      }`}
    >
      <div className="admin-panel-color-form-title-ctn">
        <h3 className="admin-panel-form-title">SNEAKER COLORS</h3>
        <div
          className="selected-color"
          style={{
            backgroundColor: colorSelected.color,
            visibility: colorSelected?.color === "" ? "hidden" : "visible",
          }}
        ></div>
      </div>
      <div className="admin-panel-colors-form">
        <div className="admin-panel-colors-form-item">
          <ColorPicker colors={sneakerColors} onSelectColor={onSelectColor} />
        </div>
        <SizeSelector
          form={form}
          setForm={setForm}
          editable={editable}
          openSizeDropdown={openSizeDropdown}
          toggleSizeDropdown={toggleSizeDropdown}
          colorSelected={colorSelected}
        />
        <ImageSelector
          form={form}
          editable={editable}
          openImageDropdown={openImageDropdown}
          toggleImageDropdown={toggleImageDropdown}
          colorSelected={colorSelected}
          addImage={addImage}
          onDeleteUploadedImage={onDeleteUploadedImage}
          onDeleteImage={onDeleteImage}
          imageAdded={imageAdded}
        />

        <div
          className={`admin-panel-colors-form-btns ${isProcessing ? "admin-panel-disabled" : ""}`}
        >
          {colorSelected._id ? (
            <>
              <Button btnStyle="third_btn" onClick={updateSneakerColor}>
                UPDATE
              </Button>
              <Button onClick={deleteSneakerColor}>DELETE</Button>
            </>
          ) : (
            <Button
              className={`${
                !colorSelected.color ? "admin-panel-droopdown-disabled" : ""
              }`}
              onClick={uploadSneakerColor}
            >
              ADD COLOR
            </Button>
          )}
        </div>
      </div>
      <Modal isModalOpen={deleteModal} setModalOpen={setDeleteModal}>
        <DeleteSneakerColorConfirmation
          id={colorSelected._id}
          sneakerColorName={colorSelected.color}
          closeConfirmation={closeDeleteModal}
        />
      </Modal>
    </div>
  );
};

export default AdminPanelColorsForm;

import {
  addColorShoe,
  updateShoeColor,
  getColorById,
  deleteShoeColor,
} from "request/shoes";
import { toast } from "sonner";
import { useEffect, useState } from "react";
const defaultColorShoe = {
  id: "",
  quantity: 0,
  sizes: [],
  images: [],
};

function useShoeColorForm({
  className,
  colorSelected,
  idShoe,
  brand,
  addColor,
  resetColorSelection,
}) {
  if (colorSelected.id != "") {
    defaultColorShoe.id = colorSelected.id;
  }

  const [colorForm, setColorForm] = useState(defaultColorShoe);
  const [isSaved, setIsSaved] = useState(colorForm.id ? true : false);
  const [newImages, setNewImages] = useState([]);
  const [deletedImages, setDeletedImages] = useState([]);

  const handleChange = (e) => {
    let value = e.target.value;
    let name = e.target.name;

    if (value > 1500 || value < 0 || isNaN(value)) {
      return;
    }

    setColorForm({
      ...colorForm,
      [name]: value,
    });
  };

  const uploadColor = async () => {
    setNewImages([]);
    if (!colorSelected.id) {
      setIsSaved(false);
      setColorForm(defaultColorShoe);
      return;
    }

    setIsSaved(true);
    toast.promise(getColorById(colorSelected.id), {
      loading: "Loading...",
      success: (result) => {
        setColorForm(result.data);
        return "Uploaded!";
      },
      error: (err) => {
        console.log(err);
        return "Upload Failed!";
      },
    });
  };

  const onAddSizes = (size) => {
    if (colorForm.sizes.length >= 20) {
      toast.error("Cannot add more than 20 sizes");
      return;
    }

    console.log(colorForm.sizes);
    if(colorForm.sizes.includes(parseFloat(size))){
  
      toast.error("Size already added");
      return;

    }

    const parsedSize = parseFloat(size);

    if (!isNaN(parsedSize)) {
      setColorForm({
        ...colorForm,
        sizes: [...colorForm.sizes, parsedSize],
      });
    } else {
      toast.error("Size must be a number");
    }
  };

  const addImage = (e) => {
    const files = e.target.files;

    for (const file of files) {
      if(file.size > 1000000){
        toast.error("File must be less than 1MB");
        return;
      }
      if ((colorForm.images.length + newImages.length +files.length) >= 15) {
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
        setNewImages((prevImages) => [...prevImages, image]);
      };
      reader.readAsDataURL(file);
    }
  };

  const onRemoveProductImage = (e, index) => {
    setDeletedImages([...deletedImages, colorForm.images[index].id]);
    colorForm.images.splice(index, 1);
    setColorForm({
      ...colorForm,
      images: [...colorForm.images],
    });
  };

  const onRemoveSize = (size) => {
    colorForm.quantity = parseInt(colorForm.quantity);
    const index = colorForm.sizes.indexOf(size);
    if (index > -1) {
      colorForm.sizes.splice(index, 1);
      setColorForm({
        ...colorForm,
        sizes: [...colorForm.sizes],
      });
    }
  };

  const handleUploadColor = (form) => {
    toast.promise(addColorShoe(form, idShoe), {
      loading: "Adding Color",
      success: (result) => {
        colorForm.id = result.data.id;
        colorSelected.id = result.data.id;
        console.log(colorSelected);
        addColor(colorSelected);
        setIsSaved(true);
        return "Color added successfully";
      },
      error: "Error when adding color.",
    });
  };

  const onUpdateShoueColor = (form) => {
    console.log("THI IS", colorForm);
    toast.promise(updateShoeColor(form, colorForm.id), {
      loading: "Updating...",
      success: "Color updated successfully",
      error: (error) => {
        console.log(colorForm);
        console.log(error);
        return "Error when updating color.";
      },
    });
  };

  const onRemoveNewImage = (e, i) => {
    setNewImages(newImages.filter((q, index) => index !== i));
  };

  const onSubmitShoeColor = () => {
    if (!validateForm(colorForm)) {
      toast.error("All fields are required");
      return;
    }
    const form = new FormData();

    colorForm.quantity = parseInt(colorForm.quantity);

    form.append("color", colorSelected.color);
    form.append("quantity", colorForm.quantity);
    colorForm.sizes.forEach((s) => {
      form.append("sizes[]", s);
    });

    deletedImages.forEach((d) => {
      form.append("deleted_images[]", d);
    });
    newImages.forEach((newImage) => {
      form.append("images[]", newImage.file);
    });
    form.append("brand", brand);

    if (isSaved) {
      onUpdateShoueColor(form);
    } else {
      handleUploadColor(form);
    }
  };

  const validateForm = (form) => {
    let isValidForm = !(form.quantity == 0 || form.sizes.length == 0);

    if (isValidForm) {
      isValidForm = form.images.length > 0 || newImages.length > 0;
    }
    return isValidForm;
  };

  const onDeleteShoeColor = () => {
    if (!isSaved) {
      resetColorSelection();
      return;
    }
    toast.promise(deleteShoeColor(idShoe, colorSelected.id), {
      loading: "Deleting...",
      success: () => {
        setIsSaved(false);
        resetColorSelection();
        return "Color deleted successfully";
      },
      error: (error) => {
        console.log(colorForm);
        console.log(error);
        return "Error when deleting color.";
      },
    });
  };

  return {
    colorForm,
    colorSelected,
    handleChange,
    onAddSizes,
    addImage,
    onRemoveProductImage,
    onRemoveSize,
    uploadColor,
    onRemoveNewImage,
    handleUploadColor,
    onUpdateShoueColor,
    onSubmitShoeColor,
    onDeleteShoeColor,
    newImages,
    deletedImages,
    isSaved,
  };
}

export default useShoeColorForm;

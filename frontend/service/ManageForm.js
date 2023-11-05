import { useState } from "react";
import { toast } from "sonner";

import { saveShoe, updateShoe } from "../request/shoes";
const shoe = {
  id: "",
  name: "",
  description: "",
  price: 0,
  colors: [],
  tags: [],
};

function validateForm(form) {
  return !(
    form.name == "" ||
    form.description == "" ||
    form.price == 0 ||
    form.brand == "" ||
    form.tags.length == 0
  );
}

const FormManager = ({ shoeParams = shoe, selectedbrand }) => {
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
    if (!validateForm(shoeForm)) {
      toast.error("All fields are required");
      return;
    }
    if (shoeForm.price < 1) {
      toast.error("the price should be a postive number");
      return;
    }

    shoeForm.price = parseFloat(shoeForm.price);
    if (isSaved) {
      updateShoesInformation();
    } else {
      toast.promise(saveShoe(shoeForm), {
        loading: "Saving...",
        success: (result) => {
          shoeForm.id = result.data.id;
          setIsSaved(true);

          return "Shoe saved successfully";
        },
        error: (err) => {
          console.log(err);
          return "Error when saving";
        },
      });
    }
  };
  const updateShoesInformation = () => {
    toast.promise(updateShoe(shoeForm), {
      loading: "Updating...",
      success: (result) => {
        return "Shoe updated successfully";
      },
      error: "Error when updating",
    });
  };

  return {
    isSaved,
    colorSelected,
    shoeForm,
    brand,
    availableBrand,
    handleSelctedColor,
    handleChange,
    addTag,
    removeTag,
    addColor,
    resetShoeForm,
    onAssignBrand,
    saveShoes,
    updateShoesInformation,
  };
};

export default FormManager;

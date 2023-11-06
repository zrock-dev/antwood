import { useState } from "react";
import { toast } from "sonner";

import { saveShoe, updateShoe } from "../request/shoes";
const shoe = {
  id: "",
  name: "",
  description: "",
  brand: "nike",
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

const useShoeForm = ({ shoeParams = shoe }) => {
  const [isSaved, setIsSaved] = useState(shoeParams.id ? true : false);
  const [colorSelected, setColorSelected] = useState();
  const [shoeForm, setShoeForm] = useState(shoeParams);

  const handleSelctedColor = (color) => {
    setColorSelected(color);
  };

  const handleChange = (e) => {
    let value = e.target.value;
    let name = e.target.name;
    if (name == "price" && (value > 1500 || value < 0 || isNaN(value))) {
      return;
    }
    if (name == "name" && value.length > 50) {
      return;
    }

    if ((name == "description" && value.length > 2000)) {
      console.log("a");
      return;
    }

    setShoeForm({
      ...shoeForm,
      [name]: value,
    });
  };

  const addTag = (tag) => {
    if(shoeForm.tags.length >= 12){
      toast.error("you can't add more than 10 tags");
      return;
    }

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
    setColorSelected(null);
    setIsSaved(false);
    setShoeForm(shoe);
  };

  const resetColorSelection = () => {
    let index = shoeForm.colors.findIndex(
      (color) => color.color == colorSelected.color
    );
    console.log(colorSelected);
    shoeForm.colors.splice(index, 1);
    console.log(shoeForm.colors);
    setShoeForm({
      ...shoeForm,
      colors: [...shoeForm.colors],
    });
    setColorSelected(null);
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
    handleSelctedColor,
    handleChange,
    addTag,
    removeTag,
    addColor,
    resetShoeForm,
    saveShoes,
    updateShoesInformation,
    resetColorSelection,
  };
};

export default useShoeForm;

export const defaultFormError = {
  name: "",
  description: "",
  price: "",
  tags: "",
};

export const validateName = (name) => {
  const nameRegex = /^[a-zA-Z0-9\s.\-]+$/;
  return nameRegex.test(name);
};

export const validateDescription = (description) => {
  const descriptionRegex = /^[a-zA-Z0-9\s.\-]+$/;
  return  descriptionRegex.test(description);
};

export const validatePrice = (price) => {
  const priceRegex = /^(?![\d\.]*e\d)[\d.]+$/;
  return !isNaN(price) && priceRegex.test(price) && Number(price) > 0;
};

export const validateSneakerForm = (form, setError) => {
  const errors = { ...defaultFormError };
  let { name, description, price , tags} = form;
  let isFormValid = true;

  if (!validateName(name) || name.length < 6 ) {
    errors.name = "* Name should be at least 6 characters and without many blank spaces";
    isFormValid = false;
  }

  if (name.includes("   ")) {
      errors.name =
        "* Name should not contain more than two blank space";
      isFormValid = false;
    }

  if (!validateDescription(description) && description.length < 10) {
    errors.description = "* Description should be at least 10 characters";
    isFormValid = false;
  }

  if (!validatePrice(price)) {
    errors.price =
      "* Price should be a valid number greater than 0";
    isFormValid = false;
  }

  if (tags.length === 0) {
    errors.tags = "* At least one tag is required";
    isFormValid = false;
  }

  setError(errors);
  return isFormValid;
};


export const defaultForm = {
  username: "",
  email: "",
  password: "",
};

export const defaultFormError = {
  username: "",
  email: "",
  password: "",
};

export const isUsernameValid = (username) => {
  const regex = /^[a-zA-Z0-9\s.\-]+$/;
  return regex.test(username) && username.length >= 6 && !username.includes(" ");
};

export const isEmailValid = (email) => {
  const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return regex.test(email) && email.length <= 50 && !email.includes(" ") && !email.includes("@gufum.com") && !email.includes("..");
};

export const isPasswordValid = (password) => {
  const regex = /^[a-zA-Z0-9\s.\-]+$/;
  return regex.test(password) && password.length >= 6 && !password.includes(" ");
};



export const validateSignupForm = (form, setError) => {
  const errors = { ...defaultFormError }
  let isFormValid = true;

  if (!isUsernameValid(form.username)) {
    errors.username =
      "Minimum 6 characters, allowing letters  a-z, A-Z, 0-9,., -";
    isFormValid = false;
  }

  if (!isEmailValid(form.email)) {
    errors.email = "Please enter a valid email address";
    isFormValid = false;
  }

  if (!isPasswordValid(form.password)) {
    errors.password =
      "Minimum 6 characters, allowing letters  a-z, A-Z, 0-9, ., -";
    isFormValid = false;
  }
  setError(errors);
  return isFormValid;
};


export const validateSigninForm = (form, setError) => {
  const errors = { ...defaultFormError }
  let isFormValid = true;
  if (!isEmailValid(form.email)) {
    errors.email = "Please enter a valid email address";
    isFormValid = false;
  }

  if (!isPasswordValid(form.password)) {
    errors.password = "Minimum 6 characters, allowing letters  a-z, A-Z, 0-9, ., -";
    isFormValid = false;
  }
  setError(errors)

  return isFormValid;
};
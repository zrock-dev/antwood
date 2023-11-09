export const isUsernameValid = (username) => {
  const regex = /^[a-zA-Z0-9\s.\-]+$/;
  return regex.test(username) && username.length >= 6;
};

export const isEmailValid = (email) => {
  const regex = /^[a-zA-Z0-9\s,@.\-]+$/;
  const emailRegex = /^[a-zA-Z0-9\s,@.\-]+@gmail\.com$/;
  return regex.test(email) && emailRegex.test(email) && email.length <= 50;
};

export const isPasswordValid = (password) => {
  const regex = /^[a-zA-Z0-9\s.\-]+$/;
  return regex.test(password) && password.length >= 6;
};



export const validateSignupForm = (form,setError) => {
      const errors = {
        username: "",
        email: "",
        password: "",
      };

  let isFormValid = true;

  if (!isUsernameValid(form.username)) {
    errors.username =
      "Minimum 6 characters, allowing letters  a-z, A-Z, 0-9, ., -";
    isFormValid = false;
  }

  if (!isEmailValid(form.email)) {
    errors.email = "Please enter a valid Gmail email address";
    isFormValid = false;
  }

  if (!isPasswordValid(form.password)) {
    errors.password =
      "Minimum 6 characters, allowing letters  a-z, A-Z, 0-9, ., -, or _";
    isFormValid = false;
  }  
  setError(errors);
  return isFormValid;
};


export const validateSigninForm = (form, setError) => {
      const errors = {
        username: "",
        email: "",
        password: "",
      };

  let isFormValid = true;
  if (!isEmailValid(form.email)) {
    errors.email = "Please enter a valid Gmail email address";
    isFormValid = false;
  }

  if (!isPasswordValid(form.password)) {
    errors.password = "Minimum 6 characters, allowing letters  a-z, A-Z, 0-9, ., -, or _";
    isFormValid = false;
  }
  setError(errors)

  return isFormValid ;
};
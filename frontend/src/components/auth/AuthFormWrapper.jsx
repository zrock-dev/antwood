"use client";
import { useState } from "react";
import authStyle from "@/styles/auth/auth.module.css";
import Button from "../Button";
import {
  validateSignupForm,
  validateSigninForm,
} from "@/utils/AuthFormValidations";
import useAuthHandler from "@/hooks/AuthOperations";
import { defaultFormError, defaultForm } from "@/utils/AuthFormValidations";
import GoogleSignInButton from "@/components/auth/GoogleSignInButton";
import EmailVerificationDialog from "@/components/auth/EmailVerificationDialog";

function AuthFormWrapper({ isModalOpen }) {
  const [form, setForm] = useState(defaultForm);
  const [hasAccount, setHasAccount] = useState(false);
  const [error, setError] = useState(defaultFormError);
  const { onSignin, onSignup, verifyUserExists } = useAuthHandler();
  const [startVerification, setStartVerification] = useState(false)

  const handleAuth = () => {
    resetForm();
    setHasAccount(!hasAccount);
  };

  const resetForm = () => {
    setForm(defaultForm);
    setError(defaultFormError);
  };

  const handleOnChange = (e) => {
    let { name, value } = e.target;
    value = value.trim();
    const maxLength = name === "email" ? 50 : 20;
    if (value.length > maxLength) {
      return;
    }
    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleSignIn = async () => {
    if (!hasAccount) {
      if (validateSigninForm(form, setError)) onSignin(form, "solestyle");
    } else if (validateSignupForm(form, setError)) {
      let exist = await verifyUserExists(form.email);
      if (!exist) {
        setStartVerification(true)
      }
    }
  };


  const renderErrorMessage = (fieldName) => {
    if (error[fieldName]) {
      return (
        <span className={authStyle.error_message}>{error[fieldName]}</span>
      );
    }
    return null;
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && isModalOpen) {
      handleSignIn();
    }
  };


  const handleSuccessEmailVerification = () => {
    onSignup(form, "solestyle").catch((err) => {console.error(err)})
  }

  return (
    <div className={authStyle.auth_ctn}>
      <div>
        <h3>{hasAccount ? "Sign Up" : "Sign In"}</h3>
        <p className={authStyle.subtitle}>SoleStyle*</p>
      </div>
      <GoogleSignInButton
          hasAccount={hasAccount}
      />
      <div className={authStyle.delimiter}>o</div>
      <form className={authStyle.form_inputs}>
        <div>
          {hasAccount && (
            <>
              <input
                type="text"
                placeholder="Username"
                value={form.username}
                name="username"
                onChange={handleOnChange}
              />
              {renderErrorMessage("username")}
            </>
          )}
          <input
            type="email"
            placeholder="Email"
            value={form.email}
            name="email"
            onChange={handleOnChange}
          />
          {renderErrorMessage("email")}
          <input
            type="password"
            placeholder="Password"
            value={form.password}
            name="password"
            onChange={handleOnChange}
            onKeyDown={handleKeyPress}
            autoComplete="on"
          />
          {renderErrorMessage("password")}{" "}
        </div>
        <Button className={authStyle.btn} onClick={handleSignIn}>
          {hasAccount ? "Sign Up" : "Sign In"}
        </Button>
      </form>
      <p className={authStyle.suggestion}>
        {hasAccount ? "Already have an account?" : "Don't have an account?"}{" "}
        <span onClick={handleAuth}>{hasAccount ? "Sign In" : "Sign Up"}</span>
      </p>
      <EmailVerificationDialog
          startPoint={startVerification}
          verificationSuccessHandler={handleSuccessEmailVerification}
          email={form.email}
      />
    </div>
  );
}

export default AuthFormWrapper;

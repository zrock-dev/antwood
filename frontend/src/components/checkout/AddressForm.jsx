import React from "react";
import { AddressElement, useElements } from "@stripe/react-stripe-js";
import Button from "../Button";
import {useState} from "react";
const AddressForm = ({
  addresConfirmed,
  setAddresConfirmed,
  address,
  setAddress,
}) => {
  const [isCompletedAddress, setIsCompletedAddress] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const elements = useElements();

  const handleOnChaneg = (e) => {
    setAddress(e.value);
    setIsCompletedAddress(e.complete);
  };

  const handleOnSubmit =async () => {

    const result = await elements.submit();

    if (result.error) {
      console.log(result.error?.message);
      return;
    }


    const alphabeticRegex = /^[A-Za-zñÑáéíóúÁÉÍÓÚüÜ\s]+$/;

    if (
      address.address.line1.length > 100 ||
      address.address.line2?.length > 100 ||
      address.address.city.length > 100 ||
      address.address.postal_code.length > 20 ||
      address.name.length > 100
    ) {
      setErrorMessage("the fields must be less than 100 characters and corrects");
      return;
    }

   if (address.name || address.address.city) {
      if (!alphabeticRegex.test(address.name) && !alphabeticRegex.test(address.address.city)) {
        setErrorMessage("The name and city fields must contain only alphabetic characters and spaces");
        return;
      }

    if (!alphabeticRegex.test(address.name)){
      setErrorMessage("The name field must contain only alphabetic characters and spaces");
      return;
    }
     if (!alphabeticRegex.test(address.address.city)) {
      setErrorMessage("The city field must contain only alphabetic characters and spaces");
      return;
    }
   }


    if (isCompletedAddress) {
      setAddresConfirmed(true);
      setErrorMessage("");
    }
  };

  return (
    <div className="checkout-form-section">
      <div className="checkout-form-title">
        <h3>Address</h3>{" "}
        {addresConfirmed && (
          <a
            onClick={() => {
              setAddresConfirmed(false);
            }}
          >
            Edit
          </a>
        )}
      </div>
      <div className={addresConfirmed ? "checkout-disabled-addresss" : ""}>
        <AddressElement
          options={{
            allowedCountries: ["US","ES","MX","CO","CL","AU","AR","BO"],
            mode: "shipping",
          }}
          onChange={handleOnChaneg}
        />
      </div>
      <span className="checkout-email-error">{errorMessage}</span>
      {!addresConfirmed && (
        <div className="checkout-pay-btn-ctn">
          {
            <Button type="submit" onClick={handleOnSubmit}>
              Continue
            </Button>
          }
        </div>
      )}
    </div>
  );
};

export default AddressForm;

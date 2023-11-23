import React from "react";
import { AddressElement } from "@stripe/react-stripe-js";
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

  const handleOnChaneg = (e) => {
    setAddress(e.value);
    setIsCompletedAddress(e.complete);
  };

  const handleOnSubmit = () => {
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

    if (isCompletedAddress) {
      setAddresConfirmed(true);
      setErrorMessage("");
    } else {
      setErrorMessage("Please enter a valid address fields, just line 2 is optional");
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

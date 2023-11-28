import "@/styles/admin_panel/admin_panel_sizes.css";
import { useState, useEffect } from "react";
import uuid4 from "uuid4";

const SIZE = {
  value: 0,
  quantity: 0,
};
const SizeSelector = ({
  form,
  setForm,
  editable,
  openSizeDropdown,
  toggleSizeDropdown,
  colorSelected,
}) => {
  const [currSize, setCurrSize] = useState(SIZE);
  const [isEditing, setIsEditing] = useState(false);
  const [indexToEdit, setIndexToEdit] = useState(0);
  const [sizeMessage, setSizeMessage] = useState("");

  const onHandleSizeChange = (e) => {
    let { name, value } = e.target;

    if (value.length == 0 && currSize[name].length == 1) {
      setCurrSize({
        ...currSize,
        [name]: 0,
      });
      return;
    }

    value = value.replace(/^0+/, "");

    if (
      name === "value" &&
      (value > 80 ||
        value < 0 ||
        !/^[0-9]+(\.[0-9]{0,1})?$/.test(value) ||
        value.includes(".0"))
    ) {
      return;
    }

    if (
      name == "quantity" &&
      (value > 3000 || value < 0 || !/^[0-9]+$/.test(value))
    ) {
      return;
    }

    setCurrSize({
      ...currSize,
      [name]: value,
    });
  };

  useEffect(() => {
    setCurrSize(SIZE);
  }, [colorSelected, form]);

  const onAddSize = () => {
    if (!validateInput()) {
      return;
    }

    const updatedSizes = [...form.sizes, { ...currSize }];

    updatedSizes.sort((a, b) => {
      return a.value - b.value;
    });

    setForm((prevForm) => ({
      ...prevForm,
      sizes: updatedSizes,
    }));

    setCurrSize({ ...SIZE });
  };
  const onEdit = (sizeToEdit) => {
    setIsEditing(true);
    setCurrSize(sizeToEdit);
    setIndexToEdit(form.sizes.indexOf(sizeToEdit));
  };

  const validateInput = () => {
    const { value, quantity } = currSize;

    if (!value || !quantity) {
      displayMessage("Quantity and Size should be greater than 0");
      return false;
    }

    const sizeExists = form.sizes.some((s) => s.value === value);

    if (sizeExists) {
      displayMessage("Size already exists");
      return false;
    }

    setSizeMessage("");
    return true;
  };

  const displayMessage = (message) => {
    setSizeMessage(message);
    setTimeout(() => {
      setSizeMessage("");
    }, 3000);
  };

  const onRemoveSize = (value) => {
    setForm({
      ...form,
      sizes: form.sizes.filter((s) => s.value != value),
    });
  };

  const onEditSize = () => {
    if (!validateInput()) return;
    setForm({
      ...form,
      sizes: form.sizes.map((s, i) => {
        if (i == indexToEdit) {
          return currSize;
        }
        return s;
      }),
    });
  };

  const cancelEdit = () => {
    setIsEditing(false);
    setIndexToEdit(-1);
    setCurrSize(SIZE);
  };

  const handleOnKeyDown = (e) => {
    if (e.key === "Enter") {
      if (isEditing) {
        onEditSize();
      } else {
        onAddSize();
      }
    }
  };

  return (
    <div className="admin-panel-colors-form-droopdown-ctn">
      <div
        className={`admin-panel-colors-form-droopdown ${
          !colorSelected.color || colorSelected?.name === ""
            ? "admin-panel-droopdown-disabled"
            : ""
        }`}
      >
        {!openSizeDropdown ? (
          <span>Sizes</span>
        ) : (
          <div className="admin-panel-colors-form-droopdown-inputs">
            <input
              type="number"
              value={currSize.value}
              name="value"
              onChange={onHandleSizeChange}
              onKeyDown={handleOnKeyDown}
            />
            <input
              type="number"
              value={currSize.quantity}
              name="quantity"
              onChange={onHandleSizeChange}
              onKeyDown={handleOnKeyDown}
            />
            {!isEditing ? (
              <i className="fa-solid fa-plus" onClick={onAddSize}></i>
            ) : (
              <>
                <i className="fa-solid fa-x" onClick={cancelEdit}></i>
                <i className="fa-solid fa-check" onClick={onEditSize}></i>
              </>
            )}
          </div>
        )}
        <i
          onClick={toggleSizeDropdown}
          className={`fa-solid fa-chevron-down ${
            openSizeDropdown ? "fa-rotate-180" : ""
          }`}
        ></i>
        <span className="message-error">{sizeMessage}</span>
      </div>
      {openSizeDropdown && (
        <ul className="admin-panel-colors-droopdown-list">
          {form.sizes.map((size) => (
            <li
              key={uuid4()}
              className="admin-panel-colors-droopdown-size-item"
            >
              <div
                className="admin-panel-size-item"
                onClick={() => onEdit(size)}
              >
                <span>{size.value}</span>
                <span>{size.quantity}</span>
              </div>
              <i
                className="fa-solid fa-x"
                onClick={() => onRemoveSize(size.value)}
              ></i>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SizeSelector;

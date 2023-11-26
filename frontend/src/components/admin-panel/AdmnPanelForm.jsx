"use client";
import "@/styles/admin_panel/admin_panel_form.css";
import TagSelector from "./TagSelector";
import Button from "../Button";
import { useState } from "react";
import {
  validateSneakerForm,
  validateName,
  validatePrice,
} from "@/utils/SneakerFormValidation";

export const DEFAULT_FAIL_FORM = {
  name: "",
  description: "",
  price: "",
  tags: "",
};

const AdminPanelForm = ({ form, setForm, resetForm, saveSneaker }) => {
  const [formError, setFormError] = useState(DEFAULT_FAIL_FORM);
  const [reset, setReset] = useState(false);

  const handleChange = (e) => {
    let value = e.target.value;
    let name = e.target.name;

    if (value === "") {
      setForm({
        ...form,
        [name]: "",
      });
      return;
    }

    if (name === "description") {
      const lines = value.split("\n");
      if (lines.length > 10 || value.length > 450) {
        return;
      }
    }

    if (name == "price" && (value > 3000 || !validatePrice(value))) {
      return;
    }

    if (name == "name" && (value.length > 60 || !validateName(value))) {
      return;
    }

    if (name == "price") {
      setForm({
        ...form,
        [name]: Number(value),
      });
    } else {
      setForm({
        ...form,
        [name]: value,
      });
    }
  };

  const addTag = (tag) => {
    setForm({
      ...form,
      tags: [...form.tags, tag],
    });
  };

  const removeTag = (tag) => {

    const index = form.tags.indexOf(tag);
    if (index > -1) {
      form.tags.splice(index, 1);
      setForm({
        ...form,
        tags: [...form.tags],
      });
    }
  };

  const handleSubmit = () => {
    if (validateSneakerForm(form, setFormError)) {
      saveSneaker();
    } else {
      setTimeout(() => {
        setFormError(DEFAULT_FAIL_FORM);
      }, 3000);
    }
  };

  const handleReset = () => {
    resetForm();
    setReset(true);
    setFormError(DEFAULT_FAIL_FORM);
  };


  const addTagError = (message) => {
    setFormError({
      ...formError,
      tags: message,
    });
    setTimeout(() => {
      setFormError(DEFAULT_FAIL_FORM)
    }, 3000);
  };
  return (
    <div className="admin-panel-form-ctn">
      <h3 className="admin-panel-form-title">SNEAKER</h3>
      <form className="admin-panel-form">
        <div className="admin-panel-form-item">
          <input
            type="text"
            name="name"
            placeholder="Product name"
            value={form.name}
            onChange={handleChange}
          />
          <span>{formError.name}</span>
        </div>

        <div className="admin-panel-form-item">
          <textarea
            name="description"
            placeholder="Description"
            value={form.description}
            onChange={handleChange}
          ></textarea>
          <span>{formError.description}</span>
        </div>

        <div className="admin-panel-form-item">
          <input
            type="number"
            name="price"
            placeholder="Price"
            value={form.price}
            onChange={handleChange}
          />
          <span>{formError.price}</span>
        </div>
        <select
          id="brand"
          name="brand"
          placeholder="Brand"
          value={form.brand}
          onChange={handleChange}
          disabled={form.id !== "" ? true : false}
        >
          <option value="Nike">Nike</option>
          <option value="Adidas">Adidas</option>
          <option value="Converse">Converse</option>
          <option value="Jordan">Jordan</option>
          <option value="Vans">Vans</option>
        </select>
        <TagSelector
          tags={form.tags}
          addTags={addTag}
          removeTags={removeTag}
          reset={reset}
          tagError={formError.tags}
          addTagError={addTagError}
        />
        <div className="admin-panel-form-btns">
          <Button btnStyle="third_btn" onClick={handleReset}>
            CANCEL
          </Button>

          <Button btnStyle="main_btn" onClick={handleSubmit}>
            {form.id === "" ? "ADD NEW SNENAKER" : "UPDATE SNEAKER"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AdminPanelForm;

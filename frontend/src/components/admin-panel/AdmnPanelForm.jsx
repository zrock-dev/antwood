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
import Modal from "../Modal";

import DeleteSneakerConfirmation from "../admin/confirmations/DeleteSneakerConfirmation";
import { toast } from "sonner";
export const DEFAULT_FAIL_FORM = {
  name: "",
  description: "",
  price: "",
  tags: "",
};

const AdminPanelForm = ({ form, setForm, resetForm, saveSneaker }) => {
  const [formError, setFormError] = useState(DEFAULT_FAIL_FORM);
  const [reset, setReset] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleChange = (e) => {
    let value = e.target.value;
    let name = e.target.name;
  
    if (value === "") {
        setForm({
          ...form,
          [name]: name === "price" ? 0 : "",
        });
      return;
    }


    if (name === "description") {
      const lines = value.split("\n");
      if (lines.length > 10 || value.length > 450) {
        return;
      }
    }

    if (name === "price") {
      value = value.replace(/^0+/, "");
      if (value > 3000 || value < 0 || !validatePrice(value) ) {
        return;
      }
    }

    if (name == "name" && (value.length > 60 || !validateName(value))) {
      return;
    }

    if (name === "price") {
      setForm({
        ...form,
        [name]: value,
      });
    } else if (name === "name") {
      setForm({
        ...form,
        [name]: toUpperCamelCase(value),
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
  const toUpperCamelCase = (text) => {
    const words = text
      .toLowerCase()
      .split(/[\s]+/)
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1));

    return words.join(" ");
  };

  const handleSubmit = () => {
    if (validateSneakerForm(form, setFormError)) {
          setIsProcessing(true);
      toast.promise(saveSneaker(), {
        loading: "Saving...",
        success: ()=> {
          setIsProcessing(false);
       return    form._id? "Sneaker updated successfully" : "Sneaker created successfully";
        },
        error: (e)=>{
          setIsProcessing(false);

        return  "Wait a moment and try again";
        },
      })
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
      setFormError(DEFAULT_FAIL_FORM);
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

        <div className="admin-panel-form-item ">
          <input
            type="number"
            name="price"
            placeholder="Price"
            value={form.price}
            onChange={handleChange}
          />
          <span>{formError.price}</span>
          <i className="fa-solid fa-dollar-sign admin-panel-form-price-concurrency"></i>
        </div>
        <select
          id="brand"
          name="brand"
          placeholder="Brand"
          value={form.brand}
          onChange={handleChange}
          disabled={form._id !== "" ? true : false}
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
        <div className={`admin-panel-form-btns ${isProcessing? "disabled" : ""}`}>
          {form._id === "" ? (
            <Button btnStyle="third_btn" onClick={handleReset}>
              CANCEL
            </Button>
          ) : (
            <Button
              btnStyle="third_btn"
              onClick={() => setOpenDeleteModal(true)}
            >
              DELETE
            </Button>
          )}

          <Button btnStyle="main_btn" onClick={handleSubmit}>
            {form._id === "" ? "ADD NEW SNENAKER" : "UPDATE SNEAKER"}
          </Button>
        </div>
      </form>
      <Modal isModalOpen={openDeleteModal} setModalOpen={setOpenDeleteModal}>
        <DeleteSneakerConfirmation
          id={form?._id}
          sneakerName={form.name}
          closeConfirmation={() => setOpenDeleteModal(false)}
        />
      </Modal>
    </div>
  );
};

export default AdminPanelForm;

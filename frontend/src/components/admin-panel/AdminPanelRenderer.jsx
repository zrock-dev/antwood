"use client";
import "@/styles/admin_panel/admin_panel.css";
import AdminPanelForm from "./AdmnPanelForm";

import { createSneaker, updateSneakerById } from "@/requests/SneakersRequest";
import AdminPanelColorsForm from "./AdminPanelColorsForm";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { getSneakerById } from "@/requests/SneakersRequest";
const SNEAKER_DATA = {
  _id: "",
  name: "",
  description: "",
  price: 0,
  brand: "Nike",
  tags: [],
};

const AdminPanelRenderer = ({ id }) => {
  const [form, setForm] = useState(SNEAKER_DATA);
  const [sneakerColors, setSneakerColors] = useState([]);
  const [loading, setLoading] = useState(false);

  const resetForm = () => {
    if (id) {
      setFormValue();
    } else {
      setSneakerColors([]);
      setForm(SNEAKER_DATA);
    }
  };

  const saveSneaker = async () => {
    form.price = parseFloat(form.price);
    if (id) {
      updateSneaker();
    } else {
      toast.info("sneaker saved");
      const res = await createSneaker(form);
      setForm({
        ...form,
        _id: res.id,
      });
    }
  };

  const updateSneaker = async () => {
    const data = await updateSneakerById(form);
    if (data) {
      toast.info("sneaker updated");
    }
  };

  const setFormValue = async () => {
    try {
      setLoading(true);
      const sneaker = await getSneakerById(id);
      setForm(sneaker);
      setSneakerColors(sneaker.colors);
    } catch (err) {
      window.location.replace("/");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      setFormValue();
    }
  }, []);

  return (
    <>
      {loading ? (
        <div className="admin-panel-loading"></div>
      ) : (
        <div className="admin-panel-ctn">
          <AdminPanelForm
            form={form}
            setForm={setForm}
            resetForm={resetForm}
            saveSneaker={saveSneaker}
          />
          <AdminPanelColorsForm
            editable={form?._id === "" ? false : true}
            sneaker={form}
            sneakerColors={sneakerColors}
            setSneakerColors={setSneakerColors}
            brand={"adidas"}
          />
        </div>
      )}
    </>
  );
};

export default AdminPanelRenderer;

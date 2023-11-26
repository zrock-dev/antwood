"use client";
import "@/styles/admin_panel/admin_panel.css";
import AdminPanelForm from "./AdmnPanelForm";

import { createSneaker, updateSneakerById } from "@/requests/SneakersRequest";
import AdminPanelColorsForm from "./AdminPanelColorsForm";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { getSneakerById } from "@/requests/SneakersRequest";
const SNEAKER_DATA = {
  id: "",
  name: "",
  description: "",
  price: "",
  brand: "Nike",
  tags: [],
};

const AdminPanelRenderer = ({ id }) => {
  const [form, setForm] = useState(SNEAKER_DATA);
  const [sneakerColors, setSneakerColors] = useState([]);

  const resetForm = () => {
    if (id) {
      setFormValue();
    } else {
      setSneakerColors([]);
      setForm(SNEAKER_DATA);
    }
  };

  const saveSneaker = async () => {
   if (id){
      updateSneaker()
   }else{
     toast.info("sneaker saved");
     const res = await createSneaker(form);
     setForm({
       ...form,
       id: res._id,
     });
   }
  };


  const updateSneaker  = async()=>{
    form._id = form.id
    form.id = undefined
    const data  = await updateSneakerById(form)
    if(data){
      toast.info("sneaker updated")
    }
  }

  const setFormValue = async () => {
    const sneaker = await getSneakerById(id);
    console.log(sneaker);
    sneaker.id = sneaker._id;
    sneaker._id =  undefined
    setForm(sneaker);

    setSneakerColors(sneaker.colors);
  };

  useEffect(() => {
    if (id) {
      setFormValue();
    }
  }, []);

  return (
    <div className="admin-panel-ctn">
      <AdminPanelForm
        form={form}
        setForm={setForm}
        resetForm={resetForm}
        saveSneaker={saveSneaker}
      />
      <AdminPanelColorsForm
        editable={form?.id === "" ? false : true}
        sneaker={form}
        sneakerColors={sneakerColors}
        setSneakerColors={setSneakerColors}
        brand={"adidas"}
      />
    </div>
  );
};

export default AdminPanelRenderer;

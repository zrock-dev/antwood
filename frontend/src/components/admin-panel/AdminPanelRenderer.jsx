"use client"
import "@/styles/admin_panel/admin_panel.css"
import AdminPanelForm from "./AdmnPanelForm"

import { createSneaker } from "@/requests/SneakersRequest";
import AdminPanelColorsForm from "./AdminPanelColorsForm";
import { useState } from "react";
import { toast } from "sonner";
const SNEAKER_DATA = {
  id: "655f4fa80c294c7b8e1cbfd5",
  name: "",
  description: "",
  price: "",
  brand: "adidas",
  tags: [],
};


const AdminPanelRenderer = () => {
    const [form, setForm] = useState(SNEAKER_DATA);
    const [sneakerColors, setSneakerColors] = useState([{
      name: "red",
    }]);
  
    const resetForm = () => {
        setForm(SNEAKER_DATA)
    }

    const saveSneaker = async()=>{
        toast.info('sneaker saved')
        const res = await createSneaker(form)
        console.log(res)
        setForm(
            {
                ...form,
                id: res.id
            }
        )
  }



    return (
      <div className="admin-panel-ctn">
        <AdminPanelForm
          form={form}
          setForm={setForm}
          resetForm={resetForm}
          saveSneaker={saveSneaker}
        />
        {form.id !== "" && (
          <AdminPanelColorsForm
            sneaker={form}
            sneakerColors={sneakerColors}
            setSneakerColors={setSneakerColors}
            brand={"adidas"}
          />
        )}
      </div>
    );
}

export default AdminPanelRenderer
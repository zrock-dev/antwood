"use client"
import "@/styles/admin_panel/admin_panel.css"
import AdminPanelForm from "./AdmnPanelForm"
import AdminPanelColorsForm from "./AdminPanelColorsForm";
import { useState } from "react";
import { toast } from "sonner";
const SNEAKER_DATA = {
  name: "",
  description: "",
  price: "",
  brand: "",
  tags: [],
};


const AdminPanelRenderer = () => {
    const [form, setForm] = useState(SNEAKER_DATA);
  
    const resetForm = () => {
        setForm(SNEAKER_DATA)
    }

    const saveSneaker = ()=>{
        toast.info('sneaker saved')
       // resetForm()
    }


    return (
      <div className="admin-panel-ctn">
        <AdminPanelForm
          form={form}
          setForm={setForm}
          resetForm={resetForm}
          saveSneaker={saveSneaker}
        />
        <AdminPanelColorsForm  setForm={setForm}/>
       
      </div>
    );
}

export default AdminPanelRenderer
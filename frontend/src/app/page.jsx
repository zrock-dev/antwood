"use client";
import Layout from "@/components/Layout";
import ProductSuggestions from "@/components/products/product_renderers/ProductSuggestions";
import "../styles/landing_page/page.css";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import "@/styles/payment/payment_messages.css";
export default function LandingPage() {
const [successPayment, setSuccessPayment] =useState(true);
const [cancelPayment, setCancelPayment] =useState(false);
  useEffect(() => {
    if (window.location.href.includes("success")) {
		setSuccessPayment(true);
	}else if (window.location.href.includes("cancel")) {
		setCancelPayment(true);
	}
  }, []);


  return (
    <Layout>
      <div className={`payment-status-container ${successPayment && "active"}`}>
        {successPayment && "Payment Successful"}
        {cancelPayment && "Payment Failed"}
      </div>
      <main className="landing-page-main-container">
        <span className="vertical-separator"></span>
        <span className="subtitle">Our suggestions for you</span>
        <ProductSuggestions />
      </main>
    </Layout>
  );
}

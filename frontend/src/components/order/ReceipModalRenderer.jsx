import "@/styles/order/receipt_modal.css";
import Modal from "../Modal";
import { dateParser } from "@/utils/Parser";
import { useEffect, useRef } from "react";

const ReceiptModalRenderer = ({
  displayReceiptDetails,
  setDisplayReceiptDetails,
  order,
}) => {

  return (
    <Modal
      isModalOpen={displayReceiptDetails}
      setModalOpen={setDisplayReceiptDetails}
    >
      <div className="receipt-ctn">
        <div>
          <div className="receipt-header">
            <h3>Receipt</h3>
            <div className="receipt-details">
              <p>
                <b>Order Id : </b> {order?.id}
              </p>
              <p>
                <b>Date : </b>
                {dateParser(order?.date)}
              </p>
            </div>
          </div>
          <hr size="6" color="black"></hr>
          <table className="receipt-table ">
            <tr>
              <th>Description</th>
              <th>Size</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Total</th>
            </tr>
          </table>
          <div
            className={`receipt-table-ctn ${
              order?.products.length >= 4 ? "scrolled" : ""
            }`}
          >
            <table className={"receipt-table"}>
              {order?.products.map((product) => {
                return (
                  <>
                    <tr key={product.id}>
                      <td className="receipt-product-name">{product.name}</td>
                      <td>{product.size}</td>
                      <td>${product.price}</td>
                      <td>{product.amount}</td>
                      <td>${product.subtotal}</td>
                    </tr>
                  </>
                );
              })}
            </table>
          </div>
          <table className="receipt-table">
            <tr className="receipt-total-row">
              <td className="receipt-details-column">Subtotal</td>
              <td></td>
              <td></td>
              <td></td>
              <td>${order?.subtotal}</td>
            </tr>
            <tr>
              <td className="receipt-details-column">Sales Tax</td>
              <td></td>
              <td></td>
              <td></td>
              <td>$100</td>
            </tr>
            <tr className="receipt-total-row">
              <td className="receipt-details-column">Total</td>
              <td></td>
              <td></td>
              <td></td>
              <td>${order?.total}</td>
            </tr>
          </table>

          <div className="receipt-details">
            <div>
              <h4>Billed to</h4>
              <p> Name : {order?.shipping.name}</p>
              <p> Email : {order?.email}</p>
            </div>
            <div>
              <h4>Address</h4>
              <p>
                {order?.shipping.address.country}
                {"  ,   "}
                {order?.shipping.address.postal_code}
              </p>
              <p>
                {order?.shipping.address.city}
                {","} {order?.shipping.address.state}
              </p>
              <p>{order?.shipping.address.line1}</p>
              <p>{order?.shipping.address.line2}</p>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default ReceiptModalRenderer;

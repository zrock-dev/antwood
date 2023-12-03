import { useState, useEffect, useRef } from "react";
import { getUserOrders } from "../../requests/OrderRequest";
import { useAuth } from "@/context/AuthContext";
import "@/styles/order/order.css";
import ReceiptModalRenderer from "./ReceipModalRenderer";
import Pagination from "./Pagination";
import { dateParser } from "@/utils/Parser";
import PaymentMessage from "@/components/PaymentMessage";


const OrderRenderer = () => {
  const [orders, setOrders] = useState([]);
  const [order, setOrder] = useState();
  const [loading, setLoading] = useState(false);
  const [displayReceiptDetails, setDisplayReceiptDetails] = useState(false);
  const { user, isAuthenticated } = useAuth();
  const paginationRef = useRef(1);

  const fetchOrders = async (ordersPage) => {
    if (user) {
      setLoading(true);
      const res = await getUserOrders(user.email, ordersPage);
      setOrders(res.orders ? res.orders : []);
      paginationRef.current = res.totalPages;
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders(1);
  }, [isAuthenticated]);

  const showOrderDetails = (order) => {
    setOrder(order);
    setDisplayReceiptDetails(true);
  };

  return (
    <>
      <PaymentMessage promise={() => fetchOrders(1)} />
      <div className="orders-ctn">
        <div className={`orders ${loading ? "receipt-loading" : ""}`}>
          {orders &&
            orders.map((order, index) => {
              return (
                <div
                  className={`order ${loading ? "receipt-loading-order" : ""}`}
                  key={order.id}
                  onClick={() => showOrderDetails(order)}
                >
                  <div>
                    <p>Date : {dateParser(order.date)}</p>
                  </div>
                  <div className="order-products-ctn">
                    <div>
                      <p>Products</p>
                      <p>Total Items : {order.totalItems}</p>
                      <p>SubTotal Price : ${order.subtotal}</p>
                      <p>Sales Taxes : ${order.extra}</p>
                      <p>Total Price : ${order.total}</p>
                    </div>
                    <div className="order-shipping-ctn">
                      <p>Shipping Address</p>
                      <p>{order?.shipping.address.country}</p>
                      <p>{order?.shipping.address.postal_code}</p>
                      <p>{order?.shipping.address.city}</p>
                      <p>{order?.shipping.address.state}</p>
                      <p>{order?.shipping.address.line1}</p>
                      <p>{order?.shipping.address.line2}</p>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
        {loading && (
          <div className="loader-ctn">
            <div className="loader black"></div>
          </div>
        )}
        {paginationRef.current > 1 && (
          <Pagination
            totalPages={paginationRef.current}
            setPage={fetchOrders}
          />
        )}
        {displayReceiptDetails && (
          <ReceiptModalRenderer
            displayReceiptDetails={displayReceiptDetails}
            setDisplayReceiptDetails={setDisplayReceiptDetails}
            order={order}
            setOrder={setOrder}
          />
        )}
      </div>
    </>
  );
};

export default OrderRenderer;

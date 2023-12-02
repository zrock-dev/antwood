import "@/styles/order/receipt_modal.css";
import Modal from "../Modal";
import { dateParser } from "@/utils/Parser";
import { useEffect , useState} from "react";
import { getSneakerQuantities } from "@/requests/SneakersRequest";
const ReceiptModalRenderer = ({
  displayReceiptDetails,
  setDisplayReceiptDetails,
  order,
  setOrder
}) => {
  const [loading, setLoading] = useState(false);

  const getCurrentSneakerQuantities = async (dataRequest) => {
    let dataResult = await getSneakerQuantities(dataRequest);
    for (let i = 0; i < order?.products.length; i++) {
      if (!dataResult[i].image){
              order.products[i].image = ""
      }
    }

    setOrder({
      ...order,
      products: order.products
    })
    setLoading(false);
  };

  useEffect(() => {
    if (displayReceiptDetails && order && order?.products) {
      setLoading(true);
      let dataRequest = [];
      for (let i = 0; i < order?.products.length; i++) {
        dataRequest.push({
          sneakerId: order?.products[i].sneakerId,
          sneakerColorId: order?.products[i].sneakerColorId,
          size: order?.products[i].size,
          quantity: order?.products[i].amount,
        });
      }
      getCurrentSneakerQuantities(dataRequest);
    }
  }, [displayReceiptDetails]);

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
                  <b>Date : </b>
                  {dateParser(order?.date)}
                </p>
              </div>
            </div>
            <hr size="6" color="black"></hr>
            <table className="receipt-table ">
              <tr>
                <th>Image</th>
                <th className="receipt-product-name-header">Description</th>
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
              {loading ? (
                <div className="loader-ctn receipt-ctn-loader">
                  <div className="loader black"></div>
                </div>
              ) : (
                <table className={"receipt-table"}>
                  {order?.products.map((product) => {
                    return (
                      <>
                        <tr key={product.id}>
                          <td>
                            {product.image === "" ? (
                              <span>-</span>
                            ) : (
                              <img
                                src={product.image}
                                alt=""
                                className="receipt-product-image"
                              />
                            )}
                          </td>
                          <td className="receipt-product-name">
                            {product.name}
                          </td>
                          <td>{product.size}</td>
                          <td>${product.price}</td>
                          <td>{product.amount}</td>
                          <td>${product.subtotal}</td>
                        </tr>
                      </>
                    );
                  })}
                </table>
              )}
            </div>
            <table className="receipt-table">
              <tr className="receipt-total-row">
                <td className="receipt-details-column">Subtotal</td>
                <td className="receipt-details-column-name"></td>
                <td></td>
                <td></td>
                <td></td>
                <td>${order?.subtotal}</td>
              </tr>
              <tr>
                <td className="receipt-details-column">Sales Tax</td>
                <td className="receipt-details-column-name"></td>
                <td></td>
                <td></td>
                <td></td>
                <td>${order?.extra}</td>
              </tr>
              <tr className="receipt-total-row">
                <td className="receipt-details-column">Total</td>
                <td className="receipt-details-column-name"></td>
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

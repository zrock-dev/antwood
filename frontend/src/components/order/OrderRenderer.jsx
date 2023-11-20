import { useState , useEffect} from "react"
import {getUserOrders} from "../../requests/OrderRequest"
import { useAuth } from "@/context/AuthContext"

const OrderRenderer = () => {
    const  [orders , setOrders] = useState([])
    const {user, isAuthenticated} = useAuth()
  
    useEffect(() => {
           const fetchOrders = async () => {
             if (user) {
               const res = await getUserOrders(user.email);
                setOrders(res.orders);
             }
           };
         fetchOrders()
    },[isAuthenticated])

    return (
      <>
        <div></div>
      </>
    );
}


export default OrderRenderer
import { useState } from "react"
import { createPayment } from "@/requests/PaymentRequest"
const usePayment  =()=>{

    const [payment, setPayment] = useState({})
    
    const initPayment = async (email) => {
    try{
        const link = await createPayment(email)

        window.location.href = link.url
    }catch(error){
        console.log(error)
    }
    }

    return {
        initPayment
    }
}

export default usePayment
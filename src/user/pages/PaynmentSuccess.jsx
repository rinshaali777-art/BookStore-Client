import React from 'react'
import UserHeader from '../components/UserHeader'
import { FaCheckCircle } from "react-icons/fa";
import { verifyPaymentAPI } from '../../services/allApi';
import { useEffect } from 'react';


function PaynmentSuccess() {

    const verifyPayment = async ()=>{
        const sessionId =  new URLSearchParams(window.location.search).get("session_id")

        const res = await verifyPaymentAPI({sessionId})
        console.log(res);
    }

    useEffect(()=>{
        verifyPayment()
    },[])

  return (
    <>
    <UserHeader/>
    <div className="h-[calc(100vh-160px)] flex items-center justify-center bg-[#eef3ff] px-4 py-8">
      <div className="w-full max-w-[480px] rounded-2xl bg-white px-6 py-8 text-center shadow-[0_15px_30px_rgba(0,0,0,0.12)] sm:px-10">
        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[#dcfce7]">
          <FaCheckCircle className="text-2xl text-[#35b779]" />
        </div>

        <h1 className="mb-2 text-2xl font-bold text-[#21834b]">
          Payment Successful!
        </h1>

        <p className="mb-4 text-xs text-gray-600">
          Thank you for your purchase.
        </p>

        <button
          onClick={() => (window.location.href = "/all-books")}
          className="rounded-full bg-[#4f46e5] px-5 py-2 text-xs font-medium text-white shadow-md transition duration-300 hover:bg-[#4338ca] hover:shadow-lg"
        >
          Back to Home
        </button>
      </div>
    </div>
    </>
  )
}

export default PaynmentSuccess
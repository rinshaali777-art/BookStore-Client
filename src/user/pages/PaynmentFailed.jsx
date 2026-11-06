import React from 'react'
import UserHeader from '../components/UserHeader'


function PaynmentFailed() {
  return (
    <>
    <UserHeader/>
    <div>
        <div className="flex h-[calc(100vh-160px)] items-center justify-center bg-[#f3f4f6] px-4">
      <div className="w-full max-w-[370px] rounded-xl bg-white px-8 py-7 text-center shadow-lg">

        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-b from-red-500 to-red-700 shadow-sm">
          <span className="text-6xl font-bold leading-none text-white">
            ×
          </span>
        </div>

        <h1 className="mb-3 text-xl font-semibold text-gray-900">
          Payment Failed
        </h1>

        <p className="mb-7 text-sm leading-5 text-gray-500">
          Your payment could not be processed.
          <br />
          Please try again or use a different method.
        </p>

        <button
          onClick={() => window.history.back()}
          className="w-full rounded-lg bg-gradient-to-r from-red-500 to-red-700 py-3 text-base font-medium text-white transition duration-300 hover:from-red-600 hover:to-red-800"
        >
          Try Again
        </button>

      </div>
    </div>
    </div>

    
    </>
  )
}

export default PaynmentFailed
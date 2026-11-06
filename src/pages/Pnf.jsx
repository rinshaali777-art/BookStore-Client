
import React, { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { routerContext } from '../context/RouterGuardContext'

function Pnf() {

  const { role, authorizedUser } = useContext(routerContext)
  const navigate = useNavigate()

  const backToHome = () => {
    if (role == 'user') {
      navigate('/')
    }
    else {
      navigate('/admin-dashboard')
    }
  }

  return (
    <div className="min-h-[85vh] flex items-center justify-center px-4 bg-gradient-to-br from-slate-50 via-white to-blue-50">

      <div className="max-w-2xl w-full text-center flex flex-col items-center">

        {/* 404 Image */}
        <div className="relative mb-6">
          <div className="absolute inset-0 bg-blue-100 blur-3xl opacity-50 rounded-full"></div>

          <img
            src="https://tse4.mm.bing.net/th/id/OIP.4rhE5qUBh2f2L8wpG3tv0AHaFj?r=0&rs=1&pid=ImgDetMain&o=7&rm=3"
            alt="Page not found"
            className="relative w-full max-w-[340px] h-auto object-contain"
          />
        </div>

        {/* Error Text */}
        <span className="text-7xl sm:text-8xl font-extrabold text-blue-600 tracking-wider">
          404
        </span>

        <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mt-3">
          Oops! Page Not Found
        </h2>

        <p className="text-gray-500 mt-3 text-sm sm:text-base max-w-md leading-7">
          Sorry, we couldn't find the page you're looking for.
          The page may have been moved, deleted, or the link might be incorrect.
        </p>

        {/* Back Button */}
        <div className="mt-8">
          {
            authorizedUser ?
              <button
                onClick={backToHome}
                className="px-8 py-3 bg-blue-600 text-white font-semibold rounded-xl shadow-lg shadow-blue-200 hover:bg-blue-700 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
              >
                <i className="fa-solid fa-house mr-2"></i>
                Back to Home
              </button>
              :
              <Link
                to={'/'}
                className="inline-block px-8 py-3 bg-blue-600 text-white font-semibold rounded-xl shadow-lg shadow-blue-200 hover:bg-blue-700 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
              >
                <i className="fa-solid fa-house mr-2"></i>
                Back to BookStore
              </Link>
          }
        </div>

        <p className="text-xs text-gray-400 mt-10">
          Error Code: 404 | Page Not Found
        </p>

      </div>
    </div>
  )
}

export default Pnf

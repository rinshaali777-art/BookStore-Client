import { faHouse } from '@fortawesome/free-regular-svg-icons'
import { faBook, faGear } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import axiosInstance from '../../api/axiosinstance'

function Sidebar() {

   const [userDp, setuserDp] = useState('')
    const [userName, setuserName] = useState('')

   useEffect(() => {
  
      if (sessionStorage.getItem("user")) {

        const user = JSON.parse(sessionStorage.getItem("user"))
        setuserDp(user.picture)
        setuserName(user.username)
      }
    }, [])


  return (
    <div className='flex h-full flex-col gap-4 bg-slate-900 p-4 text-white sm:p-5 md:min-h-full md:gap-8 md:px-5 md:py-8'>
      <div className='flex items-center gap-3 md:flex-col md:gap-4'>
        <img className='h-28 w-28 rounded-full object-cover sm:h-40 sm:w-40' src={userDp == "" ? 'https://static.vecteezy.com/system/resources/previews/019/879/186/non_2x/user-icon-on-transparent-background-free-png.png' : userDp?.startsWith('https://lh3.googleusercontent.com') ? userDp : `${axiosInstance.defaults.baseURL}/uploads/${userDp}`} alt="" />
        <h1 className='text-base font-bold tracking-tight sm:text-lg md:text-center md:text-xl'>Bookstore Admin</h1>
      </div>

      <nav aria-label='Admin navigation' className='grid grid-cols-3 gap-2 md:flex md:flex-col md:gap-2'>
        <Link
          to={'/admin-dashboard'}
          className='flex min-h-11 items-center justify-center gap-2 rounded-lg px-2 py-2 text-sm font-semibold text-slate-200 transition-colors hover:bg-white/10 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-300 md:justify-start md:px-3 md:text-base'
        >
          <FontAwesomeIcon icon={faHouse} className='shrink-0' aria-hidden='true' />
          <span>Home</span>
        </Link>
        <Link
          to={'/admin-resource'}
          className='flex min-h-11 items-center justify-center gap-2 rounded-lg px-2 py-2 text-sm font-semibold text-slate-200 transition-colors hover:bg-white/10 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-300 md:justify-start md:px-3 md:text-base'
        >
          <FontAwesomeIcon icon={faBook} className='shrink-0' aria-hidden='true' />
          <span>All Books</span>
        </Link>
        <Link
          to={'/admin-settings'}
          className='flex min-h-11 items-center justify-center gap-2 rounded-lg px-2 py-2 text-sm font-semibold text-slate-200 transition-colors hover:bg-white/10 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-300 md:justify-start md:px-3 md:text-base'
        >
          <FontAwesomeIcon icon={faGear} className='shrink-0' aria-hidden='true' />
          <span>Settings</span>
        </Link>
      </nav>
    </div>
  )
}

export default Sidebar
import { faFacebook, faInstagram, faTwitter } from '@fortawesome/free-brands-svg-icons'
import { faUser } from '@fortawesome/free-regular-svg-icons'
import { faBars } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useState } from 'react'
import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import axiosInstance from '../../api/axiosinstance'


function UserHeader() {
  const [listStatus, setListStatus] = useState(false)
  const [token, setToken] = useState('')
  const [userDp, setuserDp] = useState('')
  const [dropDown, setDropDown] = useState(false)
  const [userId, setUserId] = useState('')

  useEffect(() => {

    if (sessionStorage.getItem("user") && sessionStorage.getItem("token")) {
      const userToken = sessionStorage.getItem('token')
      const user = JSON.parse(sessionStorage.getItem("user"))
      setToken(userToken)
      setuserDp(user.picture)
      setUserId(user._id)
    }
  }, [token])

  const logout = () => {
    sesssionStorage.clear()
    setToken('')
    setuserDp('')
    setUserId('')
    navigate('/login')
  }

  // const imageSrc = userDp?.startsWith('https://')
  //   ? userDp
  //   : userDp
  //     ? `${axiosInstance.defaults.baseURL}/uploads/${userDp}`
  //     : 'https://static.vecteezy.com/system/resources/previews/019/879/186/non_2x/user-icon-on-transparent-background-free-png.png'

  return (
    <>
      <header className='flex items-center justify-between gap-3 bg-white px-4 py-3 shadow-sm sm:px-6'>
        <div className='flex min-w-0 items-center gap-2 sm:gap-3'>
          <img src="https://bookstore-wine-nu.vercel.app/logo.png" alt="Bookstore" className='h-10 w-10 shrink-0 object-contain sm:h-12 sm:w-12' />
          <h1 className='truncate text-lg font-bold tracking-tight text-slate-900 sm:text-2xl'>BOOKSTORE</h1>
        </div>
        <div className='hidden items-center gap-4 md:flex lg:gap-5'>
          <FontAwesomeIcon icon={faInstagram} className='text-xl text-slate-600' />
          <FontAwesomeIcon icon={faTwitter} className='text-xl text-slate-600' />
          <FontAwesomeIcon icon={faFacebook} className='text-xl text-slate-600' />
          {!token ?
            <Link to={'/login'} className='inline-flex min-h-10 items-center gap-2 rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 transition-colors hover:bg-blue-50 hover:text-blue-900'> <FontAwesomeIcon icon={faUser} /> Login</Link>
            : <div className='relative'>
              {/* profile */}
              <button onClick={() => setDropDown(!dropDown)} className='rounded-full p-1 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-900'>
                <img src={userDp == "" ? 'https://static.vecteezy.com/system/resources/previews/019/879/186/non_2x/user-icon-on-transparent-background-free-png.png' : userDp?.startsWith('https://lh3.googleusercontent.com')?userDp:`${axiosInstance.defaults.baseURL}/uploads/${userDp}`} alt="" className='h-10 w-10 rounded-full object-cover ring-2 ring-slate-200 sm:h-11 sm:w-11' />

                {/* <img src={imageSrc} alt="" width={'50px'} height={'50px'} style={{ borderRadius: '50%' }} onError={(e) => {
                  e.currentTarget.src = '/default-avatar.png'
                }} /> */}
              </button>
              {/* dropdown */}
              {dropDown &&
                <div className='absolute right-0 top-full z-20 mt-2 w-40 rounded-xl bg-white p-2 text-slate-900 shadow-lg ring-1 ring-black/10'>

                  <Link to={'/profile/userId'} className='block rounded-lg px-3 py-2 text-sm hover:bg-slate-100'>Profile</Link>
                  <Link className='block rounded-lg px-3 py-2 text-sm hover:bg-slate-100' to={'/login'}>Logout</Link>

                </div>
              }
            </div>
          }
        </div>
      </header>
      <nav className='bg-slate-900 px-4 py-3 font-semibold text-white sm:px-6 md:flex md:items-center md:justify-center' aria-label='Main navigation'>

        <div className='flex w-full items-center justify-between md:hidden'>
          <button onClick={() => setListStatus(!listStatus)} aria-label='Toggle navigation' className='rounded-lg p-2 transition-colors hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white'>
            <FontAwesomeIcon icon={faBars} className='text-xl' />
          </button>
          {!token ?
            <Link to={'/login'} className='inline-flex min-h-10 items-center gap-2 rounded-lg border border-white/30 px-4 py-2 text-sm hover:bg-white/10'> <FontAwesomeIcon icon={faUser} /> Login</Link>
            : <div className='relative'>
              {/* profile */}
              <button onClick={() => setDropDown(!dropDown)} className='rounded-full p-1 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white'>
                <img src={userDp == "" ? 'https://static.vecteezy.com/system/resources/previews/019/879/186/non_2x/user-icon-on-transparent-background-free-png.png' : userDp?.startsWith('https://') ? userDp : `${axiosInstance.defaults.baseURL}/uploads/${userDp}`} alt="" className='h-10 w-10 rounded-full object-cover ring-2 ring-white/50' />

                {/* <img src={imageSrc} alt="" width={'50px'} height={'50px'} style={{ borderRadius: '50%' }} onError={(e) => {
                  e.currentTarget.src = '/default-avatar.png'
                }} /> */}
              </button>
              {/* dropdown */}
              {dropDown &&
                <div className='absolute right-0 top-full z-20 mt-2 w-40 rounded-xl bg-white p-2 text-slate-900 shadow-lg ring-1 ring-black/10'>

                  <Link to={'/profile/userId'} className='block rounded-lg px-3 py-2 text-sm hover:bg-slate-100'>Profile</Link>
                  <Link className='block rounded-lg px-3 py-2 text-sm hover:bg-slate-100' to={'/login'} onClick={logout}>
                    Logout
                  </Link>

                </div>
              }
            </div>
          }
        </div>

        <div className={listStatus ? 'mt-3 flex flex-col gap-1 border-t border-white/10 pt-3 md:mt-0 md:flex-row md:gap-2 md:border-0 md:pt-0' : 'hidden md:flex md:gap-2'}>
          <Link to={'/'} className='rounded-lg px-4 py-2 text-sm transition-colors hover:bg-white/10'>Home</Link>
          <Link to={'/all-books'} className='rounded-lg px-4 py-2 text-sm transition-colors hover:bg-white/10'>Books</Link>
          <Link to={'/contact'} className='rounded-lg px-4 py-2 text-sm transition-colors hover:bg-white/10'>Contact</Link>
        </div>
      </nav>
    </>
  )
}

export default UserHeader

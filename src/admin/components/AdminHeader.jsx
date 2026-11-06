import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

function AdminHeader() {

  const navigate = useNavigate()
  const logout = () => {
    sessionStorage.clear()
    navigate('/login')
  }

  return (
    <>
      <header className='flex min-h-16 items-center justify-between gap-3 bg-white px-4 py-3 shadow-sm sm:px-6'>
        <div className='flex min-w-0 items-center gap-2 sm:gap-3'>
          <img
            src="https://bookstore-wine-nu.vercel.app/logo.png"
            alt="Bookstore"
            className='h-10 w-10 shrink-0 object-contain sm:h-12 sm:w-12'
          />
          <h1 className='truncate text-lg font-bold tracking-tight text-slate-900 sm:text-2xl lg:text-3xl'>BOOKSTORE</h1>
        </div>

        <Link
          to={'/login'}
          className='inline-flex min-h-10 shrink-0 items-center justify-center gap-2 rounded-lg border border-slate-300 px-3 py-2 text-sm font-semibold text-slate-700 transition-colors hover:border-blue-900 hover:bg-blue-50 hover:text-blue-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-900 sm:px-4' onClick={logout}
        >
          <FontAwesomeIcon icon={faRightFromBracket} aria-hidden='true' />
          <span>Logout</span>
        </Link>
      </header>
      <nav className='w-full bg-blue-950 px-4 py-3 text-center text-sm leading-6 text-white sm:px-6 sm:text-base' aria-label='Admin welcome'>
        <p className='mx-auto max-w-5xl'>
          Welcome,  Admin! You're all set to manage and monitor the system. Let’s get to work!
        </p>
      </nav>
    </>
  )
}

export default AdminHeader
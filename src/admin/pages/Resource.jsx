import { useState } from 'react'
import AdminHeader from '../components/AdminHeader'
import Sidebar from '../components/Sidebar'
import { Link } from 'react-router-dom'
import { useEffect } from 'react'
import { BooksApi,editBookStatusApi ,getUserApi} from '../../services/allApi'
import axiosInstance from '../../api/axiosinstance'



function Resource() {
  const [booklistStatus, setbooklistStatus] = useState(true)
  const [userlistStatus, setuserlistStatus] = useState(false)
  const [allBooks, setAllBooks] = useState([])
  const [allUsers, setAllUsers] = useState([])


  useEffect(() => {
    if(booklistStatus){
      getBooks()
    }
    else {
      getUsers()
    }  
  }, [booklistStatus,userlistStatus])

  const getBooks = async () => {
    const res = await BooksApi()
    console.log(res);
    setAllBooks(res.data)

  }

  const getUsers= async()=>{
    const res = await getUserApi()
    // console.log(res);
    setAllUsers(res.data)
    
  }

  const updateBookStatus = async (id) => {
    const res = await editBookStatusApi(id)
    console.log(res);
    if (res.status === 200) {
      getBooks()
    }
  }

  return (
    <>
      <AdminHeader />

      <div className='min-h-[calc(100vh-120px)] bg-slate-50 md:grid md:grid-cols-[250px_minmax(0,1fr)]'>
        <aside className='md:min-h-full'>
          <Sidebar />
        </aside>
        <main className='min-w-0 p-4 sm:p-6 lg:p-8'>
          <div className='mx-auto max-w-7xl'>
            <header className='mb-6 sm:mb-8'>
              <p className='text-sm font-semibold uppercase tracking-wider text-blue-700'>Catalog management</p>
              <h1 className='mt-1 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl'>All Resources</h1>
              <p className='mt-2 text-sm text-slate-600 sm:text-base'>Browse books and manage bookstore resources.</p>
            </header>

            <div className='mb-6 flex w-full gap-2 rounded-xl border border-slate-200 bg-white p-1 sm:mb-8 sm:w-fit' role='tablist' aria-label='Resource type'>
              <button
                type='button'
                role='tab'
                aria-selected={booklistStatus}
                onClick={() => {
                  setbooklistStatus(true);
                  setuserlistStatus(false);
                }}
                className={`min-h-11 flex-1 rounded-lg px-4 py-2 text-sm font-semibold transition-colors sm:flex-none ${
                  booklistStatus ? 'bg-blue-900 text-white shadow-sm' : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                }`}
              >
                Book List
              </button>
              <button
                type='button'
                role='tab'
                aria-selected={userlistStatus}
                onClick={() => {
                  setbooklistStatus(false);
                  setuserlistStatus(true);
                }}
                className={`min-h-11 flex-1 rounded-lg px-4 py-2 text-sm font-semibold transition-colors sm:flex-none ${
                  userlistStatus ? 'bg-blue-900 text-white shadow-sm' : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                }`}
              >
                User List
              </button>
            </div>

            {
              booklistStatus &&
              <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4'>
                {allBooks?.map((book) => (
                  <article key={book._id} className='flex min-w-0 flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-shadow hover:shadow-md'>
                    <Link to={`/view/${book._id}/book`} className='block overflow-hidden bg-slate-100'>
                      <img src={book.imageUrl} alt={book.title} className='h-56 w-full object-contain p-4 transition-transform duration-300 hover:scale-[1.03] sm:h-64' />
                    </Link>
                    <div className='flex flex-1 flex-col p-4'>
                      <p className='text-sm font-medium text-slate-500'>{book.author}</p>
                      <h2 className='mt-1 line-clamp-2 min-h-12 text-lg font-semibold leading-6 text-slate-900'>{book.title}</h2>
                      <p className='mt-3 text-lg font-bold text-blue-900'>${book.price.toFixed(2)}</p>
                     { 
                      book?.status != 'approved' ?
                      <button onClick={() => updateBookStatus(book?._id)} type='button' className='mt-4 min-h-11 w-full rounded-lg bg-blue-900 px-4 py-2 font-semibold text-white transition-colors hover:bg-blue-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-900'>
                        Approve
                      </button>
                      :
                      <img src="https://static.vecteezy.com/system/resources/previews/016/746/182/original/green-check-mark-icon-symbol-logo-in-a-circle-tick-symbol-green-color-illustration-free-vector.jpg" alt="" width="60" />
                      }
                    </div>
                  </article>
                ))}
              </div>
            }
            {
              userlistStatus &&
              <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3'>
               { 
               allUsers?.length > 0 ?
                allUsers?.map(user =>(
                   <article className='rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6'>
                    <h2 className='text-sm font-bold uppercase tracking-wide text-red-800'>ID:{user._id}</h2>
                    <div className='mt-4 flex flex-wrap items-center gap-4 sm:flex-nowrap'>
                     <img src={user?.picture == "" ? 'https://static.vecteezy.com/system/resources/previews/019/879/186/non_2x/user-icon-on-transparent-background-free-png.png' : user?.picture?.startsWith('https://') ? user?.picture : `${axiosInstance.defaults.baseURL}/uploads/${user.picture}`} alt="" className='h-10 w-10 rounded-full object-cover ring-2 ring-white/50' />
                      <div className='min-w-0'>
                        <h3 className='break-words font-bold text-slate-900'>{user.name}</h3>
                        <p className='mt-1 break-words text-sm font-medium text-slate-600'>{user.email}</p>
                      </div>
                    </div>
                  </article>
                ))
                :
                <p className='text-center text-lg font-semibold text-slate-600'>No users found.</p>
                 
                }
              </div>
            }
          </div>
        </main>
      </div>
    </>
  )
}

export default Resource
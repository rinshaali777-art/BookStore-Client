import { useCallback, useContext, useEffect, useState } from 'react'
import UserHeader from '../components/UserHeader'
import { Link } from 'react-router-dom'
import { getBooksApi } from '../../services/allApi'
import { searchContext } from '../../context/SearchContext'

function AllBooks() {
  const [token] = useState(() => sessionStorage.getItem('token') || '')
  const [allBooks, setAllBooks] = useState([])
  const [dummyAllBooks, setDummyAllBooks] = useState()

  const [categoryList, setCategoryList] = useState([])

  const { searchKey, setSearchKey } = useContext(searchContext)
  
  console.log(searchKey);

  const getBooks = useCallback(async () => {
    const res = await getBooksApi(searchKey)
    console.log(res);
    if (res.status == 200) {
      setAllBooks(res.data)
      setDummyAllBooks(res.data)
      const tempCategoryList = res.data.map(bk => bk.category)
      setCategoryList([...new Set(tempCategoryList)])
    }

  }, [searchKey])

  useEffect(() => {
    getBooks()
  }, [getBooks])

  const filterBooks = (category) => {
    console.log(category);
    if(category != 'all'){
      setAllBooks(dummyAllBooks?.filter(book => book.category == category))
    }
    else{
      getBooks()
    }
    
  }

  return (
    <>
      <UserHeader />

      {
        token ?
          <section className='flex w-full flex-col items-center justify-center px-4 py-6 sm:px-6 lg:px-8'>
            <div className='w-full max-w-7xl'>
              <div className='flex flex-col items-center'>
                <p className='text-sm font-semibold uppercase tracking-wider text-blue-700'>Find your next read</p>
                <h1 className='mt-1 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl'>Collections</h1>
                <div className='mt-3 flex w-full max-w-md'>
                  <input value={searchKey} onChange={(e)=>setSearchKey(e.target.value)} type="text" placeholder='Search by Title' className='min-h-12 min-w-0 flex-1 rounded-l-lg border border-slate-300 bg-white px-4 py-2 outline-none transition focus:border-blue-700 focus:ring-2 focus:ring-blue-100' />
                  <button className='min-h-12 shrink-0 rounded-r-lg bg-blue-900 px-4 font-semibold text-white transition-colors hover:bg-blue-800 sm:px-5'>Search</button>
                </div>
              </div>

              {/* <div className='md:flex'> */}
              <div className='mt-5 grid min-w-0 grid-cols-1 gap-6 md:grid-cols-[200px_minmax(0,1fr)] lg:gap-8'>
                <div className='rounded-xl border border-slate-200 bg-white p-4 shadow-sm md:mt-5 md:h-fit'>
                  <h3 className='text-lg font-bold text-slate-900 sm:text-xl'>Filter by category</h3>
                  <div className='mt-3 flex flex-wrap gap-x-4 gap-y-2 md:flex-col md:gap-2'>

                    {
                      categoryList?.map(cat => (
                        <div className='flex items-center gap-2 md:mt-1'>
                          <input onClick={() => filterBooks(cat)} type="radio" name="category" id="" className='accent-blue-900' /> <label htmlFor="" className='text-sm text-slate-700'>{cat}</label>
                        </div>
                      ))
                    }
                    <div className='flex items-center gap-2 md:mt-1'>
                      <input onClick={() => filterBooks('all')} type="radio" name="category" id="" className='accent-blue-900' /> <label htmlFor="" className='text-sm text-slate-700'>No Filter</label>
                    </div>
                  </div>
                </div>

                {/* <div className='md:grid grid-cols-4 mt-3'> */}
                <div className='grid min-w-0 grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 lg:gap-6'>
                  {
                    allBooks?.length > 0 ?
                      allBooks?.map(book => (
                        <div hidden={book?.status == 'sold' || book?.status == 'pending'} className='min-w-0'>
                          <div className='flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-4 text-center shadow-sm transition-shadow hover:shadow-md'>
                            <Link to={`/view/${book?._id}/book`} className='overflow-hidden rounded-xl bg-slate-50'>
                              <img src={book?.imageUrl} alt="" className='h-64 w-full object-contain p-3 transition-transform duration-300 hover:scale-[1.03]' />
                            </Link>
                            <h3 className='mt-3 max-w-full break-words text-sm text-slate-500'>{book.author}</h3>
                            <h3 className='mt-1 max-w-full break-words font-semibold text-slate-900'>{book?.title}</h3>
                            <button className='mt-auto min-h-11 w-full rounded-lg bg-blue-900 p-2 font-semibold text-white transition-colors hover:bg-blue-800'>Buy-${book?.price}</button>
                          </div>
                        </div>
                      ))
                      :

                      <p className='font-bold text-center my-3'>Loading...</p>

                  }

                </div>

              </div>
            </div>
          </section>
          :
          <div className='min-h-screen flex justify-center items-center flex-col'>
            <img src="https://cdn.pixabay.com/animation/2023/06/13/15/12/15-12-30-710_512.gif" alt="" className='w-50' />
            <p className='mt-5 text-xl font-bold'>
              Please <Link to={'/login'} className='text-blue-500'>Login</Link> to explore books
            </p>

          </div>
      }

    </>
  )
}

export default AllBooks
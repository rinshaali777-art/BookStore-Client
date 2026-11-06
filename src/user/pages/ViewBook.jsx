import { useEffect, useState } from 'react'
import UserHeader from '../components/UserHeader'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCamera, faEye } from '@fortawesome/free-regular-svg-icons'
import { Link, useParams } from 'react-router-dom'
import { faBackward, faXmark } from '@fortawesome/free-solid-svg-icons'
import { getSingleBooksApi, paymentAPI } from '../../services/allApi'
import axiosInstance from '../../api/axiosinstance'



function ViewBook() {

  const [modalStatus, setModalStatus] = useState(false)
  const [bookDetails, setBookDetails] = useState()

  const { id } = useParams()

  useEffect(() => {
    getBook()

  }, [])


  const getBook = async () => {
    const res = await getSingleBooksApi(id)
    console.log(res);
    if (res.status == 200) {
      setBookDetails(res.data)
    }

  }

  const makePayment = async () => {

    const res = await paymentAPI(id)
    console.log(res);
    if(res.status == 200){
      const {checkoutURL} = res.data
      window.location.href = checkoutURL
    }
    
    
  }

  

  return (
    <>
      <UserHeader />
      <section className='mx-auto my-5 grid min-w-0 max-w-7xl grid-cols-1 gap-4 rounded-2xl border border-slate-200 bg-white p-3 shadow-sm sm:my-8 sm:p-5 md:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] md:gap-8 lg:p-8'>
        <div className='flex min-w-0 items-center justify-center rounded-xl bg-slate-50 p-4 sm:p-6'>
          <img src={bookDetails?.imageUrl} alt="" className='mx-auto max-h-[32rem] w-full max-w-md object-contain' />
        </div>
        <div className='min-w-0 py-2 sm:p-3'>
          <div className='flex min-w-0 items-start justify-between gap-3'>
            <h2 className='min-w-0 break-words text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl'>{bookDetails?.title}</h2>

            <button type='button' onClick={() => setModalStatus(true)} aria-label='View book images' className='shrink-0 rounded-lg p-2 text-slate-600 transition-colors hover:bg-blue-50 hover:text-blue-900 focus-visible:outline-2 focus-visible:outline-blue-900'><FontAwesomeIcon icon={faEye} /></button>

          </div>
          <h3 className='mt-2 break-words text-lg font-medium text-blue-800'>- {bookDetails?.author}</h3>

          <div className='mt-5 grid grid-cols-1 gap-2 sm:grid-cols-2 xl:grid-cols-3'>
            <h3 className='break-words rounded-lg bg-slate-50 p-3 text-sm text-slate-700 sm:text-base'><span className='font-semibold text-slate-900'>Publisher:</span> {bookDetails?.publisher}</h3>
            <h3 className='break-words rounded-lg bg-slate-50 p-3 text-sm text-slate-700 sm:text-base'><span className='font-semibold text-slate-900'>Language:</span> {bookDetails?.language}</h3>
            <h3 className='break-words rounded-lg bg-slate-50 p-3 text-sm text-slate-700 sm:text-base'><span className='font-semibold text-slate-900'>No:of Pages:</span> {bookDetails?.pages}</h3>
          </div>

          <div className='mt-5 grid grid-cols-1 gap-2 sm:grid-cols-2 xl:grid-cols-3'>
            <h3 className='break-words rounded-lg bg-slate-50 p-3 text-sm text-slate-700 sm:text-base'><span className='font-semibold text-slate-900'>Category:</span> {bookDetails?.category}</h3>
            <h3 className='break-words rounded-lg bg-slate-50 p-3 text-sm text-slate-700 sm:text-base'><span className='font-semibold text-slate-900'>Real Price:</span> ₹{bookDetails?.price}</h3>
            <h3 className='break-words rounded-lg bg-slate-50 p-3 text-sm text-slate-700 sm:text-base'><span className='font-semibold text-slate-900'>ISBN:</span> {bookDetails?.isbn}</h3>
          </div>

          <p className='mt-5 break-words text-justify leading-7 text-slate-600'>
            {bookDetails?.abstract}
          </p>

          <div className='mt-5 flex flex-wrap justify-end gap-2'>
            <Link to={'/all-books'} className='inline-flex min-h-11 items-center justify-center gap-2 rounded-lg border border-slate-300 px-4 py-2 font-semibold text-slate-700 transition-colors hover:bg-slate-100'><FontAwesomeIcon icon={faBackward} />Back</Link>
            <button className='min-h-11 rounded-lg bg-blue-900 px-5 py-2 font-semibold text-white transition-colors hover:bg-blue-800' onClick={makePayment}>Buy Now
              <br />
              @ ${bookDetails?.discountPrice}
            </button>
          </div>
        </div>

      </section>

      {/* modal */}
      {
        modalStatus &&
        <div className='relative z-10'>
          <div className='bg-gray-500/75 inset-0 fixed'>
            <div className='flex min-h-screen items-center justify-center p-3 sm:p-6'>
              <div className='flex h-[min(500px,calc(100dvh-1.5rem))] w-full max-w-3xl flex-col overflow-hidden rounded-lg bg-white shadow-xl sm:h-[min(500px,calc(100dvh-3rem))]'>

                {/* modal header */}

                <div className='flex shrink-0 items-center justify-between bg-black p-3 text-white'>
                  <h3>Book Images</h3>
                  <FontAwesomeIcon icon={faXmark} onClick={() => setModalStatus(false)} className='cursor-pointer' />

                </div>
                {/* modal body */}
                <div className='min-h-0 flex-1 overflow-y-auto bg-white p-3'>
                  <p className='break-words text-blue-700'><FontAwesomeIcon icon={faCamera} />Camera click of the book in the hand of seller</p>

                  <div className='m-2 flex flex-col flex-wrap items-center justify-center gap-3 sm:m-5 sm:flex-row sm:gap-5' >
                    {
                      bookDetails?.uploadImages?.map(book => (
                        <img src={`${axiosInstance.defaults.baseURL}/uploads/${book}`} alt="" height={'300px'} width={'250px'} className='h-auto max-h-72 w-full max-w-[250px] rounded object-contain' />

                      ))
                    }
                  </div>
                </div>
              </div>
            </div>


          </div>
        </div>
      }
    </>
  )
}

export default ViewBook
import { useEffect, useState } from 'react'
import UserHeader from '../components/UserHeader'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import axiosInstance from '../../api/axiosinstance'
import Edit from '../components/Edit'
import { toast } from 'react-toastify'
import { addBookApi, getUserBooksApi as getUserBooksAPI, removeBookApi as removeBookAPI ,getUserBoughtBooksApi ,getAbstractApi} from '../../services/allApi'
import useDebouns from '../../hooks/useDebouns'


function Profile() {
  const [sellbookStatus, setsellbookStatus] = useState(true)
  const [bookStatus, setbookStatus] = useState(false)
  const [purchaseStatus, setpurchaseStatus] = useState(false)
  const [editStatus, seteditStatus] = useState(false)

  const [userDp, setuserDp] = useState('')
  const [userName, setuserName] = useState('')
  const [userBio, setuserBio] = useState('')

  const [bookDetails, setBookDetails] = useState({
    title: "",
    author: "",
    pages: "",
    imageUrl: "",
    price: "",
    discountPrice: "",
    abstract: "",
    publisher: "",
    isbn: "",
    language: "",
    category: "",
    uploadImages: [],
  })
  const [preview, setPreview] = useState("")
  const [previewList, setPreviewList] = useState([])

  const [uploadBooks, setUploadBooks] = useState([])
  const [boughtBooks, setBoughtBooks] = useState([])

  const debouncedTitleSearch = useDebouns(bookDetails.title,500)



  useEffect(() => {

    if (sessionStorage.getItem("user")) {
      const user = JSON.parse(sessionStorage.getItem("user"))
      setuserDp(user.picture)
      setuserName(user.username)
      setuserBio(user.bio)
    }
    getUserBooks()
  }, [])

  useEffect(() => {
    if(sellbookStatus){
      getUserBooks()
    }
    else if(purchaseStatus){
      userBoughtBook()
    }
  },[sellbookStatus, purchaseStatus])

  useEffect(()=>{
    if(debouncedTitleSearch){
      console.log("gemini api call");
      generateBookAbstract()
      
    }
  },[debouncedTitleSearch])


  const handleFileUpload = (e) => {

    const imgFile = e.target.files[0]
    setBookDetails({ ...bookDetails, uploadImages: [...bookDetails?.uploadImages, imgFile] })
    const url = URL.createObjectURL(imgFile)
    setPreview(url)
    setPreviewList([...previewList, url])

  }


  const resetForm = () => {
    setBookDetails({
      title: "",
      author: "",
      pages: "",
      imageUrl: "",
      price: "",
      discountPrice: "",
      abstract: "",
      publisher: "",
      isbn: "",
      language: "",
      category: "",
      uploadImages: [],
    })
    setPreview("")
    setPreviewList([])

  }

  const handleSubmit = async () => {
    const { title, author, pages, imageUrl, price, discountPrice, abstract, publisher, isbn, language, category, uploadImages } = bookDetails
    if (
      title &&
      author &&
      pages &&
      imageUrl &&
      price &&
      discountPrice &&
      abstract &&
      publisher &&
      isbn &&
      language &&
      category &&
      uploadImages.length > 0) {
      const reqbody = new FormData()
      for (let key in bookDetails) {
        if (key != "uploadImages") {
          reqbody.append(key, bookDetails[key])
        } else {
          bookDetails.uploadImages.forEach(file => {
            reqbody.append("uploadImages", file)
          })
        }
      }
      const result = await addBookApi(reqbody)
      console.log(result);
      if (result.status == 200) {
        toast.success("Book added successfully")
      } else {
        toast.error(result.response)
      }
      resetForm()

    }
    else {
      toast.warning("fill the form completely")


    }
  }

  const getUserBooks = async () => {
    const res = await getUserBooksAPI()
    console.log("upload books", res);
    if (res.status == 200) {
      setUploadBooks(res.data)
    }

  }

  const removeBook = async (id) => {

    const res = await removeBookAPI(id)
    if (res.status == 200) {
      getUserBooks()
    }

  }

   const userBoughtBook = async () => {

    const res = await getUserBoughtBooksApi()
    console.log( res);
    if (res.status == 200) {
      setBoughtBooks(res.data)
    }

  }
  console.log(boughtBooks);
  
  const generateBookAbstract = async () => {

    const res = await getAbstractApi(debouncedTitleSearch)
    console.log( res);
    if (res.status == 200) {
      setBookDetails({...bookDetails,abstract:res.data.content})
    }

  }

  return (
    <>
      <UserHeader />
      <div className='h-28 bg-gradient-to-r from-slate-950 via-blue-950 to-blue-800 sm:h-40 md:h-[200px]'>
      </div>
      <div className='ml-4 -mt-16 h-32 w-32 sm:ml-10 sm:-mt-28 sm:h-48 sm:w-48'>
        <img className='h-28 w-28 rounded-full object-cover sm:h-40 sm:w-40' src={userDp == "" ? 'https://static.vecteezy.com/system/resources/previews/019/879/186/non_2x/user-icon-on-transparent-background-free-png.png' : userDp?.startsWith('https://lh3.googleusercontent.com') ? userDp : `${axiosInstance.defaults.baseURL}/uploads/${userDp}`} alt="" />
      </div>
      <main className='mx-auto my-5 w-full max-w-7xl min-w-0 px-4 sm:px-6 md:px-10'>
        <div className='flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-center'>
          <h1 className='max-w-full break-words text-2xl font-bold'>{userName}</h1>
          <div>
            <Edit />
          </div>
          {/* <button className='bg-blue-900 text-white p-2 rounded' onClick={() => seteditStatus(true)}>Edit</button> */}

        </div>
        <p className='mt-2 break-words rounded-xl bg-slate-50 p-4 text-justify leading-7 text-slate-600 sm:p-5 sm:text-lg'>
          {userBio == "" ? "No Bio" : userBio}
        </p>
        {/* tabs */}
        <div className='flex w-full flex-wrap items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white p-2 shadow-sm sm:gap-3'>
          <p onClick={() => {
            setsellbookStatus(true);
            setbookStatus(false);
            setpurchaseStatus(false)
          }} className={`cursor-pointer rounded-lg px-4 py-2 text-sm font-semibold transition-colors sm:text-base ${sellbookStatus ? 'bg-blue-900 text-white shadow-sm' : 'text-slate-600 hover:bg-slate-100'}`}>Sell Book</p>
          <p onClick={() => {
            setsellbookStatus(false);
            setbookStatus(true);
            setpurchaseStatus(false)
          }} className={`cursor-pointer rounded-lg px-4 py-2 text-sm font-semibold transition-colors sm:text-base ${bookStatus ? 'bg-blue-900 text-white shadow-sm' : 'text-slate-600 hover:bg-slate-100'}`}>Book Status</p>
          <p onClick={() => {
            setsellbookStatus(false);
            setbookStatus(false);
            setpurchaseStatus(true)
          }} className={`cursor-pointer rounded-lg px-4 py-2 text-sm font-semibold transition-colors sm:text-base ${purchaseStatus ? 'bg-blue-900 text-white shadow-sm' : 'text-slate-600 hover:bg-slate-100'}`}>Purchase History</p>
        </div>
        {/* contents */}
        {
          sellbookStatus &&
          <div className='w-full min-w-0 py-5 sm:py-7'>
            <div className='w-full min-w-0 rounded-2xl border border-slate-200 bg-white p-3 text-center shadow-sm sm:p-6 md:p-8'>
              <h1 className='text-xl font-bold text-slate-900'>Book Details</h1>
              <form className='grid min-w-0 grid-cols-1 md:grid-cols-2'>
                <div className='min-w-0 p-2 sm:p-4'>
                  <input value={bookDetails.title} onChange={(e) => setBookDetails({ ...bookDetails, title: e.target.value })} type="text" placeholder='Title' className='mt-4 min-h-12 w-full rounded-lg border border-slate-300 bg-slate-50 px-4 py-3 outline-none transition focus:border-blue-700 focus:bg-white focus:ring-2 focus:ring-blue-100' />

                  <input value={bookDetails.author} onChange={(e) => setBookDetails({ ...bookDetails, author: e.target.value })} type="text" placeholder='Author' className='mt-4 min-h-12 w-full rounded-lg border border-slate-300 bg-slate-50 px-4 py-3 outline-none transition focus:border-blue-700 focus:bg-white focus:ring-2 focus:ring-blue-100' />

                  <input value={bookDetails.pages} onChange={(e) => setBookDetails({ ...bookDetails, pages: e.target.value })} type="text" placeholder='No of Pages' className='mt-4 min-h-12 w-full rounded-lg border border-slate-300 bg-slate-50 px-4 py-3 outline-none transition focus:border-blue-700 focus:bg-white focus:ring-2 focus:ring-blue-100' />

                  <input value={bookDetails.imageUrl} onChange={(e) => setBookDetails({ ...bookDetails, imageUrl: e.target.value })} type="text" placeholder='Image URL' className='mt-4 min-h-12 w-full rounded-lg border border-slate-300 bg-slate-50 px-4 py-3 outline-none transition focus:border-blue-700 focus:bg-white focus:ring-2 focus:ring-blue-100' />

                  <input value={bookDetails.price} onChange={(e) => setBookDetails({ ...bookDetails, price: e.target.value })} type="text" placeholder='Price' className='mt-4 min-h-12 w-full rounded-lg border border-slate-300 bg-slate-50 px-4 py-3 outline-none transition focus:border-blue-700 focus:bg-white focus:ring-2 focus:ring-blue-100' />

                  <input value={bookDetails.discountPrice} onChange={(e) => setBookDetails({ ...bookDetails, discountPrice: e.target.value })} type="text" placeholder='Discount Price' className='mt-4 min-h-12 w-full rounded-lg border border-slate-300 bg-slate-50 px-4 py-3 outline-none transition focus:border-blue-700 focus:bg-white focus:ring-2 focus:ring-blue-100' />
                </div>
                <div className='min-w-0 p-2 sm:p-4'>
                  <input value={bookDetails.publisher} onChange={(e) => setBookDetails({ ...bookDetails, publisher: e.target.value })} type="text" placeholder='Publisher' className='mt-4 min-h-12 w-full rounded-lg border border-slate-300 bg-slate-50 px-4 py-3 outline-none transition focus:border-blue-700 focus:bg-white focus:ring-2 focus:ring-blue-100' />

                  <input value={bookDetails.language} onChange={(e) => setBookDetails({ ...bookDetails, language: e.target.value })} type="text" placeholder='Language' className='mt-4 min-h-12 w-full rounded-lg border border-slate-300 bg-slate-50 px-4 py-3 outline-none transition focus:border-blue-700 focus:bg-white focus:ring-2 focus:ring-blue-100' />

                  <input value={bookDetails.isbn} onChange={(e) => setBookDetails({ ...bookDetails, isbn: e.target.value })} type="text" placeholder='ISBN' className='mt-4 min-h-12 w-full rounded-lg border border-slate-300 bg-slate-50 px-4 py-3 outline-none transition focus:border-blue-700 focus:bg-white focus:ring-2 focus:ring-blue-100' />

                  <input value={bookDetails.category} onChange={(e) => setBookDetails({ ...bookDetails, category: e.target.value })} type="text" placeholder='Category' className='mt-4 min-h-12 w-full rounded-lg border border-slate-300 bg-slate-50 px-4 py-3 outline-none transition focus:border-blue-700 focus:bg-white focus:ring-2 focus:ring-blue-100' />

                  <textarea value={bookDetails.abstract} onChange={(e) => setBookDetails({ ...bookDetails, abstract: e.target.value })} type="text" placeholder='Abstract' className='mt-4 w-full rounded-lg border border-slate-300 bg-slate-50 px-4 py-3 outline-none transition focus:border-blue-700 focus:bg-white focus:ring-2 focus:ring-blue-100' />

                  <div className='flex items-center justify-center p-4 sm:p-10' >
                    {
                      previewList?.length < 3 &&
                      <input on onChange={(e) => handleFileUpload(e)} type="file" name="img1" id="img" className='hidden' multiple />
                    }
                    <label htmlFor="img">
                      <img src={preview ? preview : "https://cdn.pixabay.com/photo/2016/01/03/00/43/upload-1118929_1280.png"} alt="" className='h-20 w-20 cursor-pointer object-cover sm:h-24 sm:w-24' />
                    </label>
                  </div>
                  {/* display uploaded images */}
                  {
                    preview &&
                    <div className='flex flex-wrap items-center justify-center gap-2 p-3 sm:p-5' >
                      {
                        previewList?.map(url => (
                          <img src={url} alt="" className='h-14 w-14 rounded object-cover sm:h-[70px] sm:w-[70px]' />

                        ))
                      }
                      {previewList?.length < 3 &&
                        <label htmlFor="img">
                          <input on onChange={(e) => handleFileUpload(e)} type="file" name="img1" id="img" className='hidden' multiple />
                          <FontAwesomeIcon icon={faPlus} className='ms-2 cursor-pointer text-2xl sm:ms-5' />
                        </label>
                      }

                    </div>
                  }


                  <div className='flex justify-end gap-2'>
                    <button type='button' className='min-h-11 rounded-lg border border-slate-300 bg-white px-4 py-2 font-semibold text-slate-700 transition-colors hover:bg-slate-100 sm:px-5' onClick={resetForm}>RESET</button>
                    <button type='button' className='min-h-11 rounded-lg bg-blue-900 px-4 py-2 font-semibold text-white transition-colors hover:bg-blue-800 sm:px-5' onClick={handleSubmit}>SUBMIT</button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        }
        {
          bookStatus &&
          <div className='my-6 w-full min-w-0 rounded-2xl border border-slate-200 bg-white p-3 shadow-sm sm:my-8 sm:p-6 md:p-8'>

            {
              uploadBooks.length > 0 ?
                uploadBooks?.map(book => (
                  <div className='mt-4 min-w-0 rounded-2xl border border-slate-200 bg-white p-3 shadow-sm sm:p-5'>
                    <div className='grid min-w-0 grid-cols-1 items-start gap-4 sm:gap-5 md:grid-cols-[minmax(0,2fr)_minmax(0,1fr)] md:items-center lg:grid-cols-[minmax(0,3fr)_minmax(10rem,1fr)]'>
                      <div className='min-w-0 px-2 sm:px-4 text-center'>
                        <h1 className='break-words text-xl font-bold text-slate-900 sm:text-2xl'>{book.title}</h1>
                        <h3 className='mt-1 break-words text-lg text-slate-600 sm:text-xl'>{book.author}</h3>
                        <h3 className='mt-2 text-lg font-bold text-blue-900'>${book.price}</h3>
                        <p className='mt-3 break-words text-justify leading-7 text-slate-600'>{book.abstract}</p>
                        <div className='mt-5'>
                          {
                            book?.status == "pending" ?
                              <img src="http://pnggallery.com/wp-content/uploads/pending-stamp-03.png" alt="" className='mt-3 h-20 w-20 rounded-full object-cover sm:h-24 sm:w-24' />
                              :
                              book?.status == "approved" ?
                                <img src="http://pnggallery.com/wp-content/uploads/approved-stamp-05.png" alt="" className='mt-3 h-20 w-20 rounded-full object-cover sm:h-24 sm:w-24' />
                                :
                                <img src="https://static.vecteezy.com/system/resources/thumbnails/021/432/975/small_2x/sold-out-grunge-rubber-stamp-free-png.png" alt="" className='mt-3 h-20 w-20 rounded-full object-cover sm:h-24 sm:w-24' />
                          }
                        </div>

                      </div>
                      <div className='min-w-0'>
                        <img src={book.imageUrl} alt="" className='mx-auto max-h-72 w-32 max-w-full object-contain sm:w-40 md:w-48 lg:w-56' />
                        <div className='mt-3 flex justify-end'>
                          <button onClick={() => removeBook(book?._id)} className='min-h-11 w-full rounded-lg border border-red-800 bg-red-800 px-4 py-2 font-semibold text-white transition-colors hover:bg-white hover:text-red-800 sm:w-auto'>Delete</button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
                :
                <p className='text-center text-xl font-bold'>No Books Uploaded</p>
            }
          </div>
        }
        {
          purchaseStatus &&
          <div className='my-6 w-full min-w-0 rounded-2xl border border-slate-200 bg-white p-3 shadow-sm sm:my-8 sm:p-6 md:p-8'>
            {
              boughtBooks?.length>0?
              boughtBooks?.map(book=>(
              <div className='mt-4 min-w-0 rounded-2xl border border-slate-200 bg-white p-3 shadow-sm sm:p-5'>
              <div className='grid min-w-0 grid-cols-1 items-center gap-5 md:grid-cols-[minmax(0,3fr)_minmax(0,1fr)]'>
                <div className='px-2 sm:px-4'>
                  <h1 className='text-2xl'>{book.title}</h1>
                  <h3 className='text-xl'>{book.author}</h3>
                  <h3 className='text-lg text-blue-600 font-bold'>Price</h3>
                  <div className='mt-5'>
                    <img src="https://th.bing.com/th/id/OIP.AdUlbcljs1Kf7BpLG0fMaAHaHD?w=173&h=180&c=7&r=0&o=7&dpr=2&pid=1.7&rm=3" alt="" className='mt-3 h-20 w-20 rounded-full object-cover sm:h-24 sm:w-24' />
                  </div>
                </div>
                <div className=''>
                  <img src={book.imageUrl} alt="" className='mx-auto w-40 max-w-full object-contain sm:w-48 md:w-50' />
                </div>
              </div>
            </div>
              ))
              :
              <p className='text-center text-xl font-bold'>No Books Purchased</p>
            }
          </div>
        }


      </main>



    </>
  )
}

export default Profile
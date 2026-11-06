import  { useContext } from 'react'
import UserHeader from '../components/UserHeader'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { useEffect } from 'react'
import { searchContext } from '../../context/SearchContext'
import { toast ,ToastContainer} from 'react-toastify'
import { homePageBooksApi } from '../../services/allApi'


function Home() {

  const [homeBooks, setHomeBooks] =useState([])
  console.log(homeBooks);

  const navigate=useNavigate()

  const { searchKey,setSearchKey } = useContext(searchContext)

  useEffect(()=>{
    getBooks()
  },[])

  const getBooks = async ()=>{
    const res = await homePageBooksApi()
    if(res.status===200){
      setHomeBooks(res.data)
    }
  }

  const handleSearch = ()=>{
    if(!searchKey){
      toast.warning("please input a book title")
    }
    else if(!sessionStorage.getItem("token")){
      toast.warning("please login!!")
      setTimeout(()=>{
        navigate('/login')
      },2000)
    }
    else if(searchKey && sessionStorage.getItem("token")){
      navigate('/all-books')
    }
    else{
      toast.error("something went wrong")
    }

  }

  return (
    <>
      <UserHeader />
      <section className='flex min-h-[360px] w-full items-center justify-center bg-[url(/book.jpg)] bg-cover bg-center sm:min-h-[440px] md:min-h-[540px]'>
        <div className='flex min-h-[360px] w-full flex-col items-center justify-center bg-gradient-to-r from-slate-950/80 via-slate-950/55 to-slate-950/25 px-4 py-10 text-center text-white sm:min-h-[440px] md:min-h-[540px]'>
          <p className='text-sm font-semibold uppercase tracking-[0.25em] text-blue-200'>A world of stories</p>
          <h1 className='mt-3 text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl' style={{ fontFamily: "Dancing Script" }}>Wonderfull Gifts</h1>
          <p className='mt-4 text-base text-slate-100 sm:text-lg'>Give your family and friends a book</p>
          <div className='mt-5 relative w-full max-w-lg'>
            <input onChange={(e)=>setSearchKey(e.target.value)} type="text" placeholder='Search Book' className='min-h-12 w-full rounded-full border border-white/40 bg-white px-5 py-3 pr-12 text-slate-900 shadow-lg outline-none placeholder:text-slate-500 focus:ring-4 focus:ring-blue-300/50' />
            <FontAwesomeIcon onClick={handleSearch} icon={faMagnifyingGlass} className='absolute right-5 top-1/2 -translate-y-1/2 cursor-pointer text-blue-900' />
          </div>
        </div>
      </section>

      <section className='my-10 flex flex-col items-center justify-center sm:my-14'>
        <p className='text-sm font-semibold uppercase tracking-wider text-blue-700'>Fresh off the shelf</p>
        <h1 className='mt-1 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl'>New Arrivals</h1>
        <h2 className='mt-3 px-4 text-center text-base text-slate-600 sm:text-lg'>Explore Our Latest Collections</h2>
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-5 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          {/* col */}
          <div className='contents'>
            {/* card */}
            {
              homeBooks.length>0 ?
              homeBooks.map(book=>(
              <div key={book?._id} className='h-full min-w-0 rounded-2xl border border-slate-200 bg-white p-4 text-center shadow-sm transition-shadow hover:shadow-md'>
              <img className='h-64 w-full rounded-xl bg-slate-50 object-contain p-3 sm:h-72 lg:h-80' src={book?.imageUrl} alt="Gone Girl book cover" />

              <h3 className='mt-3 text-sm text-slate-500'>{book?.author}</h3>
              <h4 className='mt-1 font-semibold text-slate-900'>{book?.title}</h4>
              <h4 className='mt-2 font-bold text-blue-900'>{book?.price}</h4>

            </div>
              ))
              :
              <div className='text-center text-lg font-bold'>Loading.....</div> 
            }
          </div>
        </div>
        <div className='text-center my-3'>
          <Link to={"/all-books"} className='inline-flex min-h-11 items-center rounded-lg bg-blue-900 px-5 py-3 font-semibold text-white transition-colors hover:bg-blue-800'>Explore More</Link>
        </div>
      </section>

      <section className='grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10 items-center max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='py-5 sm:py-6 md:py-8'>
          <h2 className='text-center text-2xl sm:text-3xl font-bold'>Featured Authors</h2>
          <h3 className='text-center text-xl sm:text-2xl mt-1 font-bold'>Captivates With Every Words</h3>
          <p className='mt-3 text-justify leading-relaxed'>Authors in a bookstore application are the visionaries behind the books that fill the shelves, each contributing their own unique voice, creativity, and perspective to the world of literature. Whether writing fiction, non-fiction, poetry, or educational works, authors bring stories, ideas, and knowledge to life in ways that resonate with readers of all backgrounds.</p>

          <p className='mt-3 text-justify leading-relaxed'>Their work spans a wide array of genres, from thrilling mysteries and heartwarming romances to thought-provoking memoirs and insightful self-help books. Through their words, authors not only entertain and inform but also inspire and challenge readers to think deeply, reflect, and grow. In a bookstore application, authors' works become accessible to readers everywhere, offering a diverse and rich tapestry of voices and experiences, all of which contribute to the evolving landscape of modern literature.</p>
        </div>

        <div className='flex items-center justify-center py-3'>
          <img className='h-auto max-h-[28rem] w-full rounded-2xl object-cover shadow-md' src="https://www.shutterstock.com/image-photo/happy-attractive-african-business-leader-600nw-2451794349.jpg" alt="Featured author" />
        </div>

      </section>

      <section className='flex items-center justify-center flex-col my-8 sm:my-10 px-4 sm:px-6 md:px-8'>
        <h1 className='text-2xl sm:text-3xl font-bold'>TESTIMONALS</h1>
        <h2 className='text-lg sm:text-xl mt-4 text-center'>See What Others Are Saying</h2>
        <div className='mt-5 flex w-full max-w-3xl flex-col items-center rounded-2xl border border-slate-200 bg-white p-6 text-center shadow-sm sm:p-8'>
          <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQn9zilY2Yu2hc19pDZFxgWDTUDy5DId7ITqA&s" alt="Customer testimonial" className='h-24 w-24 rounded-full object-cover ring-4 ring-blue-50' />
          <h3 className='mt-3 text-xl font-bold text-slate-900'>Anna Sttef</h3>
          <p className='mt-5 text-left text-base font-medium leading-relaxed text-slate-600 sm:text-lg'>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Necessitatibus nostrum molestias quisquam accusantium quis, possimus deserunt rerum praesentium fuga officiis vitae enim incidunt, voluptatum dolorem? Numquam optio quisquam dolor dolores!
          </p>
        </div>
      </section>

      <ToastContainer position='top-center' theme='colored' autoClose={3000} />
    </>
  )
}

export default Home

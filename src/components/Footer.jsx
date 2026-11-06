import { faFacebook, faInstagram, faLinkedinIn, faTwitter } from '@fortawesome/free-brands-svg-icons'
import { faArrowRightLong, faBackward } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link } from 'react-router-dom'


function Footer() {
  return (
    <>
      <footer>
      <div className='grid grid-cols-1 gap-8 bg-slate-900 px-5 py-10 text-white sm:px-8 md:grid-cols-3 md:gap-10 lg:px-12'>
        <div className='max-w-md'>
          <h4 className='font-bold tracking-wide'>ABOUT US</h4>
          <p className='mt-4 leading-7 text-slate-300'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod sint possimus iure vero recusandae autem amet eum quos, dolores aspernatur animi quis ipsam labore tempore praesentium deleniti. Natus, non architecto?</p>
        </div>
        <div className='max-w-md'>
          <h4 className='font-bold tracking-wide'>NEWSLETTER</h4>
          <p className='mt-4 text-slate-300'>stay updated with our latest trends</p>
            <div className='mt-4 flex w-full max-w-sm overflow-hidden rounded-lg'>
          <input type="email" placeholder='email id' className='min-w-0 flex-1 bg-white p-3 text-slate-900 placeholder:text-gray-500' />
          <button className='shrink-0 bg-amber-400 px-4 text-slate-900 transition-colors hover:bg-amber-300'><FontAwesomeIcon icon={faArrowRightLong} style={{ color: "rgb(0, 0, 0)", }} /></button>
          </div>

        </div>
        <div>
          <h4 className='font-bold tracking-wide'>FOLLOW US</h4>
          <p className='mt-4 text-slate-300'>Let us be social</p>
          <div className='mt-5 flex gap-2'>
            <FontAwesomeIcon icon={faInstagram} className='text-2xl text-slate-200'/>
            <FontAwesomeIcon icon={faTwitter} className='text-2xl text-slate-200'/>
            <FontAwesomeIcon icon={faFacebook} className='text-2xl text-slate-200'/>
            <FontAwesomeIcon icon={faLinkedinIn} className='text-2xl text-slate-200'/>
          </div>
          <div className='mt-5 '>
          <Link to={'/'} className='inline-flex items-center gap-2 rounded-lg bg-white px-3 py-2 font-bold text-gray-900 transition-colors hover:bg-slate-200'><FontAwesomeIcon icon={faBackward} /> BOOK STORE</Link>
          </div>
        </div>
      </div>
      <div className='bg-black px-4 py-5 text-center text-sm text-slate-300'>
        <p>Copyright &copy;2025 All rights reserved | This website is made with  ❤  by Rahul Raj</p>
      </div>
      </footer>
    </>

  )
}

export default Footer

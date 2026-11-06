import UserHeader from '../components/UserHeader'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLocationDot, faPhone } from '@fortawesome/free-solid-svg-icons'
import { faEnvelope, faPaperPlane } from '@fortawesome/free-regular-svg-icons'
import emailjs from '@emailjs/browser';
import React, { useRef } from 'react';
import { ToastContainer, toast } from 'react-toastify';

function Contact() {

    const form = useRef();
    const sendEmail = (e) => {
    e.preventDefault();
    console.log(form.current);
    const {name, email, title} = form.current;
    if(name.value && email.value && title.value){
          emailjs
          .sendForm(import.meta.env.VITE_SERVICE_ID, import.meta.env.VITE_TEMPLATE_ID, form.current, {
            publicKey: import.meta.env.VITE_PUBLIC_KEY,
          })
          .then(
            () => {
              console.log('SUCCESS!');
              toast.success('thank you for contacting us. We will get back to you soon!!');
            },
            (error) => {
              console.log('FAILED...', error.text);
            },
          );
    }
    else{
      toast.warning('Please fill all the fields');
    }


  };

  return (
    <>
      <UserHeader />
      <main className='min-h-screen bg-slate-50 px-4 py-8 sm:px-6 sm:py-10 lg:px-8'>
        <div className='mx-auto max-w-7xl'>
        <header className='mx-auto max-w-3xl text-center'>
          <p className='text-sm font-semibold uppercase tracking-wider text-blue-700'>We are here to help</p>
          <h1 className='mt-2 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl'>
            Contacts
          </h1>
          <p className='mt-4 leading-7 text-slate-600'>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Suscipit sed natus ut iure unde! Cum in rerum labore aperiam quibusdam hic, quas corporis culpa iste? Doloribus, eveniet porro. Exercitationem, vero. Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere itaque reiciendis tempore molestiae similique natus quisquam fuga. Culpa fugit cum illum explicabo odit eius itaque harum, quod placeat veritatis?
          </p>
        </header>
        <div className='mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3'>

          <div className='flex min-w-0 items-center gap-3 rounded-xl border border-slate-200 bg-white p-4 shadow-sm'>
            <FontAwesomeIcon icon={faLocationDot} style={{ color: "rgb(0, 0, 0)", borderRadius: '50%' }} className='shrink-0 bg-blue-50 p-3 text-xl text-blue-900' />
            <div className='text-justify ms-2'>
              <p className='font-semibold text-slate-900'>BookStore-123</p>
              <p className='text-sm text-slate-600'>Calicut, Near Ksrtc Stand</p>
            </div>
          </div>

          <div className='flex min-w-0 items-center gap-3 rounded-xl border border-slate-200 bg-white p-4 shadow-sm'>
            <FontAwesomeIcon icon={faPhone} style={{ color: "rgb(0, 0, 0)", borderRadius: '50%' }} className='shrink-0 bg-blue-50 p-3 text-xl text-blue-900' />
            <h3 className='break-words font-semibold text-slate-900'>+91 7994699455</h3>


          </div>

          <div className='flex min-w-0 items-center gap-3 rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:col-span-2 lg:col-span-1'>
            <FontAwesomeIcon icon={faEnvelope} style={{ color: "rgb(0, 0, 0)", borderRadius: '50%' }} className='shrink-0 bg-blue-50 p-3 text-xl text-blue-900' />
            <p className='break-all font-semibold text-slate-900'>bookstore@gmail.com</p>
          </div>

        </div>

        <div className='mt-8 grid grid-cols-1 items-stretch gap-5 lg:grid-cols-2'>
          <div className='min-w-0 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7'>
            <div className='flex flex-col items-center'>
              <h2 className='text-2xl font-bold text-slate-900'>Send Me Message</h2>

              
                <div className='mt-6 flex w-full flex-col gap-3'>
                
               <form ref={form} onSubmit={sendEmail} className='flex flex-col gap-3'>
                 <input type="text" name='name' placeholder='Name' className='min-h-12 w-full rounded-lg border border-slate-300 bg-slate-50 px-4 py-3 outline-none transition focus:border-blue-700 focus:bg-white focus:ring-2 focus:ring-blue-100' />
                <input type="text" name='email' placeholder='Email' className='min-h-12 w-full rounded-lg border border-slate-300 bg-slate-50 px-4 py-3 outline-none transition focus:border-blue-700 focus:bg-white focus:ring-2 focus:ring-blue-100' />
                <textarea name='title' id="" placeholder='Message' className='w-full rounded-lg border border-slate-300 bg-slate-50 px-4 py-3 outline-none transition focus:border-blue-700 focus:bg-white focus:ring-2 focus:ring-blue-100' rows={8}></textarea>

                <button type='submit' className='min-h-12 w-full rounded-lg bg-blue-900 p-3 font-bold text-white transition-colors hover:bg-blue-800'>Send <FontAwesomeIcon icon={faPaperPlane} /></button>
              
               </form>
               </div>

            </div>



          </div>
          <div className='min-h-72 overflow-hidden rounded-2xl border border-slate-200 bg-white p-2 shadow-sm sm:p-3'>
            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d125218.54684727985!2d75.72841394018309!3d11.255555506919812!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba65938563d4747%3A0x32150641ca32ecab!2sKozhikode%2C%20Keralam!5e0!3m2!1sen!2sin!4v1790765730071!5m2!1sen!2sin" width="600" height="450" allowfllscreen="" loading="lazy" referrerpolicy="strict-origin-when-cross-origin" className='h-full min-h-72 w-full rounded-xl'></iframe>
          </div>
        </div>
        </div>
        <ToastContainer position='top-center' theme='colored' autoClose={3000} />
      </main>
    </>
  )
}

export default Contact

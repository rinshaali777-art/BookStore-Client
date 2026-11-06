import AdminHeader from '../components/AdminHeader'
import Sidebar from '../components/Sidebar'
import { useState } from 'react'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'
import { adminEditAPI } from '../../services/allApi'

function Settings() {

  const navigate = useNavigate()
  const [userDetails, setUserDetails] = useState({ _id: "", username: "", password: "", cpassword: "" })


  useEffect(() => {

    if (sessionStorage.getItem("user")) {
      const user = JSON.parse(sessionStorage.getItem("user"))
      setUserDetails({ ...userDetails, _id: user._id, username: user.username })

    }
  }, [])
  console.log(userDetails);

  const checkPasswordMatch = (data) => {
    setUserDetails({ ...userDetails, cpassword: data })

  }

  const resetProfileForm = () => {

    const user = JSON.parse(sessionStorage.getItem("user"))
    setUserDetails({ ...userDetails, _id: user._id, username: user.username, password: "", cpassword: "" })

  }

  const updateProfile = async () => {

    const { username, password, cpassword } = userDetails
    if (!username) {
      toast.warning("fill all fields completely")
    }
    else if (Boolean(password) !== Boolean(cpassword)) {
      toast.warning("Enter and confirm your new password")
    }
    else if (password && password !== cpassword) {
      toast.warning("Passwords do not match")
    }
    else {
      const reqbody = { username, password }

      const result = await adminEditAPI(userDetails._id, reqbody)
      console.log(result);
      if (result?.status === 200) {
        toast.success("Profile Updated Successfully")
        navigate('/login')
        sessionStorage.clear()
      } else {
        const errorMessage = result?.response?.data
        toast.error(typeof errorMessage === 'string' ? errorMessage : "Failed to update profile. Please try again.")
      }
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
          <div className='mx-auto max-w-6xl'>
            <header className='mb-6 sm:mb-8'>
              <p className='text-sm font-semibold uppercase tracking-wider text-blue-700'>Account management</p>
              <h1 className='mt-1 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl'>Settings</h1>
              <p className='mt-2 text-sm text-slate-600 sm:text-base'>Manage your admin profile and account details.</p>
            </header>
            <div className='grid grid-cols-1 items-start gap-5 lg:grid-cols-2 lg:gap-6'>
              <section className='rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7'>
                <h2 className='text-lg font-semibold text-slate-900'>About your account</h2>
                <div className='mt-4 space-y-4 text-sm leading-7 text-slate-600 sm:text-base'>
                  <p className='text-justify'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Itaque non labore quam aspernatur veniam quasi, laudantium dolor rem ab recusandae, amet doloribus expedita temporibus distinctio qui fugiat! Consectetur, temporibus veritatis.
                Modi eius veritatis architecto ea iure repellat ab eos enim suscipit placeat fugiat dolor aut, voluptas exercitationem vitae necessitatibus? Cum nesciunt magni voluptas optio eaque esse adipisci eligendi quibusdam delectus?
              </p>
                  <p className='text-justify'>
                Molestias accusantium adipisci fuga voluptatem aspernatur! Totam accusantium similique illo ipsa architecto, debitis qui ab natus distinctio nobis quod veniam at, neque, vitae impedit illum repellendus odit explicabo id ducimus!
                Atque corporis nulla perferendis modi possimus laboriosam nobis autem eos. Natus possimus quibusdam nisi eaque doloremque. Eius magnam exercitationem consequuntur ipsam obcaecati, dolores, non adipisci molestias tenetur minus aut veniam!</p>
                </div>
              </section>
              <section className='rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7'>
                <div className='flex flex-col items-center border-b border-slate-100 pb-6 text-center'>
                  <img src="https://bookstore-serverfeb26.onrender.com/uploads/image-1779697250528-dp.png" alt="" className='h-24 w-24 rounded-full object-cover ring-4 ring-blue-50 sm:h-28 sm:w-28' />
                  <h2 className='mt-4 text-lg font-semibold text-slate-900'>Profile details</h2>
                  <p className='mt-1 text-sm text-slate-500'>Update your account information below.</p>
                </div>

                <div className='mt-6 flex w-full flex-col gap-4'>
                  <input type="text" placeholder='User Name' className='min-h-12 w-full rounded-lg border border-slate-300 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition placeholder:text-slate-500 focus:border-blue-700 focus:bg-white focus:ring-2 focus:ring-blue-100' value={userDetails.username} onChange={(e) => setUserDetails({...userDetails, username: e.target.value})} />
                  <input type="password" placeholder='Password' name="" id="" className='min-h-12 w-full rounded-lg border border-slate-300 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition placeholder:text-slate-500 focus:border-blue-700 focus:bg-white focus:ring-2 focus:ring-blue-100' value={userDetails.password} onChange={(e) => setUserDetails({...userDetails, password: e.target.value})} />


                  <input type="password" placeholder='Confirm Password' name="" id="" className='min-h-12 w-full rounded-lg border border-slate-300 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition placeholder:text-slate-500 focus:border-blue-700 focus:bg-white focus:ring-2 focus:ring-blue-100' value={userDetails.confirmPassword} onChange={(e) => checkPasswordMatch( e.target.value )} />
                </div>

                <div className='mt-5 flex w-full flex-col gap-3 sm:flex-row'>
                  <button type='button' className='min-h-11 w-full rounded-lg border border-slate-300 bg-white px-4 py-2 font-semibold text-slate-700 transition-colors hover:bg-slate-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-500' onClick={resetProfileForm}>
                    Reset
                  </button>
                  <button type='button' className='min-h-11 w-full rounded-lg bg-blue-900 px-4 py-2 font-semibold text-white transition-colors hover:bg-blue-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-900' onClick={updateProfile}>
                    Update
                  </button>
                </div>
              </section>
            </div>
          </div>
        </main>
      </div>
    </>
  )
}

export default Settings
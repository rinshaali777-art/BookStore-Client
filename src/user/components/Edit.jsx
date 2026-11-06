import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark } from '@fortawesome/free-solid-svg-icons'
import { useEffect, useState } from 'react'
import axiosInstance from '../../api/axiosinstance'
import { userUpdateAPI } from '../../services/allApi'
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom'



function Edit() {
    const [editStatus, seteditStatus] = useState(false)
    const [userDetails, setUserDetails] = useState({ _id: "", username: "", password: "", cpassword: "", picture: "", bio: "" })
    const [existingPicture, setExistingPicture] = useState('')
    const [preview, setPreview] = useState("")
    const [imageFile, setImageFile] = useState(false)
    const [passwordMatch, setPasswordMatch] = useState(false)
    const navigate = useNavigate()

    useEffect(() => {

        if (sessionStorage.getItem("user")) {
            const user = JSON.parse(sessionStorage.getItem("user"))
            setUserDetails({ ...userDetails, _id: user._id, username: user.username, bio: user.bio })
            setExistingPicture(user.picture)
        }
    }, [])
    console.log(userDetails);
    console.log(existingPicture);

    const handleFileUpload = (e) => {

        const imageFile = e.target.files[0]
        if (imageFile.type.startsWith("image/")) {
            setUserDetails({ ...userDetails, picture: e.target.files[0] })
            setPreview(URL.createObjectURL(e.target.files[0]))
            setImageFile(true)
        }
        else {
            setImageFile(false)
        }


    }

    const checkPasswordMatch = (data) => {
        setUserDetails({ ...userDetails, cpassword: data })
        userDetails.password == data ? setPasswordMatch(true) : setPasswordMatch(false)

    }

    const resetProfileForm = () => {

        const user = JSON.parse(sessionStorage.getItem("user"))
        setUserDetails({ ...userDetails, _id: user._id, username: user.username, password: "", cpassword: "", picture: "", bio: user.bio })
        setExistingPicture(user.picture)

        setPreview("")
        setImageFile(false)
        setPasswordMatch(true)

    }

    const updateProfile = async () => {

        const { username,password,cpassword,bio } = userDetails
        if (!username, !bio) {
            toast.warning("fill all fields completely")
        } 
        else if (password&&cpassword) {
            if (passwordMatch) {
                const reqbody = new FormData

                for (let key in userDetails) {
                    if (key != "picture") {

                        reqbody.append(key, userDetails[key])

                    }else{
                        preview?reqbody.append(key,userDetails[key]):reqbody.append(key, existingPicture)
                    }

                }
                const result = await userUpdateAPI(userDetails._id, reqbody)
                console.log(result);
                if(result.status==200){
                    toast.success("Profile Updated Successfully")
                    seteditStatus(false)
                    navigate('/login')
                    sessionStorage.clear()
                }
            }
        }
        else{
            const reqbody = new FormData

                for (let key in userDetails) {
                    if (key != "picture") {

                        reqbody.append(key, userDetails[key])

                    }else{
                        preview?reqbody.append(key,userDetails[key]):reqbody.append(key, existingPicture)
                    }

                }
                const result = await userUpdateAPI(userDetails._id, reqbody)
                console.log(result);
                if(result.status==200){
                    toast.success("Profile Updated Successfully")
                    seteditStatus(false)
                    navigate('/login')
                    sessionStorage.clear()
                }
        }

    }

    return (

        <>

            <button className='min-h-11 rounded-lg bg-blue-900 px-4 py-2 font-semibold text-white transition-colors hover:bg-blue-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-900' onClick={() => seteditStatus(true)}>Edit</button>


            {/* modal */}
            {
                editStatus &&
                <div className='relative z-10'>
                    <div className='fixed inset-0 z-30 flex items-center justify-center overflow-y-auto bg-slate-950/60 p-3 backdrop-blur-sm sm:p-6'>
                            <div className='my-auto flex max-h-[calc(100dvh-1.5rem)] w-full max-w-xl flex-col overflow-y-auto rounded-2xl bg-white shadow-2xl sm:max-h-[calc(100dvh-3rem)]'>

                                {/* modal header */}

                                <div className='flex shrink-0 items-center justify-between bg-slate-900 p-4 text-white'>
                                    <h3 className='text-lg font-semibold'>Update Profile</h3>
                                    <button type='button' aria-label='Close profile editor' className='rounded-lg p-2 transition-colors hover:bg-white/10' onClick={() => seteditStatus(false)}><FontAwesomeIcon icon={faXmark} /></button>

                                </div>
                                {/* modal body */}
                                <div className='bg-slate-50 p-4 sm:p-6'>
                                    <div className='flex justify-center items-center'>

                                        <input type="file" className='hidden' id='userPic' onChange={e => handleFileUpload(e)} />
                                        <label htmlFor="userPic">

                                            {
                                                existingPicture == "" ?
                                                    <img className='h-28 w-28 cursor-pointer rounded-full object-cover ring-4 ring-blue-100 sm:h-32 sm:w-32' src={preview ? preview : "https://media.istockphoto.com/id/1300845620/vector/user-icon-flat-isolated-on-white-background-user-symbol-vector-illustration.jpg?s=612x612&w=0&k=20&c=yBeyba0hUkh14_jgv1OKqIH0CCSWU_4ckRkAoy2p73o="} alt="" />
                                                    :
                                                    existingPicture.startsWith('https://lh3.googleusercontent.com') ?
                                                        <img className='h-28 w-28 cursor-pointer rounded-full object-cover ring-4 ring-blue-100 sm:h-32 sm:w-32' src={preview ? preview : existingPicture} alt="" />
                                                        :
                                                        <img className='h-28 w-28 cursor-pointer rounded-full object-cover ring-4 ring-blue-100 sm:h-32 sm:w-32' src={preview ? preview : `${axiosInstance.defaults.baseURL}/uploads/${existingPicture}`} alt="" />

                                            }

                                        </label>



                                    </div>
                                    {
                                        !imageFile &&
                                        <div className='text-red-400 text-center mt-3'>
                                            *only upload image files
                                        </div>}
                                    <div className='mt-5 flex flex-col gap-3'>

                                        <input value={userDetails.username} type="text" placeholder='Username' className='min-h-12 rounded-lg border border-slate-300 bg-white px-4 py-3 outline-none transition focus:border-blue-700 focus:ring-2 focus:ring-blue-100' onChange={(e) => setUserDetails({ ...userDetails, username: e.target.value })} />

                                        <input value={userDetails.password} type="password" placeholder='New Password' className='min-h-12 rounded-lg border border-slate-300 bg-white px-4 py-3 outline-none transition focus:border-blue-700 focus:ring-2 focus:ring-blue-100' onChange={(e) => setUserDetails({ ...userDetails, password: e.target.value })} />

                                        <input value={userDetails.cpassword} type="password" placeholder='Confirm Password' className='min-h-12 rounded-lg border border-slate-300 bg-white px-4 py-3 outline-none transition focus:border-blue-700 focus:ring-2 focus:ring-blue-100' onChange={(e) => checkPasswordMatch(e.target.value)} />
                                        {
                                            !passwordMatch &&
                                            <div className='text-red-400 text-sm'>
                                                *password and confirm password must be same
                                            </div>
                                        }
                                        <textarea value={userDetails.bio} type="text" placeholder='Bio' className='min-h-24 rounded-lg border border-slate-300 bg-white px-4 py-3 outline-none transition focus:border-blue-700 focus:ring-2 focus:ring-blue-100' onChange={(e) => setUserDetails({ ...userDetails, bio: e.target.value })} />
                                    </div>


                                </div>
                                <div className='flex shrink-0 justify-end gap-3 border-t border-slate-100 bg-white p-4'>
                                    <button className='min-h-11 rounded-lg border border-slate-300 px-4 py-2 font-semibold text-slate-700 transition-colors hover:bg-slate-100' onClick={resetProfileForm}>Reset</button>
                                    <button className='min-h-11 rounded-lg bg-blue-900 px-5 py-2 font-semibold text-white transition-colors hover:bg-blue-800' onClick={updateProfile}>Update</button>
                                </div>
                            </div>
                    </div>
                </div>
            }
            {/* toaser */}
            <ToastContainer position='top-center' theme='colored' autoClose={3000} />
        </>


    )
}

export default Edit
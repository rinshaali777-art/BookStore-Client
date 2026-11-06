function Preloader() {
  return (
    <div className='flex bg-black min-h-screen w-full flex-col items-center justify-center gap-5  px-4 py-10'>
      <img src="https://cdn.dribbble.com/userupload/21561219/file/original-9696644fdca9d8f5a1f4f35410d62bf8.gif" alt="" className='h-auto max-h-[65vh] w-full max-w-3xl rounded-2xl object-contain'/>
      <p className='text-sm font-semibold tracking-wide text-slate-600'>Preparing your bookstore...</p>
    </div>
  )
}

export default Preloader

const Loader = ({show}) => {

  return (
    <>
      {show
        ? <div className='fixed w-[100vw] h-[100vh] top-0 left-0 flex justify-center items-center z-10 bg-gray-900/60 dark:bg-slate-900/70'>
            {/* <svg className="animate-spin -ml-1 mr-3 h-12 w-12 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-45" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="fill-blue-600" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg> */}
            <div className="relative flex justify-center items-center">
              <div className="absolute animate-spin rounded-full h-28 w-28 border-t-4 border-b-4 border-blue-500"></div>
              <img src="/Mask group (1).svg"  className="rounded-full h-20 w-20 animate-pulse" />
            </div>
          </div>
        : <></>
      }
    </>
  )
}

export default Loader
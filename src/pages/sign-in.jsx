import { baseURL, relativeURL } from "@/app/APIS"
import { routes } from "@/app/routes"
import Loader from "@/components/Loader"
import ThemeToggle from "@/components/ThemeToggle"
import { ExclamationTriangleIcon } from "@heroicons/react/20/solid"
import axios from "axios"
import { useRouter } from "next/router"
import { useState } from "react"

const signIn = () => {
  const router = useRouter()
  const [showLoader, setShowLoader] = useState(false)
  const [loginError, setLoginError] = useState("")
  const [user, setUser] = useState({
    email: "",
    password: ""
  })

  const handleChange = (e) => {
    // console.log(e);
    const { name, value } = e.target;
    setUser((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }

  const handleSignUp = (e) => {
    e.preventDefault()
    router.push(routes.signUp)
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    let data = user;
    setShowLoader(true)
    axios.post(baseURL + relativeURL.login, data).then((res) => {
      console.log(res)
      setShowLoader(false)
      if(res.data.success) {
        sessionStorage.setItem("user", JSON.stringify(res.data.user))
        router.push(routes.home)
      }
    }).catch((err) => {
      console.error(err)
      setShowLoader(false)
      setLoginError(err.response.data.message)
      setUser((prevData) => ({
        ...prevData,
        password: "",
      }))
      setTimeout(() => {
        setLoginError("")
      }, 5000)
    })
  }
  
  return (
    <>
      <Loader show={showLoader} />
      <div className="flex min-h-[100vh] flex-1 flex-col justify-center items-center px-6 py-12 lg:px-8 dark:bg-slate-900">
        {/* <div className="top-0 fixed right-0 m-4">
          <ThemeToggle />
        </div> */}
        <div className="flex flex-col justify-center items-center w-full sm:max-w-[550px] p-5 border rounded-xl shadow-lg bg-white dark:bg-slate-800">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <img className="mx-auto h-10 w-auto cursor-pointer" src="/Mask group.svg" alt="Your Company" onClick={() => router.push(routes.home)} />
            <h2 className="text-center text-2xl font-bold leading-9 tracking-tight text-gray-900 dark:text-gray-200">
              Sign In and Explore
            </h2>
          </div>
          <div className="mt-5 sm:mx-auto sm:w-full sm:max-w-sm w-full">
            <form className="space-y-6" method="POST" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-200">
                  Email address
                </label>
                <div className="mt-2">
                  <input id="email" name="email" type="email" autoComplete="email" required placeholder="Email" value={user.email} onChange={handleChange} className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 outline-0 sm:text-sm sm:leading-6 px-3 dark:bg-transparent dark:text-gray-200 focus:ring-blue-400" />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-200">
                    Password
                  </label>
                  <div className="text-sm">
                    {/* <a href="#" className="font-semibold text-blue-600 hover:text-blue-500">
                      Forgot password?
                    </a> */}
                  </div>
                </div>
                <div className="mt-2">
                  <input id="password" name="password" type="password" placeholder="Password" value={user.password} onChange={handleChange} autoComplete="password" required className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 outline-0 sm:text-sm sm:leading-6 px-3 dark:bg-transparent dark:text-gray-200 focus:ring-blue-400" />
                </div>
              </div>

              <div>
                <button type="submit" className="flex w-full justify-center rounded-md bg-blue-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 mb-4">
                  Sign In
                </button>
                {loginError
                  ? <div className="w-full flex items-center justify-center bg-red-50 py-2 px-3 rounded-md">
                      <ExclamationTriangleIcon className='h-7 w-7 items-center justify-center flex mr-3 text-red-600' />
                      <span className="text-red-600 font-semibold">{loginError}</span>
                    </div>
                  : <></>
                }
              </div>
            </form>
            <p className="mt-5 text-center text-sm text-gray-500 dark:text-gray-400">
              Not have account?{' '}
              <a href="#" className="font-semibold leading-6 text-blue-600 hover:text-blue-500" onClick={handleSignUp}>
                Sign Up
              </a>
            </p>
          </div>
        </div>
      </div>
    </>
  )
}

export default signIn
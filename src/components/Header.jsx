import { routes } from "@/app/routes";
import { useRouter } from "next/router";
import ThemeToggle from "./ThemeToggle";
import { useEffect, useState } from "react";

const Header = () => {
  const router = useRouter();
  const [user, setUser] = useState({});
  const [userFound, setUserFound] = useState(false)
  
  useEffect(() => {
    let tempUser = sessionStorage.getItem("user")
    if(tempUser) {
      tempUser = JSON.parse(tempUser)
      if(Object.keys(tempUser).length) {
        setUserFound(true);
        setUser(tempUser);
      } else {
        setUserFound(false);
        setUser({});
      }
    }
  }, [])
  
  const handleLogoClick = (e) => {
    e.preventDefault()
    router.push(routes.home)
  }
  
  const handleSignIn = (e) => {
    e.preventDefault()
    router.push(routes.signIn)
  }

  const handleSignUp = (e) => {
    e.preventDefault()
    router.push(routes.signUp)
  }

  const handleLogout = (e) => {
    e.preventDefault()
    sessionStorage.removeItem("user")
    localStorage.removeItem('theme')
    document.documentElement.classList.remove('dark')
    router.push(routes.home)
  }
  
  return (
    <div className="fixed z-[2] border-b border-gray-200 top-[0px] w-full mx-auto max-w-[2xl] px-4 bg-white dark:bg-slate-800 sm:px-6 lg:max-w-8xl">
      <header className="relative">
        <nav aria-label="Top" className="mx-auto w-full">
          <div className="">
            <div className="flex h-16 items-center">
              {/* Logo */}
              <div className="flex">
                <a href="#" onClick={handleLogoClick}>
                  <span className="sr-only">Your Company</span>
                  <img
                    className="h-8 w-auto"
                    src="/Mask group.svg"
                    alt=""
                  />
                </a>
              </div>
              {/* Sign in / up */}
              <div className="ml-auto flex items-center">
                {userFound
                  ? <>
                      <div className="">
                        <ThemeToggle />
                      </div>
                      <span className="h-6 w-[1px] bg-gray-200 mx-3" aria-hidden="true" />
                    </>
                  : <></>
                }
                <div className="flex flex-1 items-center justify-end">
                  {userFound
                    ? <>
                        <div className="text-sm font-medium text-gray-700 dark:text-gray-200 hover:dark:text-gray-300 hover:text-gray-800 capitalize" >
                          {user.username}
                        </div>
                        <span className="h-6 w-[1px] bg-gray-200 mx-3" aria-hidden="true" />
                        <a href="#" className="text-sm font-medium text-gray-700 dark:text-gray-200 hover:dark:text-gray-300 hover:text-gray-800" onClick={handleLogout}>
                          Logout
                        </a>
                      </>
                    : <>
                        <a href="#" className="text-sm font-medium text-gray-700 dark:text-gray-200 hover:dark:text-gray-300 hover:text-gray-800" onClick={handleSignIn} >
                          Sign In
                        </a>
                        <span className="h-6 w-[1px] bg-gray-200 mx-3" aria-hidden="true" />
                        <a href="#" className="text-sm font-medium text-gray-700 dark:text-gray-200 hover:dark:text-gray-300 hover:text-gray-800" onClick={handleSignUp}>
                          Sign Up
                        </a>
                      </>
                  }
                </div>
              </div>
            </div>
          </div>
        </nav>
      </header>
    </div>
  )
}

export default Header;
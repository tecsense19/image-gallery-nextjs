import { useEffect, useState } from "react"
import Header from "./Header"
import { ArrowUpIcon } from "@heroicons/react/20/solid"

const Layout = ({ children }) => {
  const [scrollTop, setScrollTop] = useState(0)

  useEffect(() => {
    const handleScroll = (event) => {
      setScrollTop(window.scrollY)
    }
    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  const handleScrollTop = () => {
    // window.scrollTo(0, 0)
    const scrollWindow = function () {  
      if (window.scrollY != 0) {
        setTimeout(function () {
          window.scrollTo(0, window.scrollY - 50);
          scrollWindow();
        }, 5);
      }
    };
    scrollWindow();
  }

  return (
    <>
      <Header />
      {children}
      {scrollTop > 10
        ? <>
            <div className="fixed bottom-[20px] right-[20px] z-[2]">
              <button className="bg-blue-500 p-2 rounded-full" onClick={handleScrollTop}>
                <ArrowUpIcon className="w-6 h-6 text-white" />
              </button>
            </div>
          </>
        : <></>
      }
    </>
  )
}

export default Layout
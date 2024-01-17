import '../app/globals.css'
import { useRouter } from 'next/router';
import { routes } from '@/app/routes';
import Image from 'next/image';
// import Layout from '@/components/Layout';
import ThemeToggle from '@/components/ThemeToggle';
import { useEffect, useState } from 'react';

const index = () => {
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

  return (
    <>
      <div className="relative isolate bg-white dark:bg-slate-900 px-6 h-[100vh]">
      {userFound
        ? <>
            <div className='position-fixed right-0 bg-transparent flex justify-end items-center pt-4'>
              <div className="text-sm font-semibold text-gray-700 dark:text-gray-200 hover:dark:text-gray-300 hover:text-gray-800 capitalize flex items-center" >
                {user.username}
              </div>
              <span className="h-6 w-[1px] bg-gray-300 mx-3" aria-hidden="true" />
              <ThemeToggle />
            </div>
          </>
        : <></>
      }
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <svg className="absolute left-[max(50%,25rem)] top-0 h-[64rem] w-[128rem] -translate-x-1/2 stroke-gray-200 dark:stroke-gray-700 [mask-image:radial-gradient(64rem_64rem_at_top,white,transparent)]" aria-hidden="true">
            <defs>
              <pattern id="e813992c-7d03-4cc4-a2bd-151760b470a0" width="200" height="200" x="50%" y="-1" patternUnits="userSpaceOnUse">
                <path d="M100 200V.5M.5 .5H200" fill="none" />
              </pattern>
            </defs>
            <svg x="50%" y="-1" className="overflow-visible fill-gray-50 dark:fill-slate-800">
              <path d="M-100.5 0h201v201h-201Z M699.5 0h201v201h-201Z M499.5 400h201v201h-201Z M-300.5 600h201v201h-201Z" strokeWidth="0" />
            </svg>
            <rect width="100%" height="100%" strokeWidth="0" fill="url(#e813992c-7d03-4cc4-a2bd-151760b470a0)" />
          </svg>
        </div>
        <div className="h-[85%] flex items-center justify-center">
          <div className="max-w-lg">
            <p className="text-base font-semibold leading-7 text-blue-600 dark:text-blue-400">Welcome To</p>
            <h1 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-200 sm:text-4xl">Image Gallery</h1>
            <p className="mt-6 text-xl leading-8 text-gray-700 dark:text-gray-300">Captivating moments in pixels, Explore our stunning Image Gallery for a visual journey like no other.</p>
            <div className='flex justify-start items-center mt-6 flex-wrap'>
              <button type="button" className="flex items-center justify-center rounded-md bg-blue-600 px-3 py-2 text-lg font-semibold text-white shadow-xl hover:bg-blue-500 m-2" onClick={() => router.push(routes.pixabayImages)}>
                Pixabay
                <Image className='rounded-sm ml-2 hidden sm:block' src="/pixabay.png" alt='' height={20} width={20} />
              </button>
              <button type="button" className="flex items-center justify-center rounded-md bg-blue-600 px-3 py-2 text-lg font-semibold text-white shadow-xl hover:bg-blue-500 m-2" onClick={() => router.push(routes.flickrImages)}>
                Flickr
                <Image className='rounded-sm ml-3 hidden sm:block' src="/flickr.png" alt='' height={20} width={20} />
              </button>
              <button type="button" className="flex items-center justify-center rounded-md bg-blue-600 px-3 py-2 text-lg font-semibold text-white shadow-xl hover:bg-blue-500 m-2" onClick={() => router.push(routes.generateImage)}>
                AI Generated Image
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default index
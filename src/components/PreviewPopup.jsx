import { Fragment, useEffect, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { XMarkIcon, ChevronDownIcon } from '@heroicons/react/20/solid'
import Image from 'next/image'
import { pixaBayAPI } from '@/app/Services'
import Loader from './Loader'

const PreviewPopup = ({ open, setOpen, imageUrl, image, handleDownload, imageName, imageWidth, imageHeight, type }) => {
  const [previewImages, setPreviewImages] = useState([])
  const [showLoader, setShowLoader] = useState(false);
  const [showPreviewImage, setShowPreviewImage] = useState(false);
  const [previewImageUrl, setPreviewImageUrl] = useState("")
  const [previewImage, setPreviewImage] = useState({})
  const [previewImageName, setPreviewImageName] = useState("")
  const [previewImageWidth, setPreviewImageWidth] = useState()
  const [previewImageHeight, setPreviewImageHeight] = useState()

  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
    // setTimeout(() => {
    //   if(document.getElementById("downloadDropDown")) {
    //     let tempHeight = document.getElementById("downloadDropDown").clientHeight
    //     console.log(tempHeight, `-${tempHeight + 17}px`)
    //     document.getElementById("downloadDropDown").style.top = `-${tempHeight + 17}px`
    //   }
    // }, 100)
  };

  useEffect(() => {
    let flag = false;
    if (type === "pixabay") {
      if (image) {
        if (Object.keys(image).length) {
          flag = true
          const fetchData = async () => {
            let search = image.tags;
            search = search.replace(",", " or ")
            setShowLoader(true)
            const response = await pixaBayAPI(search, 1, 4)
            const data = await response.json();
            setShowLoader(false)
            setPreviewImages(data.hits)
          }
          fetchData()
        }
      }
    }
    if (flag === false) {
      setPreviewImages([])
    }
  }, [image])

  const handleCloseModal = () => {
    setShowPreviewImage(false)
    setOpen(false)
    setIsOpen(false);
  }

  const handleLoadComplete = (e) => {
    let element = document.getElementById(`preview_image`)
    element.classList.remove('animate-pulse')
  }

  const handlePreviewImgLoadComplete = (id) => {
    let element = document.getElementById(`preview_image_${id}`)
    element.classList.remove('animate-pulse')
  }

  const handlePreviewImageChange = (item) => {
    setShowPreviewImage(true)
    setPreviewImageUrl(item.webformatURL)
    setPreviewImage(item)
    setPreviewImageName(item.user)
    setPreviewImageWidth(item.webformatWidth)
    setPreviewImageHeight(item.webformatHeight)
    let element = document.getElementById(`preview_image`)
    element.classList.add('animate-pulse')

    const fetchData = async () => {
      let search = item.tags;
      search = search.replace(",", " or ")
      setShowLoader(true)
      const response = await pixaBayAPI(search, 1, 4)
      const data = await response.json();
      setShowLoader(false)
      setPreviewImages(data.hits)
    }
    fetchData()
  }

  return (
    <Transition appear show={open} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={handleCloseModal}>
        <Transition.Child as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0" enterTo="opacity-100" leave="ease-in duration-200" leaveFrom="opacity-100" leaveTo="opacity-0">
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <Loader show={showLoader} />
          <div className="flex min-h-full items-center justify-center p-4 text-center sm:items-center sm:py-0 sm:px-4">
            <Transition.Child as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0 scale-95" enterTo="opacity-100 scale-100" leave="ease-in duration-200" leaveFrom="opacity-100 scale-100" leaveTo="opacity-0 scale-95" >
              <Dialog.Panel className="relative transform overflow-hidden rounded-xl bg-white dark:bg-slate-900 text-left shadow-xl transition-all sm:my-8 w-full sm:w-full sm:max-w-[700px]">
                <div className="p-4 sm:p-6 sm:pb-4 sm:pt-3">
                  <div className="sm:flex sm:items-start flex-col">
                    <div className='flex w-full justify-between items-center'>
                      <div className='text-2xl font-bold tracking-tight text-gray-800 dark:text-gray-200'>PREVIEW</div>
                      <button className='text-2xl font-bold tracking-tight outline-none' onClick={handleCloseModal}>
                        <XMarkIcon className='w-8 h-8 text-blue-500 hover:text-blue-600' />
                      </button>
                    </div>
                    <div id='preview_image' className="aspect-h-1 aspect-w-1 w-full bg-gray-200 dark:bg-gray-800 xl:aspect-h-8 xl:aspect-w-7 mt-3 rounded-lg animate-pulse">
                      <Image src={showPreviewImage ? previewImageUrl : imageUrl} alt={showPreviewImage ? previewImageName : imageName} className="h-full w-full object-contain object-center" sizes="(min-width: 640px) 640px, 100vw" height={1000} width={1000} priority onLoad={handleLoadComplete} />
                      <div className='flex items-end justify-end'>
                        <div className='px-3 py-2 bg-white rounded-tl-lg font-semibold text-md sm:text-lg text-gray-800 dark:bg-slate-900 dark:text-gray-200'>{`${showPreviewImage ? previewImageWidth : imageWidth} x ${showPreviewImage ? previewImageHeight : imageHeight}`}</div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 dark:bg-slate-800 sm:flex sm:flex-row-reverse p-4 sm:px-6">
                  <button type="button" className="inline-flex w-full justify-center rounded-md bg-blue-600 px-3 py-2 text-md font-semibold text-white shadow-sm hover:bg-blue-500 sm:ml-3 sm:w-auto outline-none" autoFocus={false} onClick={() => handleDownload(showPreviewImage ? previewImage : image)}>
                    <span> Download </span>
                  </button>
                  {/* <div className="sm:w-auto w-full relative">
                    {isOpen && (
                      <div id='downloadDropDown' className="absolute right-0 -top-[133px] mt-2 w-56 rounded-md shadow-lg bg-white dark:bg-slate-800 ring-1 ring-black dark:ring-gray-500 ring-opacity-5 focus:outline-none">
                        <div className="py-1">
                          <a href="#" className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-100 hover:bg-gray-100 hover:dark:bg-slate-700" onClick={(e) => e.preventDefault()}>
                            Thmbnail Image
                          </a>
                          <a href="#" className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-100 hover:bg-gray-100 hover:dark:bg-slate-700" onClick={(e) => e.preventDefault()}>
                            Normal Image
                          </a>
                          <a href="#" className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-100 hover:bg-gray-100 hover:dark:bg-slate-700" aria-disabled="true" onClick={(e) => e.preventDefault()}>
                            HD Image
                          </a>
                        </div>
                      </div>
                    )}
                    <div className='flex justify-center items-center'>
                      <button type="button" className="inline-flex w-full justify-center rounded-md bg-blue-600 text-md font-semibold text-white shadow-sm hover:bg-blue-500 sm:ml-3 sm:w-auto outline-none flex justify-between items-center p-0 relative" id="options-menu" aria-haspopup="true" onClick={toggleDropdown}>
                        <div className='py-2 flex justify-center items-center w-full px-3'>
                          Download
                        </div>
                        <div className='h-[40px] flex justify-center items-center border-l p-2 absolute sm:relative right-0'>
                          <ChevronDownIcon className='h-5 w-5' />
                        </div>
                      </button>
                    </div>
                  </div> */}
                  <button type="button" className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-md font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto outline-none" onClick={handleCloseModal}>
                    Cancel
                  </button>
                </div>
                {previewImages.length
                  ? <div className="grid gap-5 sm:gap-4 grid-cols-2 p-4 sm:p-6">
                    {previewImages?.map((item) => (
                      <div key={item.id} className="group">
                        <div id={`preview_image_${item.id}`} className="relative group aspect-h-1 aspect-w-1 w-full bg-gray-200 dark:bg-gray-800 xl:aspect-h-8 xl:aspect-w-7 shadow dark:shadow-lg animate-pulse dark:shadow-gray-600 overflow-hidden rounded-lg">
                          <Image src={item.webformatURL} alt={item.user} className="h-full w-full object-cover cursor-pointer object-center" sizes="(min-width: 640px) 640px, 100vw" height={item.webformatHeight} width={item.webformatWidth} priority unoptimized onLoad={() => handlePreviewImgLoadComplete(item.id)} onClick={() => handlePreviewImageChange(item)} />
                          {/* <div className='absolute inset-0 w-full h-full bg-gradient-to-t from-gray-900 dark:from-gray-600 bg-opacity-60 text-blue-600 opacity-0 group-hover:opacity-100 transition duration-300 flex items-end justify-center p-4'>
                              <button className="btn border border-white text-white hover:border-transparent hover:bg-white hover:text-blue-700 font-semibold p-2 rounded-md mr-2">
                                <EyeIcon className='h-5 w-6'/>
                              </button>
                              <button className="btn border border-white text-white hover:border-transparent hover:bg-white hover:text-blue-700 font-semibold p-2 rounded-md ml-2">
                                <ArrowDownTrayIcon className='h-5 w-6'/>
                              </button>
                            </div> */}
                        </div>
                      </div>
                    ))}
                  </div>
                  : <></>
                }
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
}

export default PreviewPopup
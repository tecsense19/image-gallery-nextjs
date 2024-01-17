import Pagination from '@/components/pagination'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { pixaBayAPI } from '@/app/Services'
import { ArrowLeftIcon, ExclamationTriangleIcon, EyeIcon, ArrowDownTrayIcon } from '@heroicons/react/20/solid'
import { useRouter } from 'next/router';
import { routes } from '@/app/routes'
import axios from 'axios'
import Loader from '@/components/Loader'
import PreviewPopup from '@/components/PreviewPopup'
import Layout from '@/components/Layout'

const perPage = 20

const PixabayImages = ({ data }) => {
  const router = useRouter();

  const [images, setImages] = useState([])
  const [showLoader, setShowLoader] = useState(false)
  const [currentPage, setCurrentPage] = useState(1);
  const [totalRecords, setTotalRecords] = useState(100)
  const [searchVal, setSearchVal] = useState("")
  const [previewImageUrl, setPreviewImageUrl] = useState("")
  const [previewImageObj, setPreviewImageObj] = useState("")
  const [previewImageName, setPreviewImageName] = useState("")
  const [previewImageWidth, setPreviewImageWidth] = useState("")
  const [previewImageHeight, setPreviewImageHeight] = useState("")
  const [lastSearchVal, setLastSearchVal] = useState("")
  const [showPreviewModal, setShowPreviewModal] = useState(false)

  const handlePageChange = (page) => {
    if(currentPage !== page) {
      setCurrentPage(page);
      fetchPhotos(lastSearchVal, page)
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setShowLoader(true)
        const response = await pixaBayAPI("", 1, perPage);
        const data = await response.json();
        setShowLoader(false)
        setImages(data.hits)
        setTotalRecords(data.totalHits)
      } catch (err) {
        console.error(err)
        setImages([])
        setTotalRecords(0)
      }
    }
    fetchData()
  }, [])

  const fetchPhotos = async (search, pageNo) => {
    setShowLoader(true)
    setImages([])
    try {
      const response = await pixaBayAPI(search, pageNo, perPage);
      const tempData = await response.json();
      setImages(tempData.hits)
      setTotalRecords(tempData.totalHits)
      setShowLoader(false)
    } catch (error) {
      setShowLoader(false)
      console.error('Error fetching data:', error);
    }
  }

  const handleEnterSearch = (event) => {
    if(event.code === "Enter") {
      event.target.blur()
      if(searchVal !== lastSearchVal) {
        setLastSearchVal(searchVal)
        setCurrentPage(1)
        fetchPhotos(searchVal, 1)
      }
    }
  }

  const handleDownload = async (image) => {
    let imageUrl = image.webformatURL;
    let imageName = image.user
    setShowLoader(true)
    const response = await axios.get(imageUrl, { responseType: 'arraybuffer' });
    const blob = new Blob([response.data], { type: response.headers['content-type'] });
    const link = document.createElement('a')
    link.href = window.URL.createObjectURL(blob);
    link.download = imageName; // You can customize the downloaded file name
    document.body.appendChild(link);
    link.click();
    setShowLoader(false)
    document.body.removeChild(link);
  }

  const handlePreview = (image) => {
    setPreviewImageUrl(image.webformatURL)
    setPreviewImageObj(image)
    setPreviewImageName(image.user)
    setPreviewImageWidth(image.webformatWidth)
    setPreviewImageHeight(image.webformatHeight)
    setTimeout(() => {
      setShowPreviewModal(true)
    }, 100)
  }

  const handleLoadComplete = (id) => {
    let element =  document.getElementById(`pixabay_image_${id}`)
    element.classList.remove('animate-pulse')
  }

  return (
    <Layout>
      <div className="relative top-[48px] bg-white dark:bg-slate-900 min-h-[100vh]">
        <Loader show={showLoader} />
        <PreviewPopup open={showPreviewModal} setOpen={setShowPreviewModal} image={previewImageObj} imageUrl={previewImageUrl} handleDownload={handleDownload} imageName={previewImageName} imageWidth={previewImageWidth} imageHeight={previewImageHeight} type="pixabay" />
        <div className="w-full mx-auto max-w-[2xl] px-4 pt-5 pb-8 sm:px-6 lg:max-w-8xl">
          <div className='flex justify-between mt-3'>
            <div className='cursor-pointer' onClick={() => router.push(routes.home)}>
              <ArrowLeftIcon className="h-7 w-7 text-blue-500" aria-hidden="true" />
            </div>
            <button className='btn px-2 text-blue-500 hover:text-blue-600 tracking-wide font-semibold' onClick={() => router.push(routes.flickrImages)}>FLICKR</button>
          </div>
          <h2 className="text-2xl font-bold tracking-tight text-gray-900 mt-3 text-black dark:text-white">PIXABAY IMAGES</h2>
          <input type="text" placeholder="Search Image" value={searchVal} onChange={(e) => setSearchVal(e.target.value)} onKeyUp={handleEnterSearch}
            className="mt-5 block w-full rounded-lg bg-gray-100 dark:bg-transparent border border-transparent dark:border-gray-200 focus:border-blue-500 focus:dark:border-blue-500 focus:bg-white focus:dark:bg-transparent dark:text-white p-3 px-4 text-base tracking-wide focus:outline-none" />
          {totalRecords
            ? <>
                <div className='mt-4'>
                  <Pagination currentPage={currentPage} setCurrentPage={setCurrentPage} totalRecords={totalRecords} perPage={perPage} handlePageChange={handlePageChange} />
                </div>
                <div className="grid grid-cols-1 gap-x-6 gap-y-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8 xl:gap-y-8 mt-5">
                  {images.map((image) => (
                    <div key={image.id} className="group">
                      <div id={`pixabay_image_${image.id}`} className="relative group aspect-h-1 aspect-w-1 w-full bg-gray-200 xl:aspect-h-8 xl:aspect-w-7 shadow dark:shadow-lg animate-pulse dark:shadow-gray-600 overflow-hidden rounded-lg">
                        <Image src={image.webformatURL} alt={image.user} className="h-full w-full object-cover object-center" sizes="(min-width: 640px) 640px, 100vw" height={image.webformatHeight} width={image.webformatWidth} priority unoptimized onLoad={() => handleLoadComplete(image.id)} />
                        <div className='absolute inset-0 w-full h-full bg-gradient-to-t from-gray-900 dark:from-gray-600 bg-opacity-60 text-blue-600 opacity-0 group-hover:opacity-100 transition duration-300 flex items-end justify-center p-4'>
                          <button className="btn border border-white text-white hover:border-transparent hover:bg-white hover:text-blue-700 font-semibold p-2 rounded-md mr-2" onClick={() => handlePreview(image)}>
                            <EyeIcon className='h-5 w-6'/>
                          </button>
                          <button className="btn border border-white text-white hover:border-transparent hover:bg-white hover:text-blue-700 font-semibold p-2 rounded-md ml-2" onClick={() => handleDownload(image)}>
                            <ArrowDownTrayIcon className='h-5 w-6'/>
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            : <>
                <div className='flex justify-center mt-20 items-center'>
                  <ExclamationTriangleIcon className='h-8 items-center justify-center flex w-8 mr-3 text-red-600' />
                  <div className='flex text-xl font-semibold text-black dark:text-white'>No Items Found</div>
                </div>
              </>
          }
        </div>
      </div>
    </Layout>
  )
}

export default PixabayImages
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router';
import Loader from '@/components/Loader'
import Layout from '@/components/Layout'
import { routes } from '@/app/routes';
import { ArrowLeftIcon } from '@heroicons/react/20/solid';
import OpenAI from 'openai';
import axios from 'axios';
import Image from 'next/image';

const PixabayImages = ({ data }) => {
  const openAI = new OpenAI({apiKey: "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", dangerouslyAllowBrowser: true});
  const router = useRouter();
  const [searchVal, setSearchVal] = useState("")
  const [lastSearchVal, setLastSearchVal] = useState("")
  const [showLoader, setShowLoader] = useState(false)
  const [imageURL, setImageURL] = useState("")
  const [imageWidth, setImageWidth] = useState(1024)
  const [imageHeight, setImageHeight] = useState(1024)
  const [selectedOption, setSelectedOption] = useState("1024x1024");

  const options = [
    { label: '256 x 256', value: '256x256' },
    { label: '512 x 512', value: '512x512' },
    { label: '1024 x 1024', value: '1024x1024' },
    { label: '1024 x 1792', value: '1024x1792' },
    { label: '1792 x 1024', value: '1792x1024' },
  ];
  
  const handleOptionChange = (value) => {
    setSelectedOption(value);
    let tempHeightWidth = value.split("x")
    console.log(Number(tempHeightWidth[0]), Number(tempHeightWidth[1]))
    setImageWidth(Number(tempHeightWidth[0]))
    setImageHeight(Number(tempHeightWidth[1]))
    // setTimeout(() => {
    textToImage(Number(tempHeightWidth[0]), Number(tempHeightWidth[1]))
    // }, 500)
  };

  useEffect(() => {
    // const fetchData = () => {
    //   openAI.createImage({ model: "dall-e-3",
    //   prompt: "a white siamese cat",
    //   n: 1,
    //   size: "1024x1024", }).then((res) => console.log(res)).catch((err) => console.error(err))
    // }
    // fetchData()
  }, [])

  const handleSubmitTextToImage = (event) => {
    setLastSearchVal(searchVal)
    textToImage(imageWidth, imageHeight)
  }

  const textToImage = (width, height) => {
    setShowLoader(true);
    // let data = {
    //   "job": {
    //     "name": "sd-lcm",
    //     "data": {
    //       "model_version": "sdxl-1.0-lcm-base",
    //       "lcm_lora_scale": 0,
    //       "guidance_scale": 12,
    //       "strength": 0.25,
    //       "prompt": searchVal,
    //       "negativePrompt": "naked, nude, sexy, monochrome, lowres, bad anatomy, low quality",
    //       "prompts": [],
    //       "seed": 5113590,
    //       "width": width,
    //       "height": height,
    //       "num_steps": 60,
    //       "crop_init_image": true,
    //       "init_image": null
    //     }
    //   },
    //   "environment": null,
    //   "browserToken": "Joh9wfSf4ri0rvSZFsd0"
    // }
    setImageURL("")
    // axios.post("https://www.artbreeder.com/api/realTimeJobs", data).then((res) => {
    //   setShowLoader(false)
    //   console.log(res)
    //   let element = document.getElementById(`generatedImage`)
    //   element.classList.add('animate-pulse')
    //   setImageURL(res.data.url)
    // }).catch((err) => {
    //   setShowLoader(false)
    //   console.error(err)
    // })
    let data = {
      "prompt": searchVal,
      "withPromptImprovement": true,
      "useGPU": false
    }
    // let header = {
    //   "Authorization": "Bearer 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"
    // }
    axios.post("https://open.ai/api/images", {data: data} ,{ headers: { 'Access-Control-Allow-Origin': '*' }}).then((res) => {
      setShowLoader(false)
      console.log(res)
      let element = document.getElementById(`generatedImage`)
      element.classList.add('animate-pulse')
      setImageURL(`https://storage.googleapis.com/boom-ai-images/results/${res.data.id}/00001.jpg`)
    }).catch((err) => {
      setShowLoader(false)
      console.error(err)
    })
  }

  const handleImgLoadComplete = () => {
    let element = document.getElementById(`generatedImage`)
    element.classList.remove('animate-pulse')
  }

  const handleDownload = async () => {
    let imageUrl = imageURL;
    let imageName = `${imageWidth} x ${imageHeight}`
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

  return (
    <Layout>
      <div className="relative top-[48px] bg-white dark:bg-slate-900 min-h-[100vh]">
        <Loader show={showLoader} />
        <div className="w-full mx-auto max-w-[2xl] px-4 pt-5 pb-8 sm:px-6 lg:max-w-8xl">
          <div className='flex justify-between mt-3'>
            <div className='cursor-pointer' onClick={() => router.push(routes.home)}>
              <ArrowLeftIcon className="h-7 w-7 text-blue-500" aria-hidden="true" />
            </div>
          </div>
          <h2 className="text-2xl font-bold tracking-tight text-gray-900 mt-3 text-black dark:text-white">AI IMAGE GENERATOR</h2>
          <div className='my-5 grid gap-5 md:gap-4 grid-cols-1 md:grid-cols-2 pb-4 md:pb-6'>
            <div className=''>
              <textarea type="text" placeholder="Write Description For Image" value={searchVal} onChange={(e) => setSearchVal(e.target.value)} className="block w-full rounded-lg bg-gray-100 dark:bg-transparent border border-transparent dark:border-gray-200 focus:border-blue-500 focus:dark:border-blue-500 focus:bg-white focus:dark:bg-transparent dark:text-white p-3 px-4 text-base tracking-wide focus:outline-none" rows={5} autoComplete='both' />
              <div className='w-full flex justify-start items-center'>
                <button className='py-2 px-4 font-md text-white bg-blue-600 hover:bg-blue-700 rounded-md my-3' onClick={handleSubmitTextToImage}>Submit</button>
              </div>
              {imageURL
                ? <>
                    <div className='flex items-center flex-wrap'>
                      {options.map((option) => (
                        <label key={option.value} className="inline-flex items-center mr-3 mb-3 cursor-pointer">
                          <input type="radio" value={option.value} checked={selectedOption === option.value} onChange={() => handleOptionChange(option.value)} className="form-radio h-5 w-5 text-blue-500 cursor-pointer" name='size' />
                          <span className="ml-1 text-indigo-600 dark:text-gray-100">{option.label}</span>
                        </label>
                      ))}
                    </div>
                    <div className='w-full flex justify-start items-center'>
                      <button className='py-2 px-4 font-md text-white bg-blue-600 hover:bg-blue-700 rounded-md my-3' onClick={handleDownload}>Download</button>
                    </div>
                  </>
                : <></>
              }
            </div>
            <div id='generatedImage' className={`aspect-h-1 aspect-w-1 w-full bg-gray-200 dark:bg-gray-800 xl:aspect-h-8 xl:aspect-w-7 rounded-lg overflow-hidden ${imageURL ? 'animate-pulse' : ""}`}>
              {imageURL
                ? <Image src={imageURL} alt={"Not Found"} className="h-full w-full object-contain object-center" sizes="(min-width: 640px) 640px, 100vw" height={imageHeight} width={imageWidth} priority onLoad={() => handleImgLoadComplete()} />
                : <></>
              }
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default PixabayImages
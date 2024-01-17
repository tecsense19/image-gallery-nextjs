// import axios from "axios"

const pixaBayAPI = async (search, pageNumber, perPage) => {
  // let params = {
  //   key: "40521581-d0ac90af5710ebbb5a4993d2f",
  //   q: search,
  //   image_type: "photo",
  //   pretty: true,
  //   page: pageNumber,
  //   per_page: perPage
  // }
  // let data = await axios.get(`https://pixabay.com/api/`, {params: params})
  let data = await fetch(`https://pixabay.com/api/?key=40521581-d0ac90af5710ebbb5a4993d2f&q=${search}&image_type=photo&pretty=true&page=${pageNumber}&per_page=${perPage}`)
  return data
}

const flickrAPI = async (search, pageNumber, perPage) => {
  let data
  if(search) {
    data = await fetch(`https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=80f7d9589f7717d8c75e92b2646dcc57&text="${search}"&secret=d31dfa5e440329fd&format=json&per_page=${perPage}&page=${pageNumber}&nojsoncallback=1&extras=url_m,url_l,height,width`)
  } else {
    data = await fetch(`https://api.flickr.com/services/rest/?method=flickr.photos.getRecent&api_key=80f7d9589f7717d8c75e92b2646dcc57&secret=d31dfa5e440329fd&format=json&per_page=${perPage}&page=${pageNumber}&nojsoncallback=1&extras=url_m,url_l,url_o,height,width`)
  }
  return data
}

export { pixaBayAPI, flickrAPI }
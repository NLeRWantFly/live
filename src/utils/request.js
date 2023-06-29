import axios from 'axios'

// create an axios instance
const service = axios.create({
  // baseURL: 'http://chenyp.top:8008', // url = base url + request url
  baseURL: 'http://localhost:8080', // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 5000 // request timeout
})

// request interceptor
service.interceptors.request.use(
  config => config
)

// response interceptor
service.interceptors.response.use(
  /**
   * If you want to get http information such as headers or status
   * Please return  response => response
   */

  /**
   * Determine the request status by custom code
   * Here is just an example
   * You can also judge the status by HTTP Status Code
   */
  response => {
    return response.data;
  }
)

export default service

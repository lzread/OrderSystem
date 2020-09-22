import axios from 'axios'
import store from '@/store'
import Cookies from 'js-cookie'

// create an axios instance
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  timeout: 5000 // request timeout
})

// request interceptor
service.interceptors.request.use(
  config => {
    // do something before request is sent
    if (store.getters.token) {
      // let each request carry token
      // ['authorization'] is a custom headers key
      // please modify it according to the actual situation
      config.headers['authorization'] = 'Bearer ' + Cookies.get('token')

    }
    return config
  },
  error => {
    // do something with request error
    console.log(error) // for debug
    return Promise.reject(error)
  }
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
    const res = response.data
    // if the custom code is not 200, it is judged as an error.
    if (res.code !== 200) {
      console.log(res.message || 'Error')
      // 50008: Illegal token; 50012: Other clients logged in; 50014: Token expired;
      if (res.code === 50008 || res.code === 50012 || res.code === 50014) {
        console.log('You have been logged out, you can cancel to stay on this page, or log in again');
      }

      return Promise.reject(new Error(res.message || 'Error'))
    } else {
      return res
    }
  },
  error => {
    const res = error.response.data
    if (res.code == 401) {
      store.dispatch("user/logout").then(() => {
        location.reload()
      })
    }
    return Promise.reject(error)
  }
)

export default service

import Vue from 'vue'
import axios, {interceptors} from 'axios'

import store from 'store'
import {alert, login, on, warn} from 'utils'

axios.defaults.baseURL = __MOCK__ ? '' : BASE_URL
axios.defaults.headers['X-Requested-With'] = 'XMLHttpRequest'

Vue.prototype.$http = axios

// the `get` method is different from `post` by default, we alias it as a same-signature method here!
axios.get = (url, params, config) => axios({
  method: 'get',
  params,
  url,
  ...config
})

const setProgress = (config, progress) => config.noInterceptor || store.dispatch('setProgress', progress)

const requestFunc = config => setProgress(config, 50) && config
interceptors.request.use(requestFunc)

const PERMISSION_DENIED = () => alert('您没有该资源的访问权限!')

const HANDLER = {
  401: PERMISSION_DENIED,
  404() {
    alert('未找到匹配的 url 请求!')
  },
  500() {
    alert('系统异常，请稍后重试！')
  }
}

const responseFunc = response => setProgress(response.config, 100) && response
const errorFunc = error => {
  const {response} = error
  const {config, status} = response
  setProgress(config, 0)
  config.noInterceptor || HANDLER[status] && HANDLER[status]()
  return Promise.reject(error)
}
interceptors.response.use(responseFunc, errorFunc)

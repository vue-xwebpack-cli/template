import 'styles/bootstrap'
import 'styles/app'
import Vue from 'vue'

import 'plugins'

import store, {dispatch, getters} from 'store'
import router from 'router'
import App from 'views/App'

import utils, {on, throttle} from 'utils'

Object.defineProperty(Vue.prototype, '$util', {
  value: utils,
  readable: true,
  writable: __DEV__
})


if (module.hot) module.hot.accept()

// eslint-disable-next-line no-new
new Vue({
  ...App,
  el: '#app',
  router,
  store
})

import 'styles/bootstrap'
import 'styles/app'
import Vue from 'vue'

import 'plugins'

import store, {dispatch, getters} from 'store'
import router from 'router'
import App from 'views/App'

import utils, {on, throttle} from 'utils'

import PageTitle from 'components/PageTitle'
import Pager from 'components/Pager'
import InputSearch from 'components/InputSearch'
import Calendar from 'components/Calendar'
import Dropdown from 'components/Dropdown'

Object.defineProperty(Vue.prototype, '$util', {
  value: utils,
  readable: true,
  writable: __DEV__
})

Vue.component('PageTitle', PageTitle)
Vue.component('Pager', Pager)
Vue.component('InputSearch', InputSearch)
Vue.component('Calendar', Calendar)
Vue.component('Dropdown', Dropdown)

if (module.hot) module.hot.accept()

// eslint-disable-next-line no-new
new Vue({
  ...App,
  el: '#app',
  router,
  store
})

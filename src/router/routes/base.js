import {MEMBER, STAFFS} from 'utils'

export default [{
  path: '/',
  name: 'home',
  component: () => import('views/Home'),
  meta: {
    bg: true
  }
}, {
  path: '/edit',
  name: 'edit',
  component: () => import('views/Home/Edit'),
  meta: {
    bg: true
  }
}, {
  path: '/404',
  name: '404',
  component: () => import('components/Widgets/NotFound')
}]

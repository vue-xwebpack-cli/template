import {mock, Random} from 'mockjs'

mock(/\/get-home-data$/, () => {
  return mock({
    title: '@cname(4, 5)',
    username: '@cname(4, 5)'
  })
})

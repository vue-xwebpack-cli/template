const inBrowser = typeof window !== 'undefined'
export const UA = inBrowser && window.navigator.userAgent.toLowerCase()
export const isIE = UA && /msie|trident/.test(UA)
export const isIE9 = UA && UA.indexOf('msie 9.0') > 0
export const isEdge = UA && UA.indexOf('edge/') > 0
export const isAndroid = UA && UA.indexOf('android') > 0
export const isIOS = UA && /iphone|ipad|ipod|ios/.test(UA)
export const isChrome = UA && /chrome\/\d+/.test(UA) && !isEdge
export const DATE_FORMAT = 'YYYY-MM-DD'
export const DATE_FORMAT2 = 'YYYY.MM.DD'
const firstToSixth = ['一', '二', '三', '四', '五', '六']

export const weekdays = ['日', ...firstToSixth].map(value => '周' + value)

export const months = [...firstToSixth, '七', '八', '九', '十', '十一', '十二'].map(val => val + '月')

const [first, ...rest] = weekdays
export const isoWeekdays = [...rest, first]

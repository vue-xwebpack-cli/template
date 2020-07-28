import {isArray, isFunction} from './base'
import {isLength} from './number'
import {isObjectLike} from './object'

export const isArrayLike = value => value != null && isLength(value.length) && !isFunction(value)

export const isArrayLikeObject = value => isArrayLike(value) && isObjectLike(value)

export const isEmptyArr = value => isArray(value) && !value.length

export const nonEmptyArr = value => isArray(value) && !!value.length

export const emptyArr = length => new Array(length).fill(undefined)

export const remove = (arr, item) => {
  if (!arr.length) return
  const index = isFunction(item) ? arr.findIndex(item) : arr.indexOf(item)
  if (index > -1) return arr.splice(index, 1)[0]
}

export const uniq = arr => Array.from(new Set(arr))

export const isAllUnique = (arr, key) => uniq(key == null ? arr : arr.map(item => item[key])).length === arr.length

export const expandArr = (items: Array) => {
  const arr = []
  items.forEach(item => arr.push(...isArray(item) ? expandArr(item) : [item]))
  return arr
}

export const groupArr = (arr, groupByName) => {
  if (!arr || !arr.length) return []
  let lastGroupVal = arr[0] && arr[0][groupByName]
  return arr.reduce((prev, next) => {
    if (lastGroupVal === next[groupByName]) prev[prev.length - 1].value.push(next)
    else {
      prev.push({
        key: lastGroupVal = next[groupByName],
        value: [next]
      })
    }
    return prev
  }, [{
    key: lastGroupVal,
    value: []
  }])
}

export const sortBy = (arr, type, asc) => {
  if (!arr || !arr.length) return []
  return arr.sort(function (num1, num2) {
    const result = !type ? num1 - num2 : num1[type] - num2[type]
    return asc ? result : -result
  })
}

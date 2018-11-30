import $ from 'jquery'
import storage from 'good-storage'
export function getPosition (node) {
  if (node === undefined) {
    //获取滚动条的y值
    let y = window.scrollY
    //获取浏览器的视口高度
    let clientHeight = window.innerHeight
    window.onscroll = null//如果新的页面没有loading按钮，将window对象上的onscroll方法置为null
    return {top: y + clientHeight + 100, left: 0}
  } else {
    let parent = node.offsetParent
    let top = node.offsetTop
    let left = node.offsetLeft
    while(parent !== document.body) {
      node = parent
      parent = parent.offsetParent
      top = top + node.offsetTop
      left = left + node.offsetLeft
    }
    return {top: top, left: left}
  }
}

export function getCookie (name) {
  let cookies = document.cookie
  let items = cookies.split(';')
  for (let i = 0; i < items.length; i++) {
    if ($.trim(items[i]).indexOf(name) >= 0) {
      return items[i].split('=')[1]
    }
  }
}

export function setCookie (name, value) {
  document.cookie=name + '=' + value + ';' + 'path=/'
}

export function deleteCookie (name) {
  document.cookie = `${name}=;expires=` + new Date(0).toUTCString() + ';path=/'
}

export function getStorage (name) {
  return storage.session.get(name, {})
}
export function setStorage (name, value) {
  storage.session.set(name, value)
}
export function deleteOne (item, list, name) {
  let lists = list.slice()
  let index = findIndex(item, list, name)
  for (let i = index; i < lists.length; i++) {
    lists[i] = lists[i + 1]
  }
   lists.pop()
  return lists
}
export function addOne (item, list, name) {
}

function findIndex (item, list, name) {
  let lists = list.slice()
  let index = lists.findIndex((li) => {
    return li[name] === item[name]
  })
  return index
}







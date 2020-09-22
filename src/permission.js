import router from './router'
import Cookies from 'js-cookie'

const whiteList = ['/login']

router.beforeEach(async (to, from, next) => {
  document.title = to.meta.title
  const hasToken = Cookies.get('token')
  if (hasToken) {
    if (to.path === '/login') {
      next({ path: '/' })
    } else {
      next()
    }
  } else {
    if (whiteList.indexOf(to.path) !== -1) {
      next()
    } else {
      next('/login')
    }
  }
})

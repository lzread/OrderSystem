import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)
export default new Router({
  routes: [
    {
      path: '/login',
      component: () => import('@/views/login/index'),
      name: 'login',
      meta: {
        title: '登录',
      }
    },
    {
      path: '/404',
      component: () => import('@/views/error/404'),
      name: '404',
      meta: {
        title: '404',
      }
    },
    {
      path: '/',
      component: () => import('@/views/home/index'),
      name: 'index',
      meta: {
        title: '首页',
      }
    },
    {
      path: '/dishes',
      component: () => import('@/views/dishes/index'),
      name: 'dishes',
      meta: {
        title: '菜品管理',
      },
      children: [
        {
          path: '/dishes/list',
          name: 'dishes-list',
          component: () => import('@/views/dishes/list/index'),
          meta: {
            title: '菜品列表',
          },
        },
        {
          path: '/dishes/create',
          name: 'dishes-create',
          component: () => import('@/views/dishes/create/index'),
          meta: {
            title: '新建菜品',
          },
        },
      ]
    },
    {
      path: '/category',
      component: () => import('@/views/category/index'),
      name: 'category',
      meta: {
        title: '分类管理',
      }
    },
    {
      path: '/time',
      component: () => import('@/views/time/index'),
      name: 'time',
      meta: {
        title: '时段管理',
      }
    },
    {
      path: '/seat',
      component: () => import('@/views/seat/index'),
      name: 'seat',
      meta: {
        title: '桌号管理',
      }
    },
    {
      path: '/order',
      component: () => import('@/views/order/index'),
      name: 'order',
      meta: {
        title: '订单管理',
      }
    },
    {
      path: '/mealOrder',
      component: () => import('@/views/mealOrder/index'),
      name: 'mealOrder',
      meta: {
        title: '点菜宝',
      }
    },
    {
      path: '/mealOrder/choose',
      component: () => import('@/views/mealOrder/choose'),
      name: 'mealOrderChoose',
      meta: {
        title: '开始点菜',
      }
    },
    {
      path: '/mealOrder/complete',
      component: () => import('@/views/mealOrder/complete'),
      name: 'mealOrderComplete',
      meta: {
        title: '点菜完成',
      }
    },
    {
      path: '/mealOrder/pay',
      component: () => import('@/views/mealOrder/pay'),
      name: 'mealOrderPay',
      meta: {
        title: '扫码支付',
      }
    },
  ]
})


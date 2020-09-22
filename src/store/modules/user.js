import { login } from '@/api/user'
import Cookies from 'js-cookie'

const state = {
  id: Cookies.get('id'),
  token: Cookies.get('token'),
}

const mutations = {
  SET_ID: (state, id) => {
    state.id = id
  },
  SET_TOKEN: (state, token) => {
    state.token = token
  },
}

const actions = {

  // 用户登录
  login({ commit }, userInfo) {
    const { username, password } = userInfo
    return new Promise((resolve, reject) => {
      login({ username: username.trim(), password: password }).then(response => {

        const { data } = response

        commit('SET_ID', data.id)
        commit('SET_TOKEN', data.token)

        Cookies.set('token', data.token)
        Cookies.set('id', data.id)

        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },


  // 用户退出登录
  logout({ commit }) {
    return new Promise((resolve) => {
      commit('SET_TOKEN', '')
      Cookies.remove('token')
      Cookies.remove('id')
      resolve()
    })
  },


}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

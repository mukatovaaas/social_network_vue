import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: null,
    isNewUser: true
  },
  mutations: {
    SET_USER_DATA (state, userData) {
      localStorage.setItem('user', JSON.stringify(userData))
      axios.defaults.headers.common['Authorization'] = `JWT ${
        userData.token
      }`
      state.user = userData
    },
    LOGOUT () {
      localStorage.removeItem('user')
      location.reload()
    },
    IS_NEW_USER (state, isNewUser) {
      state.isNewUser = isNewUser
    }
  },
  actions: {
    register ({ commit }, credentials) {
      console.log(credentials)
      return axios
        .post('http:///localhost:8000/api/users/', credentials)
        .then(({ data }) => {
          commit('SET_USER_DATA', data)
          console.log(data)
          
        })
    },
    login ({ commit }, credentials) {
      // console.log(credentials)
      return axios
        .post('http://localhost:8000/api/jwt/create/', credentials)
        .then(({ data }) => {
          commit('SET_USER_DATA', data['access'])
        })
    },
    logout ({ commit }) {
      commit('LOGOUT')
    },
    isNewUser ({ commit }, isNewUser) {
      commit('IS_NEW_USER', isNewUser)
    }
  }
})

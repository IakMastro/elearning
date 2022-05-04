import router from "@/router"
import { user_service } from "@/services/user.service"

const user = JSON.parse(localStorage.getItem('user'))
const state = user ? { status: { loggedIn: true }, user: user } : { status: { loggedIn: false }, user: null }

const actions = {
  login({ dispatch, commit }, { id, password }) {
    commit('loginRequest', { id })

    user_service.login(id, password)
      .then(
        query => {
          if (query.data.user_role !== undefined) {
            console.log(query.data);
            commit('loginSuccess', { id: id, role: query.data.user_role })
            dispatch('alert/success', "Logged in successfully!", { root: true })
            localStorage.setItem('user', id)
            router.push('/')
          }

          if (query.data.error !== undefined) {
            commit('loginFailure')
            dispatch('alert/error', query.data.error, { root: true })
          }
        },
        error => {
          commit('loginFailure')
          dispatch('alert/error', error, { root: true })
        }
      )
  },
  logout({ commit }) {
    user_service.logout()
    commit('logout')
  },
  register({ dispatch, commit }, user) {
    commit('registerRequest', user)

    user_service.register(user)
  },
  getData({ commit }, id) {
    user_service.getById(id)
      .then(
        query => {
          console.log(query)
        }
      )
  }
}

const mutations = {
  loginRequest(state, user) {
    state.status = { loggedIn: true }
    state.user = user
  },
  loginSuccess(state, user) {
    state.status = { loggedIn: true }
    state.user = user
  },
  loginFailure(state) {
    state.status = { loggedIn: false }
    state.user = null
  },
  logout(state) {
    state.status = { loggedIn: false }
    state.user = null
  },
  registerRequest(state) {
    state.status = { registering: true }
  },
  registerSuccess(state) {
    state.status = { loggedIn: false }
  },
  registerFailure(state) {
    state.status = { loggedIn: false }
  }
}

export const account = {
  namespaced: true,
  state,
  actions,
  mutations
}
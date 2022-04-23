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
          commit('loginSuccess', { id: id, role: query.user_role })
          router.push('/')
          localStorage.setItem('user', id)
          dispatch('alert/success', "Logged in successfully!", { root: true })
        },
        error => {
          commit('loginFailure', error)
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
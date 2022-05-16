import router from "@/router"
import { user_service } from "@/services/user.service"

const user = JSON.parse(localStorage.getItem('user'))
const grades = JSON.parse(localStorage.getItem('grades'))
const statistics = JSON.parse(localStorage.getItem('statistics'))
const state = user ? { status: { loggedIn: true }, user: user, grades: grades, statistics: statistics } : { status: { loggedIn: false }, user: null, grades: null, statistics: null }

const actions = {
  login({ dispatch, commit }, { id, password }) {
    commit('loginRequest', { id })

    user_service.login(id, password)
      .then(
        query => {
          if (query.data.user_role !== undefined) {
            commit('loginSuccess', { id: id })
            dispatch('alert/success', "Logged in successfully!", { root: true })
            localStorage.setItem('user', JSON.stringify({ id: id }))
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
          localStorage.setItem('user', JSON.stringify(query.data))
          commit('getDataSuccess', query.data)
        }
      )
  },
  getGrades({ commit }) {
    user_service.getGrades(user.id)
      .then(
        query => {
          localStorage.setItem('grades', JSON.stringify(query.data))
          commit('getGradesSuccess', query.data)
        }
      )
  },
  getStatistics({ commit }) {
    user_service.getStatistics(user.id, grades)
      .then(
        query => {
          localStorage.setItem('statistics', JSON.stringify(query.data))
          commit('getStatisticsSuccess', query.data)
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
  getDataSuccess(state, user) {
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
  },
  getGradesSuccess(state, grades) {
    state.grades = grades
  },
  getStatisticsSuccess(state, statistics) {
    state.statistics = statistics
  }
}

export const account = {
  namespaced: true,
  state,
  actions,
  mutations
}
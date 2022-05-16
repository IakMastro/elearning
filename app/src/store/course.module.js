import { course_service } from "@/services/course.service"

const courses = JSON.parse(localStorage.getItem('courses'))
const state = courses ? { courses: courses } : { courses: null }

const actions = {
  async getAll({ commit }) {
    let courses = await course_service.getAll()
    commit('getAllSuccess', courses.data)
    localStorage.setItem('courses', JSON.stringify(courses.data))
  },
  getById({ commit }, id) {
    course_service.getById(id)
      .then(
        query => {
          commit('getByIdSuccess', query.data)
        }
      )
  },
  create({ dispatch, commit }, course) {
    course_service.create(course)
      .then(
        query => {
          commit('createSuccess', query.data)
          dispatch('alert/success', "Course created successfully!", { root: true })
        },
        error => {
          commit('createFailure')
          dispatch('alert/error', error, { root: true })
        }
      )
  },
  update({ dispatch ,commit }, course) {
    course_service.update(course)
      .then(
        query => {
          commit('updateSuccess', query.data)
          dispatch('alert/success', "Course created successfully!", { root: true })
        },
      )
  }
}

const mutations = {
  getAllSuccess(state, courses) {
    state.courses = courses
  },
  getByIdSuccess(state, course) {
    state.course = course
  },
  createSuccess(state, course) {
    state.push(course)
  },
  updateSuccess(state, course) {
    state.splice(state.findIndex(c => c.id === course.id), 1, course)
  }
}

export const course = {
  namespaced: true,
  state,
  actions,
  mutations
}
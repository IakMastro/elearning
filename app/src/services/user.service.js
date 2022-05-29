import axios from 'axios'

const api_url = "http://localhost:5000/users"

export const user_service = {
  login,
  logout,
  register,
  getById,
  update,
  addGrade,
  getGrades,
  getStatistics
}

async function login(id, password) {
  return await axios.post(`${api_url}/${id}`, { password: password })
}

function logout() {
  localStorage.clear()
}

async function register(user) {
  return await axios.post(`${api_url}/create`, { user: user })
}

async function getById(id) {
  return await axios.get(`${api_url}/${id}`)
}

async function update(user) {
  return await axios.put(`${api_url}/${id}`, { updated_user: user })
}

async function addGrade(id, grade, test_id, course) {
  return await axios.post(`${api_url}/${id}/grades/add`, { grade: grade, course: course, id: test_id })
}

async function getGrades(id) {
  return await axios.get(`${api_url}/${id}/grades`)
}

async function getStatistics(id, tests) {
  return await axios.post(`${api_url}/${id}/grades/statistics`, tests)
}
import axios from 'axios'

const api_url = "http://localhost:5000/users"

export const user_service = {
  login,
  logout,
  register,
  getById,
  update
}

async function login(id, password) {
  return await axios.post(`${api_url}/${id}`, { password: password })
}

function logout() {
  localStorage.removeItem('user')
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
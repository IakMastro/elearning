import axios from 'axios'

const api_url = "http://localhost:5000/"

export const user_service = {
  login,
  logout,
  register,
  getById,
  update
}

async function login(id, password) {
  return await axios.post(`${api_url}users/${id}`, { password: password })
}

function logout() {
  localStorage.removeItem('user')
}

// TODO: create endpoint to the API
async function register(user) { 
  axios.post(`${api_url}/create`, { user: user })
}

async function getById(id) {
  let res = await axios.get(`${api_url}/${id}`)
  return res
}

async function update(user) {
  axios.put(`${api_url}/${id}`, { updated_user: user })
    .then(query => {
      // TODO: Create endpoint
    })
}
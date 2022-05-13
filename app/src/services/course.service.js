import axios from 'axios'
import { user_service } from './user.service'

const api_url = "http://localhost:5000/courses"

export const course_service = {
  getAll,
  getById,
  create,
  update
}

async function getAll() {
  let courses = await axios.get(`${api_url}`)
  courses.data.forEach(async course => {
    let user = await user_service.getById(course.tutor_id)
    course.tutor = `${user.data.name} ${user.data.surname}`
  })
  return courses
}

async function getById() {
  return await axios.get(`${api_url}/${id}`)
}

async function create(course) {
  return await axios.post(`${api_url}/create`, { course: course })
}

async function update(course) {
  return await axios.put(`${api_url}/${id}`, { updated_course: course })
}

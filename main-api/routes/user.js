import express from 'express'
import users from './models/users.js'
import axios from 'axios'

const user_router = express.Router()
const user_api_url = "http://users:8080"

// Get user
user_router.get('/:id', async (req, res) => {
  axios.get(`${user_api_url}/users/${req.params.id}`)
    .then((response) => {
      const user = response.data

      if (user === null) {
        res.status(404).send({ error: "User not found." })
      } else if (user.is_deleted) {
        res.status(204).send({ error: "User was deleted." })
      }

      res.status(200).send(user)
    })
    .catch((error) => {
      res.status(error.response.status).send(error.response.data)
    })
})

// Login user
user_router.post('/:id', async (req, res) => {
  users.findById(req.params.id, (err, user) => {
    if (user === null) {
      res.status(404).send({ error: "User not found with this ID" })
    } else if (user.password == req.body.password) {
      res.status(200).send({ user_role: user.role })
    } else {
      res.status(400).send({ error: "Passwords do not match" })
    }
  })
})

// Disable user
user_router.put('/:id', async (req, res) => {
  axios.put(`${user_api_url}/users/${req.params.id}`)
  res.send(202)
})

user_router.post('/create', async (req, res) => {
  let new_user = req.body.user

  let sql_user = {
    name: new_user.name,
    surname: new_user.surname,
    is_tutor: new_user.is_tutor,
    university: new_user.university
  }

  let resp = await axios.post(`${user_api_url}/users`, sql_user)

  let mongo_user = new users({
    _id: resp.id,
    password: new_user.password
  })

  await mongo_user.save()

  res.send(201)
})

user_router.post('/update', async (req, res) => {
  let updated_user = req.body.user

  axios.post(`${user_api_url}/users/${updated_user.id}`, updated_user)
    .then((response) => {
      res.send(response.status)
    })
    .catch((error) => {
      res.status(400).send({ error: error })
    })
})

user_router.get("/:id/grades", async (req, res) => {
  axios.get(`${user_api_url}/grades/${req.params.id}`)
    .then((response) => {
      res.status(response.status).send(response.data)
    })
    .catch((error) => {
      res.status(400).send({ error: error })
    })
})

user_router.post('/:id/grades/add', async (req, res) => {
  let test = req.body

  axios.post(`${user_api_url}/grades`, {
    grade: test.grade,
    test_id: test.id,
    student_id: parseInt(req.params.id),
    course_id: parseInt(test.course),
    user_id: req.params.id
  }).then((response) => {
    res.send(response.status)
  }).catch((error) => {
    res.status(400).send({ error: error })
  })
})

user_router.post('/:id/grades/statistics', async (req, res) => {
  axios.get(`${user_api_url}/grades/${req.params.id}`)
    .then(async (response) => {
      const tests = response.data
      let grade_array = []

      // Get grades from tests
      for (let i = 0; i < tests.length; i++) {
        grade_array.push(tests[i].grade)
      }

      const statistics = await axios.post('http://statistics:5000/', { 'grades': grade_array })
      res.status(200).send(statistics.data)
    })
    .catch((error) => {
      res.status(400).send({ error: error })
    })
})

export default user_router

import express from 'express'
import users from './models/users.js'

const user_router = express.Router()

// Get user
user_router.get('/:id', async (req, res) => {
  users.findById(req.params.id, 'role', async (err, user) => {
    let sql_data = await axios.get(`http://usersapi:8080/{user.role}s/{user.id}`)

    console.log(sql_data);
    let sent_back = {
      name: sql_data.name,
      surname: sql_data.surname,
      role: user.role
    }

    if (user.role === 'student') {
      sent_back.semester = sql_data.semester
    }

    res.send(sent_back)
  })
})

// Login user
user_router.post('/:id', async (req, res) => {
  users.findById(req.params.id, (err, user) => {
    if (user === null) {
      res.send({ error: "User not found with this ID" })
    } else if (user.password == req.body.password) {
      res.send({ user_role: user.role })
    } else {
      res.send({ error: "Passwords do not match" })
    }
  })
})

user_router.post('/create', async (req, res) => {
  let new_user = req.body.user

  let sql_user = {
    name: new_user.name,
    surname: new_user.surname
  }

  let resp = await axios.post(`http://usersapi:8080/${user.role}s`, sql_user)
  let id = new_user.role == "student" ? resp.data.student_id : resp.data.professor_id

  let mongo_user = new users({
    _id: id,
    password: new_user.password,
    role: new_user.role
  })

  await mongo_user.save()

  res.send(200)
})

export default user_router

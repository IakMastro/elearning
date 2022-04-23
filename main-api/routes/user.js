import express from 'express'
import users from './models/users.js'

const user_router = express.Router()

// Get user
user_router.get('/:id', async (req, res) => {
  users.findById(req.params.id, 'role', (err, user) => {
    // TODO: Get extra data from PHP API, see role and hit either /students or /professors
    res.send(user)
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

  // TODO: Add first to SQL db, get id and add it here
  let mongo_user = new users({
    // _id: sql_data.id,
    _id: 10,
    password: new_user.password,
    role: new_user.role
  })

  await mongo_user.save()

  res.send(200)
})

export default user_router

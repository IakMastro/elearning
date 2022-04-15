import express from 'express'
import users from './models/users.js'

const user_router = express.Router()

user_router.get('/', async(req, res) => {
  res.send("Hello World!")
})

export default user_router
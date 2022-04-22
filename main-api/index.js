import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import file_upload from 'express-fileupload'
import user_router from './routes/user.js'
import courses_router from './routes/course.js'

mongoose
  .connect("mongodb://dbuser:dbpass@mongo:27017/elearning?authSource=admin", {
    useNewUrlParser: true,
  })
  .then(() => {
    const app = express()
    app.use(express.json())
    app.use(file_upload())
    app.use(cors())
    app.use('/users', user_router)
    app.use('/courses', courses_router)

    app.listen(5000, "0.0.0.0", () => { console.log("Main API server launched successfully!") })
  })

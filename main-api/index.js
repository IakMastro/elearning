import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import router from './routes/user.js'

mongoose
  .connect("mongodb://dbuser:dbpass@mongo:27017/elearning?authSource=admin", {
    useNewUrlParser: true,
  })
  .then(() => {
    const app = express()
    app.use(express.json())
    app.use(cors())
    app.use('/users', router)

    app.listen(5000, "0.0.0.0", () => { console.log("Main API server launched successfully!") })
  })
import mongoose from 'mongoose'

const schema = mongoose.Schema({
  _id: String,
  password: String,
  role: String
})

export default mongoose.model('Users', schema)

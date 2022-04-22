import mongoose from 'mongoose'

const schema = mongoose.Schema({
  _id: String,
  content: []
})

export default mongoose.model('Courses', schema);

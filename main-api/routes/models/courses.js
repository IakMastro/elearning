import mongoose from 'mongoose'

const schema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  content: []
})

export default mongoose.model('Courses', schema);
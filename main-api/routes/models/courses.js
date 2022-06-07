import mongoose from 'mongoose'

const schema = mongoose.Schema({
  _id: String,
  chapters: [{
    files: [String],
    test: [Object],
    grade_weight: Number
  }],
  test: [Object]
})

export default mongoose.model('Courses', schema);

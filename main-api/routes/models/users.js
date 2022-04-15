import mongoose from 'mongoose'

const schema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  password: String,
  role: String,
});

export default mongoose.model('Users', schema);
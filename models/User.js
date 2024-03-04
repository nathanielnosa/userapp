const mongoose = require('mongoose')

const Schema = mongoose.Schema

const userSchema = new Schema({
  username: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  isAdmin: {
    type: Boolean,
    default: false
  },
  image: {
    type: String,
  },
  password: {
    type: String,
    required: true
  },
}, { timestamps: true })

const userModel = mongoose.model('User', userSchema)
module.exports = userModel
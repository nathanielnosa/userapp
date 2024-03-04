const mongoose = require('mongoose')

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_API)
  } catch (error) {
    console.log(error.message)
  }
}


module.exports = connectDB

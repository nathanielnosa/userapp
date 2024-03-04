require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')

const connectDB = require('./config/dbConfig')


connectDB()
const app = express()
app.use(express.json())

// routers
app.use('/register', require('./routers/register'))
app.use('/login', require('./routers/login'))
app.use('/employee', require('./routers/employee'))


//port
const PORT = process.env.PORT || 5000


mongoose.connection.once('open', () => {
  console.log('DB connection is ok!')
  app.listen(PORT, () => {
    console.log(`server is running on http://localhost:${PORT}`)
  })
})
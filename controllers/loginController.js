const User = require('../models/User')

const CryptoJS = require('crypto-js')

const handleLogin = async (req, res) => {
  const { user, pwd } = req.body
  if (!user || !pwd) return res.status(401).json({ "Message": "Fields cannot be empty" })
  try {
    const foundUser = await User.findOne({ username: user }).exec()
    const match = await CryptoJS.AES.decrypt(foundUser.password, process.env.HASHEDPWD);
    if (match) {
      res.status(200).json({ "Message": "Login Successful" })
    } else {
      res.status(400).json({ "Message": "Username/password not match" })
    }

  } catch (error) {
    res.status(500).json({ "Error": `${error.message}` })
  }
}


module.exports = { handleLogin }
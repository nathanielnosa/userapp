const User = require('../models/User')
const CryptoJS = require('crypto-js')

const handleRegister = async (req, res) => {
  const { user, email, image, pwd } = req.body
  if (!user || !email || !pwd) return res.status(400).json({ "Message": "Fields cannot be empty" })

  try {
    const existUser = await User.findOne({ username: user }).exec()
    const existEmail = await User.findOne({ email: email }).exec()
    if (existUser || existEmail) return res.status(401).json({ "Message": "username/email already taken" })
    const encryptPwd = await CryptoJS.AES.encrypt(pwd, process.env.HASHEDPWD);

    const createUser = await User.create({
      "username": user,
      "email": email,
      "image": image,
      "password": encryptPwd
    })
    const { password, ...others } = createUser._doc
    res.json(others)
    res.status(200).json({ "Success": `User ${others.username} was created` })

  } catch (error) {
    res.status(500).json({ "Message": `${error.message}` })
  }
}

module.exports = { handleRegister }
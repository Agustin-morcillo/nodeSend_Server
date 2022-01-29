const bcrypt = require("bcryptjs")
const { validationResult } = require("express-validator")
const jwt = require("jsonwebtoken")

const User = require("../models/User")

const usersController = {
  register: async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).send({ errors: errors.array() })
    }

    const { name, email, password } = req.body

    try {
      const user = new User({
        name,
        email,
        password: bcrypt.hashSync(password, 10),
      })
      await user.save()

      return res.send({ msg: "Usuario creado exitosamente" })
    } catch (error) {
      console.error(error)
      return res.status(500).send("Hubo un error")
    }
  },
  login: async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).send({ errors: errors.array() })
    }

    try {
      const user = await User.findOne({ email: req.body.email })

      const token = jwt.sign({ user: user._id }, process.env.SECRET, {
        expiresIn: 3600,
      })

      res.send({ msg: "Login exitoso", token })
    } catch (error) {
      console.error(error)
      return res.status(500).send("Hubo un error")
    }
  },
}
module.exports = usersController

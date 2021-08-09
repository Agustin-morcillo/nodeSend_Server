const bcrypt = require("bcryptjs")
const { validationResult } = require("express-validator")

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

      return res.send("Usuario creado exitosamente")
    } catch (error) {
      console.error(error)
      return res.status(500).send("Hubo un error")
    }
  },
}
module.exports = usersController

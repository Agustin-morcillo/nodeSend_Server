const { body } = require("express-validator")
const bcrypt = require("bcryptjs")
const User = require("../models/User")

const validator = {
  register: [
    body("name").notEmpty().withMessage("Debes ingresar un nombre"),
    body("email")
      .notEmpty()
      .withMessage("Debes ingresar un email")
      .bail()
      .isEmail()
      .withMessage("El email ingresado debe ser válido")
      .bail()
      .custom(async function (value) {
        const user = await User.findOne({ email: value })
        if (user) {
          return Promise.reject("El email ingresado ya se encuentra en uso")
        }
      }),
    body("password")
      .notEmpty()
      .withMessage("Debes ingresar un password")
      .bail()
      .isLength({ min: 6 })
      .withMessage("El password debe tener al menos 6 caracteres"),
  ],
  login: [
    body("email")
      .notEmpty()
      .withMessage("Debes ingresar un email")
      .bail()
      .isEmail()
      .withMessage("El email ingresado debe ser válido"),
    body("password")
      .notEmpty()
      .withMessage("Debes ingresar un password")
      .bail()
      .custom(async function (value, { req }) {
        const user = await User.findOne({ email: req.body.email })
        if (!user || !bcrypt.compareSync(value, user.password)) {
          return Promise.reject("Email o contraseña inválidos")
        }
      }),
  ],
}

module.exports = validator

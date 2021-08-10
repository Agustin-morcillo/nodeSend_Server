const express = require("express")
const router = express.Router()

const usersController = require("../controllers/usersController")
const validator = require("../middlewares/validator")
const auth = require("../middlewares/auth")

router.post("/register", validator.register, usersController.register)
router.post("/login", validator.login, usersController.login)

module.exports = router

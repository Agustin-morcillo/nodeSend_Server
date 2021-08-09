const express = require("express")
const router = express.Router()

const usersController = require("../controllers/usersController")
const validator = require("../middlewares/validator")

router.post("/register", validator.register, usersController.register)

module.exports = router

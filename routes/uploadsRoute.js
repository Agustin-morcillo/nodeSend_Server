const express = require("express")
const router = express.Router()

const uploadsController = require("../controllers/uploadsController")
const auth = require("../middlewares/auth")

router.post("/", auth, uploadsController.upload)

module.exports = router

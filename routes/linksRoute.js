const express = require("express")
const router = express.Router()

const linksController = require("../controllers/linksController")
const validator = require("../middlewares/validator")
const auth = require("../middlewares/auth")

router.post(
  "/unregistered",
  validator.newLink,
  linksController.newUnregisteredLink
)

router.post(
  "/registered",
  validator.newLink,
  auth,
  linksController.newRegisteredLink
)

router.get("/:url", linksController.getLink)

module.exports = router

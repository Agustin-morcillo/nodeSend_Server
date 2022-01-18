const Link = require("../models/Link")
const { nanoid } = require("nanoid")
const { validationResult } = require("express-validator")

const linksController = {
  newUnregisteredLink: async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).send({ errors: errors.array() })
    }

    const { fileOriginalName, password } = req.body

    try {
      const link = new Link({
        url: nanoid(),
        fileName: nanoid(),
        fileOriginalName,
        password,
      })
      await link.save()

      return res.send({
        msg: "Link creado exitosamente",
        link,
      })
    } catch (error) {
      console.error(error)
      return res.status(500).send("Hubo un error")
    }
  },
  newRegisteredLink: async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).send({ errors: errors.array() })
    }

    const { fileOriginalName, password, downloads } = req.body

    try {
      const link = new Link({
        url: nanoid(),
        fileName: nanoid(),
        fileOriginalName,
        downloads: downloads,
        author: req.user,
        password: password,
      })
      await link.save()

      return res.send({
        msg: "Link creado exitosamente",
        link,
      })
    } catch (error) {
      console.error(error)
      return res.status(500).send("Hubo un error")
    }
  },
  getLink: async (req, res) => {
    const { url } = req.params
    const link = await Link.findOne({ url })

    if (!link) {
      return res.status(404).send({ msg: "URL inválida" })
    }

    return res.send({ file: link.fileName })
  },
}

module.exports = linksController

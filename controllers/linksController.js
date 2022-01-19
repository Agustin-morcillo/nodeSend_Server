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
  getLink: async (req, res, next) => {
    const { fileURL } = req.params
    const link = await Link.findOne({ url: fileURL })

    if (!link) {
      return res.status(404).send({ msg: "URL inexistente" })
    }

    const { downloads, fileName } = link

    res.send({ file: fileName })

    if (downloads === 1) {
      req.file = fileName

      try {
        await Link.findOneAndRemove(fileURL)
      } catch (error) {
        console.error(error)
      }
      
      next()
    } else {
      try {
        link.downloads--
        await link.save()
      } catch (error) {
        console.error(error)
      }
    }
  },
}

module.exports = linksController

const multer = require("multer")
const fs = require("fs")

const uploadsController = {
  upload: async (req, res) => {
    const storage = multer.diskStorage({
      destination: function (req, file, cb) {
        cb(null, __dirname + "/../uploads")
      },
      filename: function (req, file, cb) {
        cb(null, Date.now() + "-" + file.originalname)
      },
    })

    const upload = multer({
      storage: storage,
      limits: { fileSize: req.user ? 1024 * 1024 * 15 : 1024 * 1024 },
    }).single("file")

    upload(req, res, async (error) => {
      if (error) {
        console.error(error)
        return res.send(error)
      }
      return res.send(req.file)
    })
  },
  delete: async (req, res) => {
    try {
      fs.unlinkSync(__dirname + `/../uploads/${req.file}`)
    } catch (error) {
      console.error(error)
    }
  },
}

module.exports = uploadsController

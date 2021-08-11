const mongoose = require("mongoose")

const LinksSchema = mongoose.Schema({
  fileOriginalName: {
    type: String,
    require: true,
    trim: true,
  },
  url: {
    type: String,
    require: true,
    trim: true,
  },
  fileName: {
    type: String,
    require: true,
    trim: true,
  },
  password: {
    type: String,
    default: null,
  },
  downloads: {
    type: Number,
    default: 1,
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    default: null,
  },
  date: {
    type: Date,
    default: Date.now(),
  },
})

module.exports = mongoose.model("Link", LinksSchema)

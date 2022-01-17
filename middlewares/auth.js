const jwt = require("jsonwebtoken")

module.exports = function (req, res, next) {
  const authHeader = req.get("Authorization")

  if (authHeader) {
    const token = authHeader.split(" ")[1]
    try {
      const validation = jwt.verify(token, process.env.SECRET)
      req.user = validation.user
    } catch (error) {
      console.error(error)
      return res.status(401).send("Token no válido")
    }
  }

  return next()
}

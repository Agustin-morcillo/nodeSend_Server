const express = require("express")
const cors = require("cors")

const app = express()

/* Configurations */
require("dotenv").config()
app.use(cors())
app.use(express.json())

/* Server */
const PORT = process.env.PORT || 4000
app.listen(PORT, () => console.log(`Servidor corriendo en el puerto ${PORT}`))

/* DB Conection */
const dbConection = require("./config/db")
dbConection()

/* Required routes */
const apiUsersRouter = require("./routes/usersRoute")

/* Routes */
app.use("/api/users", apiUsersRouter)

app.use("/", function (req, res) {
  return res.send("Back-end de la aplicación")
})

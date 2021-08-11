const express = require("express")
const cors = require("cors")
const dbConection = require("./config/db")

const app = express()

/* Configurations */
require("dotenv").config()
app.use(cors())
app.use(express.json())

/* Server */
const PORT = process.env.PORT || 4000
app.listen(PORT, () => console.log(`Servidor corriendo en el puerto ${PORT}`))

/* DB Conection */
dbConection()

/* Required routes */
const apiUsersRouter = require("./routes/usersRoute")
const apiLinksRouter = require("./routes/linksRoute")

/* Routes */
app.use("/api/users", apiUsersRouter)
app.use("/api/links", apiLinksRouter)

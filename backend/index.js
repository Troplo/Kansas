require("dotenv").config()

const express = require("express")
const app = express()
const PORT = process.env.PORT || 23996
const helmet = require("helmet")
const bodyParser = require("body-parser")

app.use(helmet())
app.use(bodyParser.json({ limit: "500mb" }))
app.use(bodyParser.urlencoded({ extended: false, limit: "500mb" }))

app.use("/api/v1/site", require("./routes/site"))
app.use("/api/v1/auth", require("./routes/auth"))
app.use("/api/v1/user", require("./routes/user"))
app.use("/api/v1/organization", require("./routes/organization"))
app.use("/api/v1/project", require("./routes/project"))

app.use(require("./lib/errorHandler"))
app.set("trust proxy", true)
app.listen(PORT, () => console.log(`Kansas started on port: ${PORT}`))

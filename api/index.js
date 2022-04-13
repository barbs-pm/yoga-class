const express = require("express")
const bodyParser = require("body-parser")
const routes = require("./routes")

const app = express()
const port = 3000 

routes(app)

app.listen(port, () => console.log(`Server is running on ${port}`))

module.exports = app

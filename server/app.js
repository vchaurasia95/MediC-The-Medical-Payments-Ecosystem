const express = require("express")
const cors = require('cors');
const bodyParser = require("body-parser");
const app = express()
const dotenv = require("dotenv");
const console = require("./logger")
const trimRequests = require("trim-request")

require("./handleResponse")
dotenv.config(".env")


app.use(bodyParser.json())
app.use(cors())
app.use(express.json({limit:'50mb'}))
app.use(express.urlencoded({limit:'50mb'}))
app.use("/api", trimRequests.all, require("./routes/index"))

const port = process.env.NODE_SERVER_PORT
const host = process.env.NODE_SERVER_HOST


app.listen(port, host, ()=> {
    console.log(`Listening on http://${host}:${port}`)
})



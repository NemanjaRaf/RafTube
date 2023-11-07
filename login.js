const express = require("express")
const cors = require("cors")
const mongoose = require("mongoose")
const { MONGO_URL, LOGIN_PORT } = require("./config")
const { loginRouter } = require("./routes/LoginRoutes")

const app = express()

mongoose.connect(MONGO_URL, {
    useNewUrlParser: true,
}).then(() => {
    console.log("MongoDB connected")
}).catch((err) => {
    console.log(err)
})

app.use(express.json())
app.use(cors())

app.use("/", loginRouter)

app.listen(LOGIN_PORT, () => {
    console.log("Server running on port " + LOGIN_PORT);
})

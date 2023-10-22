const express = require("express")
const cors = require("cors")
const mongoose = require("mongoose")
const { MONGO_URL } = require("./config")

const { userRouter } = require("./routes/UserRoutes")
const { videoRouter } = require("./routes/VideoRoutes")
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

app.use("/api/user", userRouter)
app.use("/api/video", videoRouter)

app.use(express.static("public"))

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/public/home.html")
})

app.get("/upload", (req, res) => {
    res.sendFile(__dirname + "/public/upload.html")
})

app.get("/video", (req, res) => {
    res.sendFile(__dirname + "/public/video.html")
})

app.get("/channel", (req, res) => {
    res.sendFile(__dirname + "/public/channel.html")
})


app.listen(3000, () => {
    console.log("Server running on port 3000");
})
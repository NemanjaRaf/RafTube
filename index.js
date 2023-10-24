const express = require("express")
const cors = require("cors")
const mongoose = require("mongoose")
const { MONGO_URL } = require("./config")

const { userRouter } = require("./routes/UserRoutes")
const { videoRouter } = require("./routes/VideoRoutes")
const { playlistRouter } = require("./routes/PlaylistRoutes")
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
app.use("/api/playlist", playlistRouter)

app.use(express.static("public/dist"))

app.get("*", (req, res) => {
    res.sendFile(__dirname + "/public/dist/index.html")
})

app.listen(8000, () => {
    console.log("Server running on port 8000");
})
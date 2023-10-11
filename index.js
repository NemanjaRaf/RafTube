const express = require("express")
const app = express()

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
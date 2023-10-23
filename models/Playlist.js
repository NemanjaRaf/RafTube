const mongoose = require("mongoose")

const PlaylistSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        min: 3,
        max: 100,
    },
    description: {
        type: String,
        min: 3,
        max: 100,
    },
    followers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    }],
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    videos: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Videos",
    }],
}, { timestamps: true })

const Playlist = mongoose.model("Playlists", PlaylistSchema)

module.exports = Playlist
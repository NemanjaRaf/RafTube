const mongoose = require("mongoose")

const VideoSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        min: 3,
        max: 100,
        unique: true,
    },
    description: {
        type: String,
        required: true,
        max: 500,
    },
    videoUrl: {
        type: String,
        required: true,
    },
    thumbnailUrl: {
        type: String,
        required: true,
    },
    views: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    }],
    likes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    }],
    dislikes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    }],
    comments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment",
    }],
    channel: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    }
}, { timestamps: true })

const Video = mongoose.model("Videos", VideoSchema)

module.exports = Video
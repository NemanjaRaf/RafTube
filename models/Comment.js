const mongoose = require("mongoose")

const CommentSchema = new mongoose.Schema({
    text: {
        type: String,
        required: true,
        max: 500,
    },
    likes: {
        type: Number,
        required: true,
        default: 0,
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
}, { timestamps: true })

const Comment = mongoose.model("Comments", CommentSchema)

module.exports = Comment
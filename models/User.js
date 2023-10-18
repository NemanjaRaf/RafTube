const mongoose = require("mongoose")

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        min: 3,
        max: 20,
        unique: true,
    },
    type: {
        type: String,
        enum: ["user", "admin", "mod"],
        default: "user",
    },
    email: {
        type: String,
        required: true,
        max: 50,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        min: 6,
    },
    subscribers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    }],
}, { timestamps: true })

const User = mongoose.model("User", UserSchema)

module.exports = User
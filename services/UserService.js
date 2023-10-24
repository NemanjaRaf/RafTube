const bcrypt = require("bcrypt")
const User = require("../models/User")
const jwt = require("jsonwebtoken")
const { JWT_SECRET, JWT_EXPIRY } = require("../config")

const UserService = new Object()

UserService.createUser = async (data) => {
    const password = await bcrypt.hash(data.password, 10)
    const user = new User({
        username: data.username,
        email: data.email,
        password: password,
    })
    return await user.save()
}

UserService.getUser = async (id) => {
    const user = await User.findById(id).populate("subscribers")

    if (!user) {
        throw new Error("User not found")
    }
    return user
}

UserService.updateUser = async (id, data) => {
    if (data.password) {
        data.password = await bcrypt.hash(data.password, 10)
    }
    const user = await User.findByIdAndUpdate(id, { $set: data }, { new: true, runValidators: true });

    if (!user) {
        throw new Error("User not found")
    }

    return user
}

UserService.deleteUser = async (id) => {
    await User.findByIdAndDelete(id)

    return true
}

UserService.listUsers = async (query) => {
    const users = await User.find({})
    return users
}

UserService.login = async (data) => {
    const user = await User.findOne({ email: data.email })

    if (!user) {
        throw new Error("User not found")
    }

    const validPass = await bcrypt.compare(data.password, user.password)
    if (!validPass) {
        throw new Error("Invalid password")
    }

    const token = jwt.sign({ _id: user._id, role: user.type }, JWT_SECRET, {
        expiresIn: 86400,
    })

    return { token: token, user: user }
}

UserService.subscribeTo = async (to, from) => {
    const user = await User.findById(to)

    if (!user) {
        throw new Error("User not found")
    }

    if (!user.subscribers.includes(from)) {
        user.subscribers.push(from)
        await user.save()
        return true
    }
    return false
}

UserService.unsubscribeFrom = async (to, from) => {
    const user = await User.findById(to)

    if (!user) {
        throw new Error("User not found")
    }

    if (user.subscribers.includes(from)) {
        user.subscribers.pull(from)
        await user.save()
        return true
    }
    return false
}

UserService.listSubscibers = async (id) => {
    const user = await User.findById(id).populate("subscribers")

    if (!user) {
        throw new Error("User not found")
    }

    return user.subscribers
}

UserService.listSubscriptions = async (id) => {
    const users = await User.find({ subscribers: id })
    return users
}

module.exports = UserService

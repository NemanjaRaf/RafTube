const express = require("express")
const UserService = require("../services/UserService")
const validate = require("../middlewares/ValidateMiddleware")
const UserValidation = require("../validations/UserValidation")

const {Authenticate, checkAccess } = require("../middlewares/Authenticate")

const userRouter = express.Router()

userRouter.post("/create", validate(UserValidation.createUser), async (req, res) => {
    UserService.createUser(req.body).then((user) => {
        res.status(200).json({ success: true, data: user })
    })
    .catch((err) => {
        res.status(500).json({ success: false, message: err.message })
    })
})

userRouter.get("/list", async (req, res) => {
    UserService.listUsers().then((users) => {
        res.status(200).json({ success: true, data: users })
    }).catch((err) => {
        res.status(500).json({ success: false, message: err.message })
    })
})

userRouter.get("/:id", async (req, res) => {
    UserService.getUser(req.params.id).then((user) => {
        res.status(200).json({ success: true, data: user })
    })
    .catch((err) => {
        res.status(500).json({ success: false, message: err.message })
    })
})

userRouter.put("/:id", Authenticate, checkAccess, validate(UserValidation.updateUser), async (req, res) => {
    UserService.updateUser(req.params.id, req.body).then((user) => {
        res.status(200).json({ success: true, data: user })
    })
    .catch((err) => {
        res.status(500).json({ success: false, message: err.message })
    })
})

userRouter.delete("/:id", Authenticate, checkAccess, async (req, res) => {
    UserService.deleteUser(req.params.id).then((user) => {
        res.status(200).json({ success: true, data: user })
    })
    .catch((err) => {
        res.status(500).json({ success: false, message: err.message })
    })
})

userRouter.post("/subscribe/:id", Authenticate, async (req, res) => {
    UserService.subscribeTo(req.params.id, req.user._id).then((response) => {
        if (response) {
            res.status(200).json({ success: true, data: "Subscribed successfully" })
        } else {
            res.status(200).json({ success: false, data: "Already subscribed" })
        }
    })
    .catch((err) => {
        res.status(500).json({ success: false, message: err.message })
    })
})

userRouter.post("/unsubscribe/:id", Authenticate, async (req, res) => {
    UserService.unsubscribeFrom(req.params.id, req.user._id).then((response) => {
        if (response) {
            res.status(200).json({ success: true, data: "Unsubscribed successfully" })
        } else {
            res.status(200).json({ success: false, data: "Not subscribed" })
        }
    })
    .catch((err) => {
        res.status(500).json({ success: false, message: err.message })
    })
})

userRouter.post("/login", validate(UserValidation.login), async (req, res) => {
    UserService.login(req.body).then((token) => {
        res.status(200).json({ success: true, data: token })
    }).catch((err) => {
        res.status(500).json({ success: false, message: err.message })
    })
})


module.exports = {
    userRouter
}
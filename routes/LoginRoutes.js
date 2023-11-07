const express = require("express")
const UserService = require("../services/UserService")
const validate = require("../middlewares/ValidateMiddleware")
const UserValidation = require("../validations/UserValidation")

const loginRouter = express.Router()

loginRouter.post("/login", validate(UserValidation.login), async (req, res) => {
    UserService.login(req.body).then((token) => {
        res.status(200).json({ success: true, data: token })
    }).catch((err) => {
        res.status(500).json({ success: false, message: err.message })
    })
})


module.exports = {
    loginRouter
}
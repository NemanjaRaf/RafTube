const Joi = require('joi');

const UserValidation = new Object();

UserValidation.createUser = Joi.object({
    username: Joi.string().min(3).max(20).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
});

UserValidation.updateUser = Joi.object({
    username: Joi.string().min(3).max(20).optional(),
    email: Joi.string().email().optional(),
    password: Joi.string().min(6).optional(),
    type: Joi.string().valid("user", "admin").optional(),
});

UserValidation.login = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
});

module.exports = UserValidation;

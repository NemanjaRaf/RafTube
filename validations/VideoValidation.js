const Joi = require('joi');

const VideoValidation = new Object();

VideoValidation.createVideo = Joi.object({
    title: Joi.string().min(3).max(100).required(),
    description: Joi.string().max(500).required(),
    videoUrl: Joi.string().required(),
    thumbnailUrl: Joi.string().required(),
});

VideoValidation.updateVideo = Joi.object({
    title: Joi.string().min(3).max(100).optional(),
    description: Joi.string().max(500).optional(),
    videoUrl: Joi.string().optional(),
    thumbnailUrl: Joi.string().optional(),
});

VideoValidation.comment = Joi.object({
    text: Joi.string().min(3).max(500).required(),
});

module.exports = VideoValidation;
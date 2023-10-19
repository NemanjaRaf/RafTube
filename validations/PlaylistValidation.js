const Joi = require('joi');

const PlaylistValidation = new Object();

PlaylistValidation.createPlaylist = Joi.object({
    title: Joi.string().min(3).max(100).required(),
    description: Joi.string().max(500).required(),
});

PlaylistValidation.updatePlaylist = Joi.object({
    title: Joi.string().min(3).max(100).optional(),
    description: Joi.string().max(500).optional(),
});

PlaylistValidation.addVideo = Joi.object({
    videoId: Joi.string().required(),
});

module.exports = PlaylistValidation;
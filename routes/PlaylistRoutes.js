const express = require("express")
const PlaylistService = require("../services/PlaylistService")
const validate = require("../middlewares/ValidateMiddleware")
const PlaylistValidation = require("../validations/PlaylistValidation")
const {Authenticate, checkAccessPlaylist } = require("../middlewares/Authenticate")

const playlistRouter = express.Router()

playlistRouter.post("/create", Authenticate, validate(PlaylistValidation.createPlaylist), async (req, res) => {
    PlaylistService.createPlaylist(req).then((playlist) => {
        res.status(200).json({ success: true, data: playlist })
    })
    .catch((err) => {
        res.status(500).json({ success: false, message: err.message })
    })
})

playlistRouter.get("/list", Authenticate, async (req, res) => {
    PlaylistService.listPlaylists(req.user._id).then((playlists) => {
        res.status(200).json({ success: true, data: playlists })
    }).catch((err) => {
        res.status(500).json({ success: false, message: err.message })
    })
})

playlistRouter.get("/list/following", Authenticate, async (req, res) => {
    PlaylistService.listFollowedPlaylists(req.user._id).then((playlists) => {
        res.status(200).json({ success: true, data: playlists })
    }).catch((err) => {
        res.status(500).json({ success: false, message: err.message })
    })
})

playlistRouter.get("/list/all", async (req, res) => {
    PlaylistService.listAll().then((playlists) => {
        res.status(200).json({ success: true, data: playlists })
    }).catch((err) => {
        res.status(500).json({ success: false, message: err.message })
    })
})

playlistRouter.get("/list/:id", async (req, res) => {
    PlaylistService.listPlaylists(req.params.id).then((playlists) => {
        res.status(200).json({ success: true, data: playlists })
    }).catch((err) => {
        res.status(500).json({ success: false, message: err.message })
    })
})


playlistRouter.get("/:id", async (req, res) => {
    PlaylistService.getPlaylist(req.params.id).then((playlist) => {
        res.status(200).json({ success: true, data: playlist })
    })
    .catch((err) => {
        res.status(500).json({ success: false, message: err.message })
    })
})

playlistRouter.put("/:id", Authenticate, checkAccessPlaylist, validate(PlaylistValidation.updatePlaylist), async (req, res) => {
    PlaylistService.updatePlaylist(req.params.id, req.body).then((playlist) => {
        res.status(200).json({ success: true, data: playlist })
    })
    .catch((err) => {
        res.status(500).json({ success: false, message: err.message })
    })
})

playlistRouter.delete("/:id", Authenticate, checkAccessPlaylist, async (req, res) => {
    PlaylistService.deletePlaylist(req.params.id).then((playlist) => {
        res.status(200).json({ success: true, data: playlist })
    })
    .catch((err) => {
        res.status(500).json({ success: false, message: err.message })
    })
})

playlistRouter.post("/add/:id", Authenticate, checkAccessPlaylist, validate(PlaylistValidation.addVideo), async (req, res) => {
    PlaylistService.addVideo(req.params.id, req.body.videoId).then((playlist) => {
        res.status(200).json({ success: true, data: playlist })
    })
    .catch((err) => {
        res.status(500).json({ success: false, message: err.message })
    })
})

playlistRouter.post("/remove/:id", Authenticate, checkAccessPlaylist, validate(PlaylistValidation.removeVideo), async (req, res) => {
    PlaylistService.removeVideo(req.params.id, req.body.videoId).then((playlist) => {
        res.status(200).json({ success: true, data: playlist })
    })
    .catch((err) => {
        res.status(500).json({ success: false, message: err.message })
    })
})

playlistRouter.post("/follow/:id", Authenticate, async (req, res) => {
    PlaylistService.follow(req.params.id, req.user._id).then((playlist) => {
        res.status(200).json({ success: true, data: playlist })
    })
    .catch((err) => {
        res.status(500).json({ success: false, message: err.message })
    })
})

playlistRouter.post("/unfollow/:id", Authenticate, async (req, res) => {
    PlaylistService.unfollow(req.params.id, req.user._id).then((playlist) => {
        res.status(200).json({ success: true, data: playlist })
    })
    .catch((err) => {
        res.status(500).json({ success: false, message: err.message })
    })
})
module.exports = {
    playlistRouter
};
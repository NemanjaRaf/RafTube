const express = require('express');
const VideoService = require('../services/VideoService');
const { Authenticate, checkAccess, checkAccessVideo, checkAccessComment } = require('../middlewares/Authenticate');
const validate = require("../middlewares/ValidateMiddleware")
const VideoValidation = require('../validations/VideoValidation');

const videoRouter = express.Router();

videoRouter.post('/create', Authenticate, validate(VideoValidation.createVideo), async (req, res) => {
    VideoService.createVideo(req).then((video) => {
        res.status(200).json({ success: true, data: video });
    }).catch((err) => {
        res.status(500).json({ success: false, message: err.message });
    });
});

videoRouter.get('/:id', async (req, res) => {
    VideoService.getVideo(req.params.id).then((video) => {
        res.status(200).json({ success: true, data: video });
    }).catch((err) => {
        res.status(500).json({ success: false, message: err.message });
    });
});

videoRouter.put('/:id', Authenticate, checkAccessVideo, validate(VideoValidation.updateVideo), async (req, res) => {
    VideoService.updateVideo(req.params.id, req.body).then((video) => {
        res.status(200).json({ success: true, data: video });
    }).catch((err) => {
        res.status(500).json({ success: false, message: err.message });
    });
});

videoRouter.delete('/:id', Authenticate, checkAccessVideo, async (req, res) => {
    VideoService.deleteVideo(req.params.id).then((video) => {
        res.status(200).json({ success: true, data: video });
    }).catch((err) => {
        res.status(500).json({ success: false, message: err.message });
    });
});

videoRouter.post('/like/:id', Authenticate, async (req, res) => {
    VideoService.likeVideo(req.params.id, req.user._id).then((video) => {
        res.status(200).json({ success: true, data: video });
    }).catch((err) => {
        res.status(500).json({ success: false, message: err.message });
    });
});

videoRouter.post('/dislike/:id', Authenticate, async (req, res) => {
    VideoService.dislikeVideo(req.params.id, req.user._id).then((video) => {
        res.status(200).json({ success: true, data: video });
    }).catch((err) => {
        res.status(500).json({ success: false, message: err.message });
    });
});

videoRouter.get("/search/:limit/:query", async (req, res) => {
    VideoService.listVideos(req.params.query, req.params.limit).then((videos) => {
        res.status(200).json({ success: true, data: videos })
    }).catch((err) => {
        res.status(500).json({ success: false, message: err.message })
    })
})

videoRouter.get("/search/:limit", async (req, res) => {
    VideoService.listVideos("", req.params.limit).then((videos) => {
        res.status(200).json({ success: true, data: videos })
    }).catch((err) => {
        res.status(500).json({ success: false, message: err.message })
    })
})

videoRouter.get("/channel/:id", async (req, res) => {
    VideoService.listVideosByChannel(req.params.id).then((videos) => {
        res.status(200).json({ success: true, data: videos })
    }).catch((err) => {
        res.status(500).json({ success: false, message: err.message })
    })
})

videoRouter.get("/subscriptions/", Authenticate, async (req, res) => {
    VideoService.listVideosBySubscriptions(req.user._id).then((videos) => {
        res.status(200).json({ success: true, data: videos })
    }).catch((err) => {
        res.status(500).json({ success: false, message: err.message })
    })
})

videoRouter.post("/comment/:id", Authenticate, validate(VideoValidation.comment), async (req, res) => {
    VideoService.addComment(req.params.id, req).then((comment) => {
        res.status(200).json({ success: true, data: comment })
    }).catch((err) => {
        res.status(500).json({ success: false, message: err.message })
    })
})

videoRouter.put("/comment/:id", Authenticate, checkAccessComment, validate(VideoValidation.comment), async (req, res) => {
    VideoService.updateComment(req.params.id, req.body).then((video) => {
        res.status(200).json({ success: true, data: video })
    }).catch((err) => {
        res.status(500).json({ success: false, message: err.message })
    })
})

videoRouter.delete("/comment/:id", Authenticate, checkAccessComment, async (req, res) => {
    VideoService.removeComment(req.params.id).then(_ => {
        res.status(200).json({ success: true, data: "Comment deleted successfully" })
    }).catch((err) => {
        res.status(500).json({ success: false, message: err.message })
    })
})


module.exports = {
    videoRouter,
};
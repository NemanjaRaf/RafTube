const express = require('express');
const multer = require('multer');
const AWS = require('aws-sdk');
const { v4: uuidv4 } = require('uuid');
const ffmpeg = require('fluent-ffmpeg');
const os = require('os');
const path = require('path');
const fs = require('fs');


const { SPACES_ACCESS, SPACES_SECRET, SPACES_ENDPOINT } = require('../config');
const VideoService = require('../services/VideoService');
const { Authenticate, checkAccess, checkAccessVideo, checkAccessComment, AuthenticateOptional } = require('../middlewares/Authenticate');
const validate = require("../middlewares/ValidateMiddleware")
const VideoValidation = require('../validations/VideoValidation');

const videoRouter = express.Router();

const spacesEndpoint = new AWS.Endpoint(SPACES_ENDPOINT); // Change to your endpoint if different
const s3 = new AWS.S3({ 
    endpoint: spacesEndpoint,
    accessKeyId: SPACES_ACCESS,
    secretAccessKey: SPACES_SECRET
});

ffmpeg.setFfmpegPath(require('@ffmpeg-installer/ffmpeg').path);

const upload = multer({
    storage: multer.memoryStorage(),
    limits: {
        fileSize: 50 * 1024 * 1024 // limit to 50MB
    }
});

videoRouter.post('/upload', upload.single('video'), async (req, res) => {
    if (!req.file) {
        return res.status(400).send('No file uploaded.');
    }

    const extension = req.file.originalname.split('.').pop();
    const videoID = uuidv4();
    const thumbnailPath = path.join(os.tmpdir(), `${videoID}.png`);

    // save req.file.buffer to temp folder
    fs.writeFileSync(path.join(os.tmpdir(), `${videoID}.${extension}`), req.file.buffer);

    ffmpeg()
        .input(path.join(os.tmpdir(), `${videoID}.${extension}`))
        .screenshots({
            timestamps: ['00:01.000'],
            filename: thumbnailPath
        })
        .on('end', function() {
            const videoParams = {
                Bucket: 'raftube',
                Key: `videos/${videoID}.${extension}`,
                Body: req.file.buffer,
                ContentType: req.file.mimetype,
                ACL: 'public-read'
            };

            s3.putObject(videoParams, (err, videoData) => {
                if (err) {
                    console.log(err);
                    return res.status(500).json({ success: false, message: err.message });
                }

                const thumbnailParams = {
                    Bucket: 'raftube',
                    Key: `thumbnails/${videoID}.png`,
                    Body: fs.readFileSync(thumbnailPath),
                    ContentType: 'image/png',
                    ACL: 'public-read'
                };

                s3.putObject(thumbnailParams, (err, thumbnailData) => {
                    if (err) {
                        console.log(err);
                        return res.status(500).json({ success: false, message: err.message });
                    }

                    res.status(200).json({ success: true, data: {
                        videoID: videoID,
                        videoExtension: extension,
                        video: `https://raftube.fra1.digitaloceanspaces.com/videos/${videoID}.${extension}`,
                        thumbnail: `https://raftube.fra1.digitaloceanspaces.com/thumbnails/${videoID}.png`
                    } });
                });
            });
        });
});

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

videoRouter.get("/comment/:id", async (req, res) => {
    VideoService.listComments(req.params.id).then((comment) => {
        res.status(200).json({ success: true, data: comment })
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
videoRouter.post('/view/:id', AuthenticateOptional, async (req, res) => {
    VideoService.viewVideo(req.params.id, req).then((video) => {
        console.log(video);
        res.status(200).json({ success: true, data: video });
    }).catch((err) => {
        console.log(err);
        res.status(500).json({ success: false, message: err.message });
    });
})


module.exports = {
    videoRouter,
};
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config');
const VideoService = require('../services/VideoService');
const CommentService = require('../services/CommentService');

const Authenticate = async (req, res, next) => {
    let token = req.header('Authorization');
    if (token) {
        token = token.slice(7, token.length);
    }
    if (!token) {
        return res.status(401).json({ success: false, message: 'Missing token' });
    }
    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(401).json({ success: false, message: 'Invalid token' });
    }
}

const checkAccess = async (req, res, next) => {
    const user = req.user;
    if (user.role !== 'admin' && user._id !== req.params.id) {
        return res.status(403).json({ success: false, message: 'Access denied' });
    }

    next();
}

const checkAccessVideo = async (req, res, next) => {
    const user = req.user;
    const video = await VideoService.getVideo(req.params.id);
    if (!video) {
        return res.status(404).json({ success: false, message: 'Video not found' });
    }
    if (user.role !== 'admin' && user._id !== video.channel._id.toString()) {
        return res.status(403).json({ success: false, message: 'Access denied' });
    }

    next();
}

const checkAccessComment = async (req, res, next) => {
    const user = req.user;
    const comment = await CommentService.getComment(req.params.id);
    if (!comment) {
        return res.status(404).json({ success: false, message: 'Comment not found' });
    }
    if (user.role !== 'admin' && user._id !== comment.author._id.toString()) {
        return res.status(403).json({ success: false, message: 'Access denied' });
    }

    next();
}

const checkAccessPlaylist = async (req, res, next) => {
    const user = req.user;
    const playlist = await PlaylistService.getPlaylist(req.params.id);
    if (!playlist) {
        return res.status(404).json({ success: false, message: 'Playlist not found' });
    }
    if (user.role !== 'admin' && user._id !== playlist.author._id.toString()) {
        return res.status(403).json({ success: false, message: 'Access denied' });
    }

    next();
}

module.exports = {
    Authenticate,
    checkAccess,
    checkAccessVideo,
    checkAccessComment,
    checkAccessPlaylist
};
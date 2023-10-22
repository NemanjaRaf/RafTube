const Video = require('../models/Video');
const CommentService = require('./CommentService');

const VideoService = new Object();

VideoService.createVideo = async (data) => {
    const video = new Video({
        title: data.body.title,
        description: data.body.description,
        videoUrl: data.body.videoUrl,
        thumbnailUrl: data.body.thumbnailUrl,
        channel: data.user._id,
    });
    return await video.save();
}

VideoService.getVideo = async (id) => {
    return await Video.findById(id).populate('channel');
}

VideoService.viewVideo = async (id, data) => {
    const video = await Video.findById(id);
    if (!video) {
        throw new Error('Video not found');
    }

    if (data.user) {
        if (!video.views.includes(data.user._id)) {
            video.views.push(data.user._id);
            await video.save();
        }
    } else {
        video.views.push('guest');
        await video.save();
    }

    return video;
}

VideoService.updateVideo = async (id, data) => {
    const video = await Video.findByIdAndUpdate(id, { $set: data }, { new: true, runValidators: true });

    if (!video) {
        throw new Error('Video not found');
    }

    return video;
}

VideoService.deleteVideo = async (id) => {
    await Video.findByIdAndDelete(id);

    return true;
}

VideoService.likeVideo = async (id, userId) => {
    const video = await Video.findById(id);

    if (!video) {
        throw new Error('Video not found');
    }

    const { likes, dislikes } = video;

    if (likes.includes(userId)) {
        video.likes = likes.filter((like) => like.toString() !== userId);
        console.log(video.likes);
    } else {
        video.likes.push(userId);
    }

    if (dislikes.includes(userId)) {
        video.dislikes = dislikes.filter((dislike) => dislike.toString() !== userId);
    }

    await video.save();

    return video;
};

VideoService.dislikeVideo = async (id, userId) => {
    const video = await Video.findById(id);

    if (!video) {
        throw new Error('Video not found');
    }

    const { likes, dislikes } = video;

    if (dislikes.includes(userId)) {
        video.dislikes = dislikes.filter((dislike) => dislike.toString() !== userId);
    } else {
        video.dislikes.push(userId);
    }

    if (likes.includes(userId)) {
        video.likes = likes.filter((like) => like.toString() !== userId);
    }

    await video.save();

    return video;
}

VideoService.listVideos = async (query = "", limit = 10) => {
    const videos = await Video.find({
        $or: [
            { title: { $regex: query, $options: 'i' } },
            { description: { $regex: query, $options: 'i' } },
        ]
    }).sort({createdAt: -1}).limit(limit).populate('channel');

    return videos;
}

VideoService.listVideosByChannel = async (id) => {
    const videos = await Video.find({ channel: id }).sort({createdAt: -1}).populate('channel');

    return videos;
}

VideoService.listVideosBySubscriptions = async (id) => {
    const videos = await Video.find({ channel: { $in: id } }).sort({createdAt: -1}).populate('channel');

    return videos;
}

VideoService.addComment = async (id, data) => {
    const video = await Video.findById(id);

    if (!video) {
        throw new Error('Video not found');
    }

    const comment = await CommentService.createComment(data);

    video.comments.push(comment._id);

    await video.save();

    return comment;
}

VideoService.removeComment = async (commentId) => {
    const video = await Video.findOne({ comments: commentId });

    if (!video) {
        throw new Error('Video not found');
    }

    video.comments = video.comments.filter((comment) => comment.toString() !== commentId);

    await video.save();
}

VideoService.updateComment = async (commentId, data) => {
    await CommentService.updateComment(commentId, data);
}

VideoService.listComments = async (id) => {
    const video = await Video.findById(id).populate({
        path: 'comments',
        options: { sort: { createdAt: -1 } }, // add this line to sort by createdAt in descending order
        populate: {
            path: 'author',
            model: 'User'
        }
    });

    if (!video) {
        throw new Error('Video not found');
    }

    return video.comments;
}


module.exports = VideoService;

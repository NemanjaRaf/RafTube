const Comment = require('../models/Comment');
const Video = require('../models/Video');

const CommentService = new Object();

CommentService.listComments = async () => {
    const videos = await Video.find({}, 'title comments').populate({
        path: 'comments',
        populate: {
            path: 'author',
            select: 'username',
        },
    });

    let comments = []
    videos.forEach(video => {
        video.comments.forEach(comment => {
            comment.video = video.title
            comments.push({
                _id: comment._id,
                text: comment.text,
                video: comment.video,
                author: comment.author,
            })
        })
    })

    return comments;
};
CommentService.createComment = async (data) => {
    const comment = new Comment({
        text: data.body.text,
        video: data.params.id,
        author: data.user._id,
    });
    return await comment.save();
}

CommentService.deleteComment = async (id) => {
    await Comment.findByIdAndDelete(id);

    return true;
}

CommentService.updateComment = async (id, data) => {
    const comment = await Comment.findByIdAndUpdate(id, { $set: data }, { new: true, runValidators: true });

    if (!comment) {
        throw new Error('Comment not found');
    }

    return comment;
}

CommentService.getComment = async (id) => {
    const comment = await Comment.findById(id).populate('author');

    if (!comment) {
        throw new Error('Comment not found');
    }

    return comment;
}

module.exports = CommentService;
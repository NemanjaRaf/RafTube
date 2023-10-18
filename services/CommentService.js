const Comment = require('../models/Comment');

const CommentService = new Object();

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
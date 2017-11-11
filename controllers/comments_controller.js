const Comment = require('./../models/comment');

module.exports = {
    createComment(req, res) {
        let comment = new Comment(Object.assign(req.body.comment, { date: Date.now(), userId: req.user.id }));
        comment.save((err) => {
            if (err) return res.send({ message: 'error', error: err });

            res.send(Object.assign(req.body.comment, { userId: req.user._id, fullName: req.user.fullName, avatar: req.user.image }));
        });
    },
    getCommentsByPostId(req, res) {
        Comment.find({ postId: req.params.post_id }).sort({ _id: -1 }).populate('userId')
            .then(comments => res.send(comments));
    }
};
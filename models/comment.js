const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = mongoose.SchemaTypes.ObjectId;

const CommentSchema = new Schema({
    userId: {
        type: ObjectId,
        ref: 'users',
        required: true
    },
    postId: {
        type: ObjectId,
        ref: 'posts',
        required: false
    },
    text: String,
    date: Date
});

module.exports = mongoose.model('comments', CommentSchema);
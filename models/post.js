const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = mongoose.SchemaTypes.ObjectId;

const PostSchema = new Schema({
    title: String,
    category: {
        type: ObjectId,
        ref: 'categories'
    },
    views: {
        type: Number,
        default: 0
    },
    likes:  {
        type: Number,
        default: 0
    },
    text: String,
    tags: [String],
    image: String,
    uploaded: Date
});

module.exports = mongoose.model('posts', PostSchema);
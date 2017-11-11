const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = mongoose.SchemaTypes.ObjectId;

const LiveSchema = new Schema({
    userId: {
        type: ObjectId,
        ref: 'users',
        required: true
    },
    text: String
});

module.exports = mongoose.model('lives', LiveSchema);
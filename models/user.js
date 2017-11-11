const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');

const UserSchema = new Schema({
   fullName: String,
   email: {
       type: String,
       index: true,
       unique: true
   },
   role: {
       type: String,
       enum: ['admin', 'user']
   },
   info: {
       type: String,
       required: false
   },
   status: {
        type: String,
        required: false
    },
   image: String
});

UserSchema.plugin(passportLocalMongoose, { usernameField: 'email' });

module.exports = mongoose.model('users', UserSchema);
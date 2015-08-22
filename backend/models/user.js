var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: true,
        lowercase: true
    },
    password: {
        type: String,
        select: false
    },
    fullName: String,
    picture: String,
    accessTokenFacebook: String,
    accessTokenTwitter: String,
    categories: []
}, { versionKey: false });

mongoose.model('User', UserSchema);

module.exports = mongoose.model('User');
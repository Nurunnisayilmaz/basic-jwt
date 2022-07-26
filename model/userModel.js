const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name : {
        type: String,
        required: true
    },
    password : {
        type: String
    },
    token : {
        type: String
    }

},{timestamps: false});

module.exports = mongoose.model('User', UserSchema);